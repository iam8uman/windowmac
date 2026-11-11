import AppKit
import Combine
import WindowmacCore
import UniformTypeIdentifiers

/// Holds the live settings and saves them to UserDefaults (as JSON) whenever they change.
final class SettingsStore: ObservableObject {
    static let shared = SettingsStore()
    private static let key = "WindowmacSettings"

    @Published var settings: WindowmacSettings {
        didSet {
            if settings != oldValue { save() }
        }
    }

    private init() {
        settings = SettingsStore.loadFromDisk()
    }

    static func loadFromDisk() -> WindowmacSettings {
        // Windowmac used to be called Swoop (com.iam8uman.swoop). Carry its settings over once.
        if UserDefaults.standard.data(forKey: key) == nil,
           let old = UserDefaults(suiteName: "com.iam8uman.swoop")?.data(forKey: "SwoopSettings") {
            UserDefaults.standard.set(old, forKey: key)
        }
        guard let data = UserDefaults.standard.data(forKey: key),
              let decoded = try? JSONDecoder().decode(WindowmacSettings.self, from: data) else {
            return WindowmacSettings()
        }
        return decoded
    }

    private func save() {
        guard let data = try? JSONEncoder().encode(settings) else { return }
        UserDefaults.standard.set(data, forKey: Self.key)
    }

    func resetAll() {
        settings = WindowmacSettings()
    }

    // MARK: Import / export (share setups, back up before experimenting)

    func exportToFile() {
        let panel = NSSavePanel()
        panel.nameFieldStringValue = "Windowmac Settings.json"
        panel.allowedContentTypes = [.json]
        NSApp.activate(ignoringOtherApps: true)
        guard panel.runModal() == .OK, let url = panel.url else { return }
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        do {
            try encoder.encode(settings).write(to: url)
        } catch {
            NSAlert(error: error).runModal()
        }
    }

    func importFromFile() {
        let panel = NSOpenPanel()
        panel.allowedContentTypes = [.json]
        panel.allowsMultipleSelection = false
        NSApp.activate(ignoringOtherApps: true)
        guard panel.runModal() == .OK, let url = panel.url else { return }
        do {
            settings = try JSONDecoder().decode(WindowmacSettings.self, from: Data(contentsOf: url))
        } catch {
            NSAlert(error: error).runModal()
        }
    }
}
