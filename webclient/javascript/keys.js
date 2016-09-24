class Keys {
  static get UP() { return 119; }
  static get DOWN() { return 115; }
  static get RIGHT() { return 100; }
  static get LEFT() { return 97; }
  static get SPACE() { return 32; }

  attachContextToBindings(context) {
    for (let keyCode in this.bindings) {
      this.bindings[keyCode] = this.bindings[keyCode].bind(context);
    }
  }

  registerBindingWithKeyPress() {
    document.addEventListener('keypress', evt => {
      this.bindings[evt.which]();
    });
  }

  setBindings(bindings, context) {
    this.bindings = bindings;
    this.attachContextToBindings(context);
    this.registerBindingWithKeyPress();
  }
}

export default Keys;
