// swift-tools-version:5.9
import PackageDescription

let package = Package(
    name: "Windowmac",
    platforms: [.macOS(.v13)],
    products: [
        .executable(name: "Windowmac", targets: ["Windowmac"]),
    ],
    dependencies: [
        // Purchases and the "swoop_pro" entitlement (14-day trial, then a one-time lifetime license).
        .package(url: "https://github.com/RevenueCat/purchases-ios-spm.git", from: "5.0.0"),
    ],
    targets: [
        // Pure logic: actions, geometry, radial math, cycles, settings, URL commands.
        // No AppKit, so it is fast to unit-test.
        .target(
            name: "WindowmacCore",
            path: "Sources/WindowmacCore"
        ),
        // The macOS app: Accessibility, trigger key, radial menu, preview, stash, settings UI.
        .executableTarget(
            name: "Windowmac",
            dependencies: [
                "WindowmacCore",
                .product(name: "RevenueCat", package: "purchases-ios-spm"),
            ],
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
