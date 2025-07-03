Suitable markup is [Table elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element#table_content) and [Description Lists](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl).

## Multi-Row Items

For data list items that span multiple rows, use the `c-data-list__row--start-final` class on the row that starts the final group. This ensures consistent background coloring for all subsequent rows in the group.

**Usage:**
```html
<tr class="c-data-list__row--start-final">
  <th class="c-data-list__key">Analysis of this Data</th>
  <td class="c-data-list__value">First item</td>
</tr>
<tr>
  <td></td>
  <td class="c-data-list__value">Second item</td>
</tr>
<tr>
  <td></td>
  <td class="c-data-list__value">Third item</td>
</tr>
```

<script src="{{path '/assets/_utils/js/open-ext-links-in-new-window.js'}}" />
