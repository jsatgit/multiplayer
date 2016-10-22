/*
 * has a notion of state
 * keeps track of the markers
 * and who they belong to
 */
class StatefulView {
  constructor(view) {
    this.view = view;
    this.peopleMarkers = {};
  }

  addHouse(house, owner) {
    this.view.addHouse(house.position, `${owner.name}\'s house`);
  }

  addPerson(person) {
    // TODO reconsider spreading out here
    const personMarker = this.view.addPerson(person.position, {
      name: person.name,
      gold: person.gold
    });
    this.peopleMarkers[person.id] = personMarker
  }

  updatePersonPosition(personId, position) {
    this.view.setPosition(this.peopleMarkers[personId], position);
  }

  removePerson(person) {
    this.view.removeMarker(this.peopleMarkers[person.id])
  }
}

export default StatefulView;
