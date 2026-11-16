// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "Windowmac",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "Windowmac", targets: ["Windowmac"]),
    ],
    targets: [
        // Pure logic: actions, geometry, radial math, cycles, settings, URL commands.
        // No AppKit, so it is fast to unit-test.
        .target(
            name: "WindowmacCore",
            path: "Sources/WindowmacCore"
        ),
        // The macOS app: Accessibility, trigger key, radial menu, preview, stash, settings UI,
        // and the Dodo Payments license check (14-day trial, then a one-time lifetime license).
        .executableTarget(
            name: "Windowmac",
            dependencies: ["WindowmacCore"],
            path: "Sources/Windowmac",
            linkerSettings: [
                .linkedFramework("AppKit"),
                .linkedFramework("ApplicationServices"),
                .linkedFramework("ServiceManagement"),
                .linkedFramework("SwiftUI"),
            ]
        ),
        .testTarget(
            name: "WindowmacCoreTests",
            dependencies: ["WindowmacCore"],
            path: "Tests/WindowmacCoreTests"
        ),
    ]
)
