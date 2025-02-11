export const defaults = {
  elements: document.querySelectorAll(`
    [class*="js-show-more"]
  `),
  options: {
    lines: 1,
    targetTag: 'span',
    shouldToggleResembleLink: false,
    startIndex: 0,
  },
};

/**
 * Convert elements with js-show-more--* classes into show-more components
 */
export function generateMarkup(
  elements = defaults.elements,
  options = defaults.options
) {
  options = { ...defaults.options, ...options };

  [...elements].forEach((element, index) => {
    if (element.querySelector('p, div, section, article, aside, nav, header, hgroup, footer, main')) {
      console.warn(
        'A "c-show-more" component expects only text and inline elements. Block elements may not truncate correctly. Consider restructuring content to avoid block elements.',
        element
      );
    }

    const wrapper = document.createElement(element.tagName);
    wrapper.className = element.className;
    wrapper.classList.add('c-show-more');
    wrapper.classList.add(`c-show-more--${options.lines === 1 ? 'one-line' : 'many-lines'}`);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'c-show-more__state';
    checkbox.id = `show-more-${options.startIndex + index}`;

    const target = document.createElement(options.targetTag);
    target.className = 'c-show-more__target';
    target.innerHTML = element.innerHTML;
    target.style.setProperty('--lines', options.lines);

    const toggle = document.createElement('label');
    toggle.className = 'c-show-more__toggle';
    toggle.htmlFor = checkbox.id;

    const onText = document.createElement('span');
    onText.className =
      `${options.shouldToggleResembleLink ? 'x-link ' : ''}`
      + 'c-show-more__on-text';
    onText.textContent = 'Show More';

    const offText = document.createElement('span');
    offText.className =
      `${options.shouldToggleResembleLink ? 'x-link ' : ''}`
      + 'c-show-more__off-text';
    offText.textContent = 'Show Less';

    toggle.appendChild(onText);
    toggle.appendChild(offText);

    wrapper.appendChild(checkbox);
    wrapper.appendChild(target);
    wrapper.appendChild(toggle);

    element.replaceWith(wrapper);
  });
}
