To render an accurate e-mail that avoids receiving spam.

Replaces the display text of an `<a href="mailto:…" data-user="bob" data-domain="">` link with the e-mail address constructed from the `data-user` and `data-domain` attributes.

> **☞ Remember**
>
> The default display text should be an _**in**accurate_ e-mail address.

> **⚠️ Important**
>
> To make sure link is discernable if CSS does not load, make it obvious to users what part of an e-mail is inaccurate, e.g. `__REMOVE_THIS__`.

**Known Bugs**

1. The underline (on hover) is not offset from generated text (because the font-size of actual text is zero).
