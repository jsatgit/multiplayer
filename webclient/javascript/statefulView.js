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

  addHouse(house) {
    this.view.addHouse(house.position);
  }

  addPerson(person) {
    const personMarker = this.view.addPerson(person.position, person.name);
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
