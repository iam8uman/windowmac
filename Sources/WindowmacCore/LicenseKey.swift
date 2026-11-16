import Foundation

/// A Dodo Payments license key as typed or pasted by a person.
public enum LicenseKey {
    /// Trims whitespace, newlines and stray quotes from a pasted key. Nil when nothing usable is left.
    public static func clean(_ raw: String) -> String? {
        let trimmed = raw.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines.union(CharacterSet(charactersIn: "\"'`<>")))
        guard trimmed.count >= 8, !trimmed.contains(where: { $0.isWhitespace }) else { return nil }
        return trimmed
    }

    /// "2b1f8e2d-…-d9fd61c38f43" → "2b1f…8f43", for showing which key is active without printing it all.
    public static func masked(_ key: String) -> String {
        guard key.count > 10 else { return key }
        return "\(key.prefix(4))…\(key.suffix(4))"
    }
}
