import makeLinkContentSelectable from './make-link-text-selectable.js';

const params = Object.values({
  attribute: 'data-text-selectable',
  textElementQuerySelector: '*',
  layer: 'base.allow-override'
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    makeLinkContentSelectable(...params)
  });
} else {
  makeLinkContentSelectable(...params);
}
