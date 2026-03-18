/** To toggle error list visibility */

/**
 * @constant
 * @default
 * @type {object.<string,*>}
 */
 const DEFAULT_CLASS_NAMES = {
  jsShow: 'js-show-errors',
  jsHide: 'js-hide-errors'
};

/**
 * @constant
 * @default
 * @type {object.<string,*>}
 */
const DEFAULT_CALLBACKS = {
  hideEach: function ( list ) {
    list.style.display = 'none';
  },
  showEach: function ( list ) {
    list.style.display = '';
  },
  showAll: ( lists ) => {
    lists[0].scrollIntoView( false );
  }
};

/**
 * On each error list hide/show
 * @callback onEach
 * @param {HTMLElement} list
 */
/**
 * After all error lists are hidden/shown
 * @callback afterAll
 * @param {array.<HTMLElement>} lists
 */

/**
 * HIDE an error list
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {string} errorListClass - class on field's wrapper
 */
function hideErrorList( list, classNames, callback ) {
  list.classList.add( classNames.jsHide );
  list.classList.remove( classNames.jsShow );
  if ( typeof callback === 'function' ) {
    callback( list );
  }
}

/**
 * SHOW an error list
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} field
 * @param {string} errorListClass - class on field's wrapper
 */
function showErrorList( list, classNames, callback ) {
  list.classList.add( classNames.jsShow );
  list.classList.remove( classNames.jsHide );
  if ( typeof callback === 'function' ) {
    callback( list );
  }
}

/**
 * Toggle error lists' visibility
 * @param {Document|HTMLElement} [scope=document] - where to search for lists
 * @param {string} [selector] - selector to find error lists
 * @param {object.<string,function>} [optCallbacks]
 * @param {onEach} [optCallbacks.showEach] - on each list show
 * @param {onEach} [optCallbacks.hideEach] - on each list hide
 * @param {afterAll} [optCallbacks.showAll] - on all lists shown
 * @param {afterAll} [optCallbacks.hideAll] - on all lists hidden
 */
export default function toggleErrorLists( scope, selector, optCallbacks ) {
  const classNames = DEFAULT_CLASS_NAMES;
  const callbacks = Object.assign( DEFAULT_CALLBACKS, optCallbacks );
  const lists = scope.querySelectorAll( selector );

  let didHide = false;
  let didShow = false;

  [ ...lists ].forEach( list => {
    if ( list.classList.contains( classNames.jsShow ) ) {
      hideErrorList( list, classNames, callbacks.hideEach );
      didHide = true;
    } else {
      showErrorList( list, classNames, callbacks.showEach );
      didShow = true;
    }
  });

  if ( didHide && typeof callbacks.hideAll === 'function' ) {
    callbacks.hideAll( lists );
  }
  if ( didShow && typeof callbacks.showAll === 'function' ) {
    callbacks.showAll( lists );
  }
}
