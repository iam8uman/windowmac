#!/bin/bash
# Windowmac installer: downloads the latest release from GitHub, checks it, and puts it in Applications.
#   curl -fsSL https://windowmac.vercel.app/install.sh | bash
# Source: https://github.com/iam8uman/windowmac
set -euo pipefail

REPO="iam8uman/windowmac"
BASE="https://github.com/$REPO/releases/latest/download"
ZIP="Windowmac.zip"
APP="Windowmac.app"
BUNDLE_ID="com.iam8uman.windowmac"

# Colours only when talking to a terminal.
if [[ -t 1 ]]; then
  B=$'\033[1m'; DIM=$'\033[2m'; BLUE=$'\033[34m'; GREEN=$'\033[32m'; RED=$'\033[31m'; R=$'\033[0m'
else
  B=""; DIM=""; BLUE=""; GREEN=""; RED=""; R=""
fi
step() { echo "  ${BLUE}→${R} $*"; }
ok()   { echo "  ${GREEN}✓${R} $*"; }
fail() { echo "  ${RED}✗${R} $*" >&2; exit 1; }

cat <<BANNER

${B}${BLUE}  ██╗    ██╗██╗███╗   ██╗██████╗  ██████╗ ██╗    ██╗███╗   ███╗ █████╗  ██████╗
  ██║    ██║██║████╗  ██║██╔══██╗██╔═══██╗██║    ██║████╗ ████║██╔══██╗██╔════╝
  ██║ █╗ ██║██║██╔██╗ ██║██║  ██║██║   ██║██║ █╗ ██║██╔████╔██║███████║██║
  ██║███╗██║██║██║╚██╗██║██║  ██║██║   ██║██║███╗██║██║╚██╔╝██║██╔══██║██║
  ╚███╔███╔╝██║██║ ╚████║██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚═╝ ██║██║  ██║╚██████╗
   ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝${R}

  ${DIM}Flick windows into place on your Mac${R}

BANNER

[[ "$(uname -s)" == "Darwin" ]] || fail "Windowmac is a Mac app. Run this on macOS 13 or later."
MACOS_MAJOR="$(sw_vers -productVersion | cut -d. -f1)"
(( MACOS_MAJOR >= 13 )) || fail "Windowmac needs macOS 13 or later (this Mac has $(sw_vers -productVersion))."

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Size of the download, for the friendly message (GitHub redirects, so take the last Content-Length).
BYTES="$(curl -sIL "$BASE/$ZIP" 2>/dev/null | tr -d '\r' | awk 'tolower($1)=="content-length:"{n=$2} END{print n+0}')"
if (( BYTES > 0 )); then
  MB=$(( (BYTES + 524288) / 1048576 )); (( MB < 1 )) && MB=1
  step "Downloading the latest Windowmac (about $MB MB)…"
else
  step "Downloading the latest Windowmac…"
fi
# Download the zip and its checksum together. If they disagree, the release files may be
# mid-upload (the zip and .sha256 are replaced one at a time), so wait and fetch both again.
ATTEMPTS=3
for (( TRY = 1; TRY <= ATTEMPTS; TRY++ )); do
  curl -fL --progress-bar "$BASE/$ZIP" -o "$TMP/$ZIP" || fail "Download failed. Check your connection and try again."
  ok "Downloaded"

  rm -f "$TMP/$ZIP.sha256"
  if ! curl -fsSL "$BASE/$ZIP.sha256" -o "$TMP/$ZIP.sha256" 2>/dev/null; then
    echo "  ${DIM}• No checksum published for this release, skipping the check${R}"
    break
  fi
  EXPECTED="$(awk '{print $1; exit}' "$TMP/$ZIP.sha256")"
  ACTUAL="$(shasum -a 256 "$TMP/$ZIP" | awk '{print $1}')"
  if [[ "$EXPECTED" == "$ACTUAL" ]]; then
    ok "Checksum verified"
    break
  fi
  (( TRY < ATTEMPTS )) || fail "Checksum mismatch, so nothing was installed. Please try again in a few minutes."
  echo "  ${DIM}• Checksum didn't match (the release may be updating). Retrying in 10 seconds…${R}"
  sleep 10
  step "Downloading again (attempt $(( TRY + 1 )) of $ATTEMPTS)…"
done

step "Installing…"
ditto -x -k "$TMP/$ZIP" "$TMP/unzipped"
[[ -d "$TMP/unzipped/$APP" ]] || fail "The download didn't contain $APP."

DEST="/Applications"
if [[ ! -w "$DEST" ]]; then
  DEST="$HOME/Applications"
  mkdir -p "$DEST"
fi

# Quit a running copy (and the old Swoop app, which Windowmac replaces) before swapping files.
pkill -x Windowmac 2>/dev/null || true
pkill -x Swoop 2>/dev/null || true
sleep 0.5

rm -rf "$DEST/$APP"
ditto "$TMP/unzipped/$APP" "$DEST/$APP"

for OLD in "/Applications/Swoop.app" "$HOME/Applications/Swoop.app"; do
  if [[ -d "$OLD" ]] && rm -rf "$OLD" 2>/dev/null; then
    ok "Removed the old Swoop app (your settings carry over)"
  fi
done

# The file came straight from GitHub, so clear the "downloaded from the internet" flag.
# This is what skips the "Apple could not verify" popup.
xattr -dr com.apple.quarantine "$DEST/$APP" 2>/dev/null || true

# A new build needs a fresh Accessibility entry; the old one silently stops working.
tccutil reset Accessibility "$BUNDLE_ID" >/dev/null 2>&1 || true

VERSION="$(/usr/libexec/PlistBuddy -c 'Print :CFBundleShortVersionString' "$DEST/$APP/Contents/Info.plist" 2>/dev/null || echo "")"
ok "Installed Windowmac${VERSION:+ $VERSION} to $DEST/$APP"

cat <<DONE

  ${B}Last step:${R} when macOS asks, turn Windowmac on in
  System Settings → Privacy & Security → Accessibility,
  then reopen Windowmac from its menu bar icon.

  Hold ${B}Left ⌥ (Option)${R} and flick your mouse. Enjoy!

DONE

open "$DEST/$APP"
