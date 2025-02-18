Container with content and action(s) about a single subject.

| Class (Std.)               | Class (Alt.)             | Description
| - | - | - |
| `.c-card`                  | `.card`                  | add padding to content
| `.c-card--plain`           | `.card--plain`           | add background*
| `.c-card--plain-hr-top`    | `.card--plain-hr-top`    | prepend an `<hr>`
| `.c-card--plain-hr-bottom` | `.card--plain-hr-bottom` | append an `<hr>`
| `.c-card--standard`        | `.card--standard`        | add background + border*

<small>* Colors depend on card context/parent.</small>

---

To support images at different positions:

| Class (Std.)               | Class (Alt.)             | Description
| - | - | - |
| `.c-card--image-...`       | `.card--image-...`       | position a single image
| `.c-card--image-top`       | `.card--image-top`       | position image to top
| `.c-card--image-bottom`    | `.card--image-bottom`    | position image to bottom
| `.c-card--image-left`      | `.card--image-left`      | position image to left
| `.c-card--image-right`     | `.card--image-right`     | position image to right

---

Backup classes if `c-card--standard` automatic styles fail:

| Class (Std.)          | Class (Alt.)        | Description
| - | - | - |
| `.c-card--standard-1` | `.card--standard-1` | teal border, gray background
| `.c-card--standard-2` | `.card--standard-2` | teal border, white background
| `.c-card--standard-3` | `.card--standard-3` | brown border, white background
