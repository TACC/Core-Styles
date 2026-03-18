import makeLinkContentSelectable from './make-link-text-selectable.js';

const params = Object.values({
  linkAttribute: 'data-text-selectable',
  linkTextSelector: '*',
  cssLayer: 'base.allow-override'
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    makeLinkContentSelectable(...params)
  });
} else {
  makeLinkContentSelectable(...params);
}
