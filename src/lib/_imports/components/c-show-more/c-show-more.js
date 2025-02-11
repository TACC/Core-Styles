/**
 * Convert elements with js-show-more--* classes into show-more components
 */
function initShowMore() {
  const elements = document.querySelectorAll('[class*="js-show-more--"]');

  [...elements].forEach((element, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = element.className.replace('js-show-more--', 'c-show-more c-show-more--');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'c-show-more__state';
    checkbox.id = `show-more-${index}`;

    const target = document.createElement(element.tagName);
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

document.addEventListener('DOMContentLoaded', initShowMore); 