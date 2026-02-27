/**
 * Makes text selectable within specified anchor links
 * (applies to existing links and new links)
 * @param {string} [linkAttribute="data-text-selectable"] - The linkAttribute on links with selectable text
 * @param {string|string[]} [linkTextSelector='*'] - Query to find link text elements to make selectable
 * @param {string} [cssLayer] - The CSS layer for the required styles
 * @returns {Object} An object with a `disable` method to remove the functionality
 */
export default function makeLinkContentSelectable(
  linkAttribute = 'data-text-selectable',
  linkTextSelector = '*',
  cssLayer
) {
  const linkQuery = `a[${linkAttribute}]:has(${linkTextSelector})`;

  const style = document.createElement('style');
        style.textContent = `
          a[${linkAttribute}] {
            display: inline-block;
          }
          a[${linkAttribute}] :is(${linkTextSelector}) {
            cursor: text;
            -webkit-user-select: text;
            user-select: text;
          }
      `;
      if (cssLayer) {
        style.textContent = `
        @layer ${cssLayer} {` + '\n'
          + style.textContent + `
        }`;
      }
  document.head.appendChild(style);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function processLink(link) {
    link.draggable = false;
    link.querySelectorAll(linkTextSelector).forEach(element => {
      element.addEventListener('click', handleClick);
    });
  }
  function unProcessLink(link) {
    link.draggable = true;
    link.querySelectorAll(linkTextSelector).forEach(element => {
      element.addEventListener('click', handleClick);
    });
  }

  // For present links
  document.querySelectorAll(linkQuery).forEach(link => {
    processLink(link);
  });

  // For future links
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        const isElement = node.nodeType === Node.ELEMENT_NODE;
        const isLinkToProcess = isElement && node.matches(linkQuery);
        if (isLinkToProcess) {
          processLink(node);
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
      document.querySelectorAll(linkQuery).forEach(link => {
        unProcessLink(link);
      });
      console.log('Disabled selectable text in links');
    }
  };
}
