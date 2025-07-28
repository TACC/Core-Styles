/**
 * Makes text selectable within anchor links
 * (applies to existing links and new links)
 * @param {string} [attribute="data-text-selectable"] - The attribute to add to selectable text selectable
 */
function makeLinkTextSelectable(attribute = 'data-text-selectable') {

  const style = document.createElement('style');
        style.textContent = `
          a[${attribute}] :is(p, h1, h2, h3, h4, h5, h6) {
            cursor: text;
            -webkit-user-select: text;
            user-select: text;
          }
      `;
  document.head.appendChild(style);

  function processLink(link) {
    link.draggable = false;
    link.setAttribute(attribute, 'true');

    link.querySelectorAll('p, h1, h2, h3, h4, h5, h6').forEach(element => {
      element.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    });
  }

  // For present links
  document.querySelectorAll('a').forEach(processLink);

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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', makeLinkTextSelectable);
} else {
  makeLinkTextSelectable();
}
