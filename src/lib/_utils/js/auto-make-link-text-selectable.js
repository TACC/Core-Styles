import makeLinkTextSelectable from './make-link-text-selectable.js';

const params = Object.values({
  attribute: 'data-text-selectable',
  textElementQuerySelector: 'p, h1, h2, h3, h4, h5, h6',
  layer: 'base.allow-override'
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => makeLinkTextSelectable(...params));
} else {
  makeLinkTextSelectable(...params);
}
