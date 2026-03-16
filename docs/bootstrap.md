# Bootstrap Compatibility

## Core Styles v2

Because [several TACC projects load Bootstrap (internal document)](https://tacc-main.atlassian.net/wiki/x/khJv).

- independent of Bootstrap
- alters some Bootstrap styles
- replaces some Bootstrap classes

## [Core Styles v3](https://github.com/orgs/TACC/projects/10)

Because external projects, that request TACC assistance, often use Bootstrap.

Core-Styles v3 will support Bootstrap differently, but will retain existing compatibility.

## Support

Any support is for [Bootstrap v4](https://getbootstrap.com/docs/4.0) unless otherwise noted.

| Where ad-hoc CSS <u>replaces</u> Bootstrap | Bootstrap
| - | -
| [Grid](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grid) (on [Core Portal])\* | [Grid](https://getbootstrap.com/docs/4.0/layout/grid/)
| [elements](https://github.com/TACC/Core-Styles/tree/v2.14.0/src/lib/_imports/elements) & [generics](https://github.com/TACC/Core-Styles/tree/v2.14.0/src/lib/_imports/elements) | [Reboot](https://getbootstrap.com/docs/4.0/getting-started/introduction/#reboot)
| ad-hoc clases & styles | [Utilities](https://getbootstrap.com/docs/4.0/utilities/borders/)

| Core Styles that <u>replace</u> Bootstrap | Bootstrap
| - | -
| [Message](https://cep.tacc.utexas.edu/static/ui/components/detail/c-message--scope-cms.html) | Alerts
| [Admonition](https://cep.tacc.utexas.edu/static/ui/components/detail/admonition.html) (on [TACC Docs])† | Alerts
| [Form](https://cep.tacc.utexas.edu/static/ui/components/detail/c-form--default.html) | Forms
| [Input Wrapper](https://cep.tacc.utexas.edu/static/ui/components/detail/s-affixed-input-wrapper--prepend-and-append) | Input Groups
| [Button](https://cep.tacc.utexas.edu/static/ui/components/detail/c-button--secondary.html) | Buttons
| [Card](https://cep.tacc.utexas.edu/static/ui/components/detail/c-card--standard.html) | Cards
| [Page](https://github.com/TACC/Core-Styles/blob/v2.14.0/src/lib/_imports/components/c-page.css) | Pagination
| [Tag](https://cep.tacc.utexas.edu/static/ui/components/detail/c-tag.html) | Badges

| Core Styles that <u>extend</u> Bootstrap | Bootstrap
| - | -
| [Row](https://github.com/TACC/Core-Styles/blob/v2.14.0/src/lib/_imports/components/bootstrap.row.css) | [Grid](https://getbootstrap.com/docs/4.0/layout/grid/): Row

| Core Styles that <u>change</u> Bootstrap | Bootstrap
| - | -
| [Buttons](https://cep.tacc.utexas.edu/static/ui/components/detail/btn) | [Buttons (**v5**)](https://getbootstrap.com/docs/5.2/components/buttons/)
| [Colors](https://cep.tacc.utexas.edu/static/ui/components/detail/color) | [Colors (**v5**)](https://getbootstrap.com/docs/5.2/utilities/colors/)
| [Container](https://cep.tacc.utexas.edu/static/ui/components/detail/bootstrap--container.html) | [Grid](https://getbootstrap.com/docs/4.0/layout/grid/): Container
| [Breadcrumb](https://cep.tacc.utexas.edu/static/ui/components/detail/bootstrap3--breadcrumb) | [Breadcrumb (**v3**)](https://getbootstrap.com/docs/4.0/components/breadcrumb/)
| [Modal](https://cep.tacc.utexas.edu/static/ui/components/detail/bootstrap--modal.html) | [Modal](https://getbootstrap.com/docs/4.0/components/modal/)
| [Nav Tabs](https://cep.tacc.utexas.edu/static/ui/components/detail/bootstrap--nav-tabs.html) | Navs: [Tabs](https://getbootstrap.com/docs/4.0/components/navs/#tabs)
| [Pagination](https://github.com/TACC/Core-Styles/blob/v2.14.0/src/lib/_imports/components/bootstrap.pagination.css) | [Pagination](https://getbootstrap.com/docs/4.0/components/pagination/)

| Where Core Styles <u>yields</u> to Bootstrap | Bootstrap
| - | -
| Modal | [Modal](https://getbootstrap.com/docs/4.0/components/modal/)
| Grid (on [Core CMS])\* | [Grid](https://getbootstrap.com/docs/4.0/layout/grid/)

<sup>\* On [Core Portal], use regular CSS Grid, because it is more flexible. On [Core CMS], use Bootstrap Grid, because we use a Django CMS Bootstrap plugin.</sup>\
<sup>† On [TACC Docs] and Admonitions plugin is available. Core Styles redesigns them to extend its own "Messages" design.</sup>

[Core CMS]: https://github.com/TACC/Core-CMS
[Core Portal]: https://github.com/TACC/Core-Portal
[TACC Docs]: https://github.com/TACC/TACC-Docs
