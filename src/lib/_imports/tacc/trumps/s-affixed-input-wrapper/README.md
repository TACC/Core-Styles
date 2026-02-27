To affix a symbol before or after a field.

_This is an isolated feature from [Bootstrap Input Group](https://getbootstrap.com/docs/4.0/components/input-group/#basic-example)._

**Use Cases**

- [APCD](https://apcd-qa.tacc.utexas.edu/register/request-to-submit) "Total Claims Value"
- [Core Portal](https://github.com/TACC/Core-Portal) to replace [Bootstrap `.input-group`](https://getbootstrap.com/docs/4.0/components/input-group/)*

<small>* Bootstrap `.input-group` requires extra markup, which can make it cumbersome to combine React JSX components without the components having "external knowledge".</small>

**Known Bugs**

1. A `s-affixed-input-wrapper__suffix` overlaps with browser controls e.g.
   - `<input type="number">` arrows
   - `<input type="date">` calendar
   - `<input type="time">` clock

<script src="{{path '/assets/scripts/open-ext-links-in-new-window.js'}}" />
