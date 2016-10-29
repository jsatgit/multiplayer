import Page from './page'

const ENTER_KEY = 13

const el = document.getElementById('form');

class Form extends Page {
  static get element() {
    return el;
  }

  static submit() {
    return new Promise(resolve => {
      const nameInputField = document.getElementById('name');
      nameInputField.addEventListener('keyup', evt => {
        if (evt.which == ENTER_KEY) {
          resolve({
            'name': nameInputField.value
          })
        }
      });
    });
  }
}

export default Form;
