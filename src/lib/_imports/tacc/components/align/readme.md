Simple classes to align media or content within paragraphs:
- `align-left`
- `align-right`
- `align-center`

> **⚠️ Important**
>
> The alignment can **not** be seen on client without a width on the element. _The demo adds a width._

> **☞ Remember**
>
> The benefit of these classes instead of other solutions (e.g. `style="float:right"`):
>
> 1. Spacing is consistent and aware of its own alignment.
> 2. No need for [deprecated `<img align="…">` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#deprecated_attributes).
> 3. No need for [deprecated `<center>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/center).

> **ⓘ Notice**
>
> These classes are from [Django CMS Picture] ([source]), but suitable for general usage, especially in [TACC-Docs], which does not use Django CMS.

[Django CMS Picture]: https://github.com/django-cms/djangocms-picture#readme
[source]: https://github.com/django-cms/djangocms-picture/blob/2.3.0/djangocms_picture/models.py#L24-L34
[TACC-Docs]: https://github.com/TACC/TACC-Docs/

<script src="{{path '/assets/scripts/open-ext-links-in-new-window.js'}}" />
