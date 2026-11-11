import AppKit
import WindowmacCore

// Tiny command line helpers (the app itself is driven by windowmac:// URLs):
//   Windowmac.app/Contents/MacOS/Windowmac --list      print every command
//   Windowmac.app/Contents/MacOS/Windowmac --version
let arguments = Array(CommandLine.arguments.dropFirst())
if arguments.first == "--list" {
    let layouts = SettingsStore.loadFromDisk().customLayouts
    CommandParser.allCommands(customLayouts: layouts).forEach { print($0) }
    exit(0)
}
if arguments.first == "--version" {
    print("Windowmac \(AppInfo.version)")
    exit(0)
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.setActivationPolicy(.accessory) // menu bar app, no Dock icon
app.run()
