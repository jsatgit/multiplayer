class PersonInfoWindow {
  constructor(person) {
    this.person = person
  }

  render() {
    return `
      <div>
        <div>${this.person.name}</div>
        <div>Gold: $${this.person.gold}</div>
      </div>
    `;
  }
}

export default PersonInfoWindow;
