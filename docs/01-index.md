---
title: TACC UI Pattern Library
---

This is the demo and source of [TACC shared CSS][tacc shared css].

The pattern CSS is available via [@tacc/core-styles].

The patterns are organized by [ITCSS][tacc itcss].

Any patterns that expect Bootstrap are tested on [Bootstrap 4.3.1][bootstrap].

---

Known Clients:

- [TACC/tup-ui]
- [TACC/Core-CMS]
- [TACC/Core-Portal]

[tacc/tup-ui]: https://github.com/TACC/tup-ui
[tacc/core-cms]: https://github.com/TACC/Core-CMS
[tacc/core-portal]: https://github.com/TACC/Core-Portal
[@tacc/core-styles]: https://www.npmjs.com/package/@tacc/core-styles

[tacc shared css]: https://tacc-main.atlassian.net/wiki/x/PR1v
[tacc itcss]: https://tacc-main.atlassian.net/wiki/x/QQhv
[bootstrap]: https://getbootstrap.com/docs/4.3/

<script type="module">
Array.from(document.body.querySelectorAll('a'))
  .filter(link => link.hostname != window.location.hostname)
  .forEach(link => link.target = '_blank');
</script>
