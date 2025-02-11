export const DEFAULT_ELEMENTS = document.querySelectorAll(`
  [class*="js-show-more--"]
`);

/**
 * Convert elements with js-show-more--* classes into show-more components
 */
export function generateMarkup(elements = DEFAULT_ELEMENTS, options = {
  targetTag: undefined,
}) {
  [...elements].forEach((element, index) => {
    const wrapper = document.createElement(element.tagName);
    wrapper.className = element.className.replace('js-show-more--', 'c-show-more c-show-more--');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'c-show-more__state';
    checkbox.id = `show-more-${index}`;

    let targetTag = options.targetTag;
    if (!targetTag) {
      switch (true) {
        case wrapper.className.includes('--one-line'):
          targetTag = 'span';
          break;
        default:
          targetTag = 'div';
      }
    }

    const target = document.createElement(targetTag);
    target.className = 'c-show-more__target';
    target.innerHTML = element.innerHTML;

    const toggle = document.createElement('label');
    toggle.className = 'c-show-more__toggle';
    toggle.htmlFor = checkbox.id;
    toggle.innerHTML = `
      <span class="c-show-more__on-text">Show More</span>
      <span class="c-show-more__off-text">Show Less</span>
    `;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(target);
    wrapper.appendChild(toggle);

    element.replaceWith(wrapper);
  });
}
