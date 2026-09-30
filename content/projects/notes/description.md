Notes is a small native macOS app for quick, disposable text: a place to paste, jot and edit without a file dialog in the way. The window, tabs and menus are Cocoa, and the editor is CodeMirror 6 running in a WKWebView, bridged to Swift.

### Key Features
*   **Titlebar Tabs:** Tabs are drawn natively in the titlebar and named after each note's first line. They scroll instead of shrinking when there are many.
*   **Editor:** Multi-cursor editing (`⌘D` adds the next match), find with a match counter, per-note undo history and zoom, all set in JetBrains Mono.
*   **Markdown Preview:** `⌥⌘M` toggles a rendered preview, with links opening in the browser.
*   **Themes:** Dark and light themes that match the native window chrome.
*   **Saving:** Notes persist automatically. `⌘S` writes the current note to `~/Documents/Notes`, overwriting the same file on later saves.
*   **System Integration:** Registers as an alternate editor for plain text and markdown files, and shows character, word and line counts in a status bar.

### Engineering
*   The Swift side holds the authoritative copy of every note, with the web view's storage only as a cache.
*   The CodeMirror bundle is built with esbuild and vendored, so the app has no runtime network dependency.
*   Built-in self-checks (`--self-check`, `--find-check`, `--tabs-check`, `--layout-check`) exercise the editor, search, tab behaviour and layout headlessly, each against an isolated store.
