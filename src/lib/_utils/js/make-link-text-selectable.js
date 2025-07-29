/**
 * Makes text selectable within anchor links
 * (applies to existing links and new links)
 * @param {string} [attribute="data-text-selectable"] - The attribute to add to selectable text selectable
 * @param {string|string[]} [contentQuerySelector='*'] - CSS selector string to match the elements to make selectable
 * @param {string} [layer] - A CSS layer to use for styles
 * @returns {Object} An object with a `disable` method to remove the functionality
 */
export default function makeLinkContentSelectable(
  attribute = 'data-text-selectable',
  contentQuerySelector = '*',
  layer
) {
  const style = document.createElement('style');
        style.textContent = `
          a[${attribute}] {
            display: inline-block;
          }
          a[${attribute}] :is(${contentQuerySelector}) {
            cursor: text;
            -webkit-user-select: text;
            user-select: text;
          }
      `;
      if (layer) {
        style.textContent = `
        @layer ${layer} {` + '\n'
          + style.textContent + `
        }`;
      }
  document.head.appendChild(style);

  function processLink(link) {
    link.draggable = false;
    link.setAttribute(attribute, 'true');

    link.querySelectorAll(contentQuerySelector).forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }

  // For present links
  document.querySelectorAll(`a:has(${contentQuerySelector})`).forEach(processLink);

  // For future links
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.tagName === 'A') processLink(node);
          const links = node.querySelectorAll && node.querySelectorAll('a');
          if (links) links.forEach(processLink);
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  console.log('Activated selectable text in links');

  return {
    /** To disable selectable text in links */
    disable: () => {
      observer.disconnect();
      style.remove();
      document.querySelectorAll(`a[${attribute}]`).forEach(link => {
        link.removeAttribute(attribute);
        link.draggable = true;
      });
      console.log('Disabled selectable text in links');
    }
  };
}
