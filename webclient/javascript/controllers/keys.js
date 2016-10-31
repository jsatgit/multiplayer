class Keys {
  static get UP() { return 119; }
  static get DOWN() { return 115; }
  static get RIGHT() { return 100; }
  static get LEFT() { return 97; }
  static get SPACE() { return 32; }

  static addMapping(mapping) {
    document.addEventListener('keypress', evt => {
      mapping[evt.which]();
    });
  }
}

export default Keys;
