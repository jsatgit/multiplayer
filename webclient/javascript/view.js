const PERSON_ICON = 'https://www.apec-econ.ca/system/style/images/icon-small-person.png'
const HOUSE_ICON = 'http://findicons.com/files/icons/1672/mono/32/home.png'

/*
 * The view does not know about game logic.
 * It is responsible for the images and colours.
 * Under the hood, it uses google maps for the display.
 */
class View {
  constructor(map) {
    this.map = map;
  }

  addPerson(position) {
    return this.map.addMarker(position, PERSON_ICON);
  }

  addHouse(position) {
    return this.map.addMarker(position, HOUSE_ICON);
  }

  removeMarker(marker) {
    marker.setMap(null);
  }

  setPosition(marker, position) {
    marker.setPosition(position);
  }
}

export default View;
