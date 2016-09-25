const ENTER_KEY = 13

class Form {
  constructor() {
    this.form = document.getElementById('form');
  }

  submit() {
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

  hide() {
    this.form.style.display = 'none';
  }
}

export default Form;
