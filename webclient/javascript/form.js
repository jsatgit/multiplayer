import Page from './page'

const ENTER_KEY = 13

const el = document.getElementById('form');

class Form extends Page {
  static get element() {
    return el;
  }

  static submit() {
    return new Promise(resolve => {
      const nameInput = document.getElementById('name');
      const hostInput = document.getElementById('host');
      const botInput = document.getElementById('bot');
      el.addEventListener('keyup', evt => {
        if (evt.which == ENTER_KEY) {
          resolve({
            'name': nameInput.value,
            'host': hostInput.value,
            'isBot': botInput.checked
          })
        }
      });
    });
  }
}

export default Form;
