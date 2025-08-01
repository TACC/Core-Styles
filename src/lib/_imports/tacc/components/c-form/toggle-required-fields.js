/** To toggle required attribute (and classes) of fields (and field wrappers) */

/**
 * @constant
 * @default
 * @type {object.<string,*>}
 */
 const DEFAULT_CLASS_NAMES = {
  /* The class added when required state has been changed and is active */
  jsIs: 'js-is-required',
  /* The class added when required state has been changed and is not active */
  jsNot: 'js-not-required',
  /* The class for the wrapper of a field that is required */
  wrapRequired: undefined,
};

/**
 * @constant
 * @default
 * @type {object.<*,*>}
 */
 const DEFAULT_OPTIONS = {
  /* @type {boolean} - should scroll to the first required field */
  shouldScrollToFirst: false,
  /* @type {DEFAULT_CLASS_NAMES} */
  classNames: {}
};

/**
 * @constant
 * @default
 * @type {object.<string,*>}
 */
 const DEFAULT_SELECTORS = {
  /* The wrapper of a field */
  wrap: 'div'
};

/**
 * Make a field NOT required (and update field wrapper accordingly)
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {DEFAULT_CLASS_NAMES} classNames
 * @param {DEFAULT_SELECTORS} selectors
 */
function unRequireField( field, classNames, selectors ) {
  const wrap = field.closest( selectors.wrap );

  field.required = false;
  field.classList.add( classNames.jsNot );
  field.classList.remove( classNames.jsIs );
  if ( wrap && classNames.wrapRequired ) {
    wrap.classList.remove( classNames.wrapRequired );
  }
}

/**
 * Make a field REQUIRED (and update field wrapper accordingly)
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {DEFAULT_CLASS_NAMES} classNames
 * @param {DEFAULT_SELECTORS} selectors
 */
function requireField( field, classNames, selectors ) {
  const wrap = field.closest( selectors.wrap );

  field.required = true;
  field.classList.add( classNames.jsIs );
  field.classList.remove( classNames.jsNot );
  if ( wrap && classNames.wrapRequired ) {
    wrap.classList.add( classNames.wrapRequired );
  }
}

/**
 * Toggle required attribute (and classes) of fields (and field wrappers)
 * @param {Document|HTMLElement} [scope=document] - where to search for fields
 * @param {object.<string,*>} [opts]
 * @param {DEFAULT_CLASS_NAMES} [opts.classNames] - to scroll to first such field
 * @param {DEFAULT_SELECTORS} [opts.selectors] - to scroll to first such field
 * @param {boolean} [opts.shouldScrollToFirst] - to scroll to first such field
 */
export default function toggleRequiredFields( scope = document, opts ) {
  const classNames = Object.assign( DEFAULT_CLASS_NAMES, opts.classNames );
  const selectors = Object.assign( DEFAULT_SELECTORS, opts.selectors );
  const options = Object.assign( DEFAULT_OPTIONS, opts );
  const requiredFields = scope.querySelectorAll(`
    [required]:is(input, select, textarea),
    .` + classNames.jsNot + `
  `);

  [ ...requiredFields ].forEach( field => {
    if ( field.hasAttribute('required') ) {
      unRequireField( field, classNames, selectors );
    } else {
      requireField( field, classNames, selectors );
    }
  });

  if ( options.shouldScrollToFirst ) {
    requiredFields[0].scrollIntoView( false );
  }
}
