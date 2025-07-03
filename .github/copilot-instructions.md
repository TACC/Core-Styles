An old-style pattern, e.g. `src/lib/_imports/trumps/s-system-specs`, has documentation in top-of-file comment.
A new-style pattern, e.g. `src/lib/_imports/trumps/s-hero-banner`, has documentation and demo template, config, and (maybe) demo styles in the `src/lib/_imports/*/<pattern-name>` directory.
If creating a pattern, follow new-style not old-style. Minimal example: commit 2444ec9. Typical example: 88764c2. Complex example (reference only as necessary): `src/lib/_imports/components/c-card`.
To name and demo different instances of a pattern within one template, use `<dl>` structure. To use a `<dl>` for a different purpose, set class `no-demo-styles` on the `<dl>`.
