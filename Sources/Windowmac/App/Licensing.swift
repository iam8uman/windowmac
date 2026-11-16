import AppKit
import Combine
import Security
import WindowmacCore

/// Dodo Payments settings, read from Info.plist. Licensing is on only when `DodoCheckoutURL` is set.
enum DodoConfig {
    /// Product checkout link, e.g.
    /// https://checkout.dodopayments.com/buy/pdt_XXXX?quantity=1&redirect_url=https://windowmac.vercel.app/activate
    static var checkoutURL: URL? {
        #if DEBUG
        if let raw = ProcessInfo.processInfo.environment["WINDOWMAC_DODO_CHECKOUT_URL"], let url = URL(string: raw) {
            return url
        }
        #endif
        return plistString("DodoCheckoutURL").flatMap(URL.init(string:))
    }

    /// "live" or "test". Debug builds default to test mode so a dev build never touches real keys.
    static var apiBase: URL {
        var mode = plistString("DodoEnvironment") ?? "live"
        #if DEBUG
        mode = ProcessInfo.processInfo.environment["WINDOWMAC_DODO_ENV"] ?? plistString("DodoEnvironment") ?? "test"
        #endif
        return URL(string: mode.lowercased() == "test" ? "https://test.dodopayments.com" : "https://live.dodopayments.com")!
    }

    /// Shown on the Buy button. Dodo prices in the buyer's currency at checkout, so this is only a label.
    static var price: String { plistString("DodoPrice") ?? "$9.99" }

    private static func plistString(_ key: String) -> String? {
        guard let raw = Bundle.main.object(forInfoDictionaryKey: key) as? String,
              !raw.isEmpty, !raw.hasPrefix("$(") else { return nil }
        return raw
    }
}

/// The public, key-less license endpoints. Safe to call from the app: no secret is shipped.
/// https://docs.dodopayments.com/features/license-keys
enum DodoLicenseAPI {
    enum Failure: Error {
        case offline
        case notFound            // 404
        case inactive            // 403
        case limitReached        // 422 on activate
        case server(Int)

        var message: String {
            switch self {
            case .offline: return "Couldn't reach the license server. Check your internet connection and try again."
            case .notFound: return "That license key wasn't found. Copy it again from your receipt email."
            case .inactive: return "That license key isn't active (it may have been refunded or disabled)."
            case .limitReached: return "This key is already active on its maximum number of Macs. Deactivate it on another Mac first (Settings → License)."
            case .server(let code): return "The license server had a problem (\(code)). Please try again in a minute."
            }
        }
    }

    /// Returns the instance ID (`lki_…`) for this Mac.
    static func activate(key: String, name: String) async throws -> String {
        let (data, status) = try await post("licenses/activate", ["license_key": key, "name": name])
        switch status {
        case 200, 201:
            guard let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let id = json["id"] as? String else { throw Failure.server(status) }
            return id
        case 403: throw Failure.inactive
        case 404: throw Failure.notFound
        case 422: throw Failure.limitReached
        default: throw Failure.server(status)
        }
    }

    static func validate(key: String, instanceID: String) async throws -> Bool {
        let (data, status) = try await post("licenses/validate", ["license_key": key, "license_key_instance_id": instanceID])
        switch status {
        case 200:
            let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any]
            guard let valid = json?["valid"] as? Bool else { throw Failure.server(status) }
            return valid
        case 403, 404: return false
        default: throw Failure.server(status)
        }
    }

    static func deactivate(key: String, instanceID: String) async throws {
        let (_, status) = try await post("licenses/deactivate", ["license_key": key, "license_key_instance_id": instanceID])
        // 403/404: the instance or key is already gone, which is what we wanted.
        guard [200, 204, 403, 404].contains(status) else { throw Failure.server(status) }
    }

    private static func post(_ path: String, _ body: [String: String]) async throws -> (Data, Int) {
        var request = URLRequest(url: DodoConfig.apiBase.appendingPathComponent(path), timeoutInterval: 20)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        do {
            let (data, response) = try await URLSession.shared.data(for: request)
            return (data, (response as? HTTPURLResponse)?.statusCode ?? 0)
        } catch {
            throw Failure.offline
        }
    }
}

/// Trial + lifetime license, backed by a Dodo Payments license key activated on this Mac.
/// Used from the main thread only (menu, settings, event tap all run on the main run loop).
final class LicenseManager: ObservableObject {
    static let shared = LicenseManager()

    @Published private(set) var status: LicenseStatus = .free
    @Published private(set) var isWorking = false
    @Published private(set) var activeKey: String?
    @Published var message: String?

    let price = DodoConfig.price
    private var started = false
    private var lastValidation = Date.distantPast
    private lazy var paywall = PaywallController(manager: self)

    var licensingEnabled: Bool { DodoConfig.checkoutURL != nil }

    // MARK: Start

    func start() {
        guard !started else { return }
        started = true
        guard licensingEnabled else {
            status = .free
            return
        }
        activeKey = LicenseStore.load()?.key
        recompute()
        if status == .expired {
            DispatchQueue.main.asyncAfter(deadline: .now() + 1) { [weak self] in
                if self?.status == .expired { self?.showPaywall() }
            }
        }
        refresh()

        // Coming back from the browser checkout, or just later in the day: re-check (throttled).
        NotificationCenter.default.addObserver(forName: NSApplication.didBecomeActiveNotification,
                                               object: nil, queue: .main) { [weak self] _ in
            Task { @MainActor in self?.refresh() }
        }
        // The trial runs out while the app stays open; the license is re-checked about once a day.
        Timer.scheduledTimer(withTimeInterval: 60 * 60, repeats: true) { [weak self] _ in
            Task { @MainActor in
                self?.recompute()
                self?.refresh()
            }
        }
    }

    // MARK: State

    private func recompute() {
        status = TrialPolicy.status(trialStart: TrialClock.startDate(), now: Date(),
                                    hasEntitlement: activeKey != nil, licensingEnabled: licensingEnabled)
    }

    /// Re-validates the stored key with Dodo at most once every 12 hours. Offline keeps the license:
    /// only an explicit "not valid" (refund, disabled key, instance removed in the dashboard) revokes it.
    func refresh(force: Bool = false) {
        guard licensingEnabled, let stored = LicenseStore.load() else { return }
        guard force || Date().timeIntervalSince(lastValidation) > 12 * 60 * 60 else { return }
        lastValidation = Date()
        Task { @MainActor [weak self] in
            guard let valid = try? await DodoLicenseAPI.validate(key: stored.key, instanceID: stored.instanceID) else { return }
            guard let self, !valid else { return }
            LicenseStore.clear()
            self.activeKey = nil
            self.recompute()
            self.message = "Your Windowmac license is no longer active on this Mac."
        }
    }

    // MARK: Gate

    /// True when Windowmac may move windows. When the trial is over, shows the paywall instead.
    func allowAction() -> Bool {
        if status.canUseWindowmac { return true }
        showPaywall()
        return false
    }

    func showPaywall() {
        paywall.show()
    }

    var statusLine: String {
        switch status {
        case .free: return ""
        case .licensed: return "Windowmac Pro: lifetime license"
        case .trial(let days): return days == 1 ? "Free trial: last day" : "Free trial: \(days) days left"
        case .expired: return "Free trial ended"
        }
    }

    // MARK: Buy / activate / deactivate

    func buy() {
        guard let url = DodoConfig.checkoutURL else { return }
        NSWorkspace.shared.open(url)
        message = "Finish checkout in your browser. Your license key arrives by email and on the page after paying."
    }

    func activate(_ input: String) {
        guard licensingEnabled else { return }
        guard let key = LicenseKey.clean(input) else {
            message = "Paste the license key from your receipt email."
            return
        }
        if let stored = LicenseStore.load(), stored.key == key {
            message = "This key is already active on this Mac."
            return
        }
        message = nil
        isWorking = true
        Task { @MainActor [weak self] in
            guard let self else { return }
            defer { self.isWorking = false }
            do {
                let id = try await DodoLicenseAPI.activate(key: key, name: Self.deviceName)
                LicenseStore.save(.init(key: key, instanceID: id))
                self.activeKey = key
                self.lastValidation = Date()
                self.recompute()
                self.message = nil
                self.paywall.show() // shows the "Thanks" state
            } catch let failure as DodoLicenseAPI.Failure {
                self.message = failure.message
            } catch {
                self.message = error.localizedDescription
            }
        }
    }

    /// Frees this Mac's activation slot so the key can be used on another Mac.
    func deactivate() {
        guard let stored = LicenseStore.load() else { return }
        message = nil
        isWorking = true
        Task { @MainActor [weak self] in
            guard let self else { return }
            defer { self.isWorking = false }
            do {
                try await DodoLicenseAPI.deactivate(key: stored.key, instanceID: stored.instanceID)
                LicenseStore.clear()
                self.activeKey = nil
                self.recompute()
                self.message = "License removed from this Mac. You can activate it on another one."
            } catch let failure as DodoLicenseAPI.Failure {
                self.message = failure.message
            } catch {
                self.message = error.localizedDescription
            }
        }
    }

    private static var deviceName: String {
        let name = Host.current().localizedName ?? ProcessInfo.processInfo.hostName
        return "\(name) (Windowmac \(AppInfo.version))"
    }
}

/// The activated key and this Mac's instance ID, kept in the Keychain so reinstalling keeps the license.
enum LicenseStore {
    struct Stored: Codable, Equatable {
        var key: String
        var instanceID: String
    }

    private static let service = "com.iam8uman.windowmac.license"
    private static let account = "dodo"

    static func load() -> Stored? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne,
        ]
        var item: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess, let data = item as? Data else { return nil }
        return try? JSONDecoder().decode(Stored.self, from: data)
    }

    static func save(_ stored: Stored) {
        clear()
        guard let data = try? JSONEncoder().encode(stored) else { return }
        let attributes: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecValueData as String: data,
        ]
        SecItemAdd(attributes as CFDictionary, nil)
    }

    static func clear() {
        let match: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
        ]
        SecItemDelete(match as CFDictionary)
    }
}

/// When the free trial started. Kept in the Keychain so reinstalling Windowmac doesn't restart it.
enum TrialClock {
    // Keeps the original Swoop name on purpose, so the rename doesn't hand out a fresh trial.
    private static let service = "com.iam8uman.swoop.trial"
    private static let account = "trialStart"

    static func startDate() -> Date {
        #if DEBUG
        // WINDOWMAC_TRIAL_EXPIRED=1 swift run  → see the "trial ended" paywall right away.
        if ProcessInfo.processInfo.environment["WINDOWMAC_TRIAL_EXPIRED"] == "1" {
            return Date().addingTimeInterval(-TrialPolicy.length - 60)
        }
        #endif
        if let stored = read() { return stored }
        let now = Date()
        write(now)
        return now
    }

    private static func read() -> Date? {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
            kSecReturnData as String: true,
            kSecMatchLimit as String: kSecMatchLimitOne,
        ]
        var item: CFTypeRef?
        if SecItemCopyMatching(query as CFDictionary, &item) == errSecSuccess,
           let data = item as? Data, let text = String(data: data, encoding: .utf8),
           let seconds = TimeInterval(text) {
            return Date(timeIntervalSince1970: seconds)
        }
        // Fallback if the Keychain isn't available.
        let fallback = UserDefaults.standard.double(forKey: "WindowmacTrialStart")
        return fallback > 0 ? Date(timeIntervalSince1970: fallback) : nil
    }

    private static func write(_ date: Date) {
        let text = String(date.timeIntervalSince1970)
        UserDefaults.standard.set(date.timeIntervalSince1970, forKey: "WindowmacTrialStart")
        let match: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account,
        ]
        SecItemDelete(match as CFDictionary)
        var attributes = match
        attributes[kSecValueData as String] = Data(text.utf8)
        SecItemAdd(attributes as CFDictionary, nil)
    }
}
