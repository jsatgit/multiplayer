import Page from './page';

const ENTER_KEY = 13;

let form = null;

/**
 * Form for user registration 
 */
class Form extends Page {
  constructor() {
    super();
    this.el = document.getElementById('form');
  }

  get element() {
    return this.el;
  }

  /**
   * submit user input form
   */
  submit() {
    return new Promise(resolve => {
      const nameInput = document.getElementById('name');
      const hostInput = document.getElementById('host');
      const botInput = document.getElementById('bot');
      this.el.addEventListener('keyup', evt => {
        if (evt.which == ENTER_KEY) {
          resolve({
            'name': nameInput.value,
            'host': hostInput.value,
            'isBot': botInput.checked
          });
        }
      });
    });
  }
}

/**
 * Returns global form object 
 */
export function getForm() {
  if (!form) {
    form = new Form();
  }
  return form;
}
