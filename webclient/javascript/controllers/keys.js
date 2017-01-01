/**
 * Key press up event
 */
export const UP = 119;

/**
 * Key press down event
 */
export const DOWN = 115;

/**
 * Key press right event
 */
export const RIGHT = 100;

/**
 * Key press left event
 */
export const LEFT = 97;

/**
 * Key press space event
 */
export const SPACE = 32;

/**
 * Add a mapping for key presses
 */
export function addMapping(mapping) {
  document.addEventListener('keypress', evt => {
    mapping[evt.which]();
  });
}
