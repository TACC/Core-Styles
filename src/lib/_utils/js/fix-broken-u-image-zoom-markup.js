/*
Convert any —

```html
<a class="u-image-zoom--on-hover  whatever">
  <img />
  <h4 />
  <p />
</a>
```

— to —

```html
<a class="whatever" data-original-class="u-image-zoom--on-hover  whatever">
  <span class="u-image-zoom--on-hover">
    <img />
  </span>
  <h4 />
  <p />
</a>
```

— yet do not touch existing —

```html
<a class="whatever">
  <span class="u-image-zoom--on-hover">
    <img />
  </span>
  <h4 />
  <p />
</a>
```
*/

const imageZoomClassName = 'u-image-zoom--on-hover';
const imageZoomElementSelector = `.${imageZoomClassName}`;
const imageZoomMediaSelector = ':is(img, svg):not(:only-child)';

const imageZoomElements = document.querySelectorAll(imageZoomElementSelector);
const brokenImageZoomElements = Array.from(imageZoomElements).filter(element =>
  element.querySelector(`:scope:has(> ${imageZoomMediaSelector})`)
);
brokenImageZoomElements.forEach(function fixZoomElement(zoomElement) {
  const mediaElement = zoomElement.querySelector(imageZoomMediaSelector);
  const zoomElementClassName = zoomElement.className;
  const newInternalZoomElement = document.createElement('span');

  newInternalZoomElement.classList.add(imageZoomClassName);

  mediaElement.replaceWith(newInternalZoomElement);
  newInternalZoomElement.append(mediaElement);

  zoomElement.classList.remove(imageZoomClassName);
  zoomElement.setAttribute('data-original-class', zoomElementClassName);
});
