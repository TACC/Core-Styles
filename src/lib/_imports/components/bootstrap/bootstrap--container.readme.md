To add wider [Bootstrap Grid](https://getbootstrap.com/docs/4.0/layout/grid/) containers.

> **⚠️ Important**
>
> Because Bootstrap grid is so complex, only essential changes are recommended.

> **ⓘ Notice**
>
> Bootstrap grid is powerful, popular, and present; so we do use it as our grid.

<table style="caption-side: bottom;">
  <caption>

  The columns are added using TACC's `xx-wide` and `xxx-wide` custom properties and media queries.

  <caption>
  <thead>
    <tr>
      <th></th>
      <th>Extra extra large <br>
        <small>≥1680px</small>
      </th>
      <th>Extra extra extra large <br>
        <small>≥1920px</small>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Max container width</td>
      <td>1580px</td>
      <td>1800px</td>
    </tr>
    <tr>
      <td># of columns</td>
      <td colspan="2">12</td>
    </tr>
    <tr>
      <td>Gutter width</td>
      <td colspan="2">30px (15px on each side of a column)</td>
    </tr>
    <tr>
      <td>Nestable</td>
      <td colspan="2">Yes</td>
    </tr>
  </tbody>
</table>

<script>
/* To open external links in new window */
Array.from(document.links)
  .filter(link => link.hostname != window.location.hostname)
  .forEach(link => link.target = '_blank');
</script>
