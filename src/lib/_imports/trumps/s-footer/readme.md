The website footer.

To stick footer at bottom of the page, use <a href="{{path '../detail/sticky-footer' }}" target="_parent">Sticky Footer</a>.

### `.s-footer__identity` (Fat Footer)

When the footer contains **multiple columns** (for example a Bootstrap `row` / `col` grid), wrap the **prose / org / legal** column—the one that should match the same underlined link treatment as a **simple** footer—in an element with class **`s-footer__identity`**.

- **With** `.s-footer__identity`: `s-footer` link styles (inherit color, underline with `color-mix`) apply only to **non-button links inside** that wrapper.
- **Without** any `.s-footer__identity` in the footer: those link styles apply to **all** non-button links in the footer (simple footer).

Column **appearance** (for example `.col-muted`, `.col-dark`) is separate; it does not replace `.s-footer__identity`.

From the `medium` breakpoint up (`width >= 992px`), `.s-footer__identity` also gets `background-color: var(--global-color-primary--x-dark)` so the prose column can read as a distinct panel (see live TACC footer).

See the **Fat Footer** variant in this pattern’s demo.

> **☞ Remember**
>
> [Links]({{path '../detail/links' }}) are not underlined (if client loads <code>core-styles.base.css</code>).
