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

  addHouse(position) {
    this.view.addHouse(position);
  }

  addPerson(person) {
    const personMarker = this.view.addPerson(person.position);
    this.peopleMarkers[person.id] = personMarker
  }

  updatePersonPosition(personId, position) {
    this.peopleMarkers[personId].setPosition(position);
  }
}

export default StatefulView;
