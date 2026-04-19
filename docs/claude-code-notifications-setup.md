# Claude Code — Notification Configuration Guide

## Overview

Claude Code supports shell hooks that fire at key lifecycle events. These hooks can be wired to desktop notification tools so you get alerted when Claude finishes a response or needs your attention — without having to keep the terminal in focus.

This guide covers two approaches:
1. **`terminal-notifier`** — third-party macOS notifier with rich options (sound, image, actions)
2. **`osascript`** — built-in macOS AppleScript runner, zero-dependency fallback

---

## Hook Events Reference

| Event | When it fires | Stdin payload |
|---|---|---|
| `Stop` | Claude finishes a response | None |
| `Notification` | Claude needs user attention | JSON `{ "message": "..." }` |
| `PreToolUse` | Before any tool call | JSON with tool name + input |
| `PostToolUse` | After any tool call | JSON with tool name + output |

---

## Option 1: terminal-notifier

### Installation

```bash
brew install terminal-notifier
```

### settings.json Configuration

Located at `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title 'Claude Code' -contentImage '/Users/<you>/.claude/claude-code-icon.png' -message 'Claude needs your attention' -sound Crystal"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "terminal-notifier -title 'Claude Code' -contentImage '/Users/<you>/.claude/claude-code-icon.png' -message 'Response complete' -sound Glass",
            "async": true
          }
        ]
      }
    ]
  }
}
```

### Key Flags

| Flag | Description |
|---|---|
| `-title` | Bold title line of the notification |
| `-message` | Body text |
| `-contentImage` | Image displayed inside the notification body |
| `-appIcon` | App icon (left side) — **see fix below** |
| `-sound` | Sound name from `/System/Library/Sounds/` |
| `-open` | URL to open on click |
| `-activate` | Bundle ID of app to bring to front on click |
| `"async": true` | Fire-and-forget; hook does not block Claude |

### Fix: `-appIcon` Does Not Display on Modern macOS

**Symptom:** Custom icon specified via `-appIcon` is silently ignored.

**Root cause:** macOS Catalina (10.14) and later restrict which processes can override a notification's app icon. Only apps installed under `/Applications` and granted notification permissions are trusted. `terminal-notifier` invoked from a shell does not meet this criteria.

**Fix:** Replace `-appIcon` with `-contentImage`:

```diff
- terminal-notifier ... -appIcon '/path/to/icon.png'
+ terminal-notifier ... -contentImage '/path/to/icon.png'
```

`-contentImage` embeds the image in the notification body and is not subject to the same OS-level restriction.

### Dynamic Message from Notification Payload

The `Notification` hook receives a JSON payload on stdin. To forward the actual message text:

```json
{
  "type": "command",
  "command": "jq -r '.message' | xargs -I{} terminal-notifier -title 'Claude Code' -contentImage '/Users/<you>/.claude/claude-code-icon.png' -message '{}' -sound Crystal"
}
```

> Requires `jq` — install with `brew install jq`.

---

## Option 2: osascript (Mac Native)

`osascript` is built into macOS — no installation required. It uses the system notification centre directly via AppleScript.

### Basic Usage

```bash
osascript -e 'display notification "Response complete" with title "Claude Code"'
```

### settings.json Configuration

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude needs your attention\" with title \"Claude Code\" sound name \"Crystal\"'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Response complete\" with title \"Claude Code\" sound name \"Glass\"'",
            "async": true
          }
        ]
      }
    ]
  }
}
```

### osascript Notification Syntax

```applescript
display notification "body text"
  with title "Title"
  subtitle "Subtitle"        -- optional
  sound name "Glass"         -- optional, name from /System/Library/Sounds/
```

### Limitations

- No custom image support — uses the calling app's icon
- Notification centre may group or suppress repeated notifications
- Requires macOS notification permission for Terminal/iTerm

### Grant Notification Permission

If notifications are blocked, grant permission via:

**System Settings → Notifications → Terminal** (or iTerm2) → set to **Alerts** or **Banners**

---

## Image Size and Format Recommendations

| Property | Recommendation |
|---|---|
| **Format** | PNG with alpha channel (RGBA) |
| **Dimensions** | 256 × 256 px |
| **Colour depth** | 8-bit/colour RGBA |
| **File size** | Keep under 100 KB for fast loading |
| **Background** | Transparent preferred (alpha channel) |

### Resize an Existing Image with `sips` (macOS built-in)

```bash
# Resize to 256x256 (overwrites in place)
sips -z 256 256 /path/to/icon.png

# Resize and write to a new file
sips -z 256 256 /path/to/icon.png --out ~/.claude/claude-code-icon.png
```

### Verify Image Properties

```bash
file ~/.claude/claude-code-icon.png
# Expected: PNG image data, 256 x 256, 8-bit/color RGBA, non-interlaced
```

### Convert SVG to PNG

```bash
# Using qlmanage (macOS built-in)
qlmanage -t -s 256 -o ~/.claude design/icon.svg

# Using ImageMagick (brew install imagemagick)
convert design/icon.svg -resize 256x256 ~/.claude/claude-code-icon.png
```

---

## Sound Names Reference

Sounds are located at `/System/Library/Sounds/`. Common options:

| Name | Character |
|---|---|
| `Glass` | Soft, subtle |
| `Crystal` | Clear, attention-grabbing |
| `Ping` | Short beep |
| `Pop` | Very subtle |
| `Basso` | Low tone, error-like |
| `Blow` | Airy, soft |
| `Morse` | Tap pattern |
| `Sosumi` | Classic macOS |

---

## Comparison: terminal-notifier vs osascript

| Feature | terminal-notifier | osascript |
|---|---|---|
| Installation | `brew install terminal-notifier` | Built-in |
| Custom image | `-contentImage` ✓ | Not supported |
| Custom sound | `-sound <name>` ✓ | `sound name "<name>"` ✓ |
| Dynamic message | Via stdin + `jq` | Via shell variable |
| Click action | `-open`, `-activate` ✓ | Not supported |
| macOS compatibility | 10.10+ | All versions |

---

## Change Log

| Date | Changes |
|---|---|
| 2026-04-13 | Initial documentation; includes `-appIcon` → `-contentImage` fix, osascript setup, and image recommendations |

---

**Last Updated:** 2026-04-13
