import View from './view'
import PersonModel from '../models/person'
import Map from '../map';
import PersonInfoWindow from './infowindows/personInfoWindow'

const PERSON_ICON = 'https://www.apec-econ.ca/system/style/images/icon-small-person.png'

class Person extends View {
  constructor() {
    super();
    this.marker = null;
  }

  render(person) {
    this.marker = Map.addMarker({
      position: person.position,
      icon: PERSON_ICON,
      view: new PersonInfoWindow(person)
    });
  }

  handler() {
    return {
      [PersonModel.UPDATE_POSITION]: position => {
        this.marker.setPosition(position);
      },
      [PersonModel.REMOVE]: () => {
        this.marker.remove();
      }
    }
  }
}

export default Person;
