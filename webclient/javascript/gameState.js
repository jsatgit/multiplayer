class GameState {
  constructor(myself, people, houses) {
    this.myself = myself;
    this.people = people;
    this.houses = houses;
  }

  get myId() {
    return this.myself.id
  }

  set myPosition(position) {
    this.myself.position = position;
  }

  get myPosition() {
    return this.myself.position;
  }

  getHouseOwner(house) {
    return this.people[house.owner]
  }

  updatePersonPosition(id, position) {
    this.people[id].position = position;
  }

  addPerson(person) {
    this.people[person.id] = person;
  }

  addHouse(house) {
    this.houses.push(house);
  }

  removePerson(person) {
    this.people.pop(person.id);
  }
}

export default GameState;
