import View from './view';
import PersonModel from '../models/person';
import Map from '../map';
import PersonInfoWindow from './infowindows/personInfoWindow';

const PERSON_ICON = 'https://www.apec-econ.ca/system/style/images/icon-small-person.png';

class Person extends View {
  constructor() {
    super();
    this.marker = null;
    this.infoWindow = null;
  }

  render(person) {
    this.infoWindow = new PersonInfoWindow(person);
    this.marker = Map.addMarker({
      position: person.position,
      icon: PERSON_ICON,
      view: this.infoWindow 
    });
  }

  handler() {
    return {
      [PersonModel.UPDATE_POSITION]: position => {
        this.marker.setPosition(position);
      },
      [PersonModel.REMOVE]: () => {
        this.marker.remove();
      },
      [PersonModel.UPDATE_INVENTORY]: () => {
        this.infoWindow.updateInventory();
      }
    };
  }
}

export default Person;
