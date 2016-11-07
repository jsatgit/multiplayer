import View from './view'
import PersonModel from '../models/person'
import Map from '../map';

const PERSON_ICON = 'https://www.apec-econ.ca/system/style/images/icon-small-person.png'

class Person extends View {
  constructor() {
    super();
    this.marker = null;
  }

  render(personModel) {
    const content = `
      <div>
        <div>${personModel.name}</div>
        <div>Gold: $${personModel.gold}</div>
      </div>
    `;
    this.marker = Map.addMarker({
      position: personModel.position,
      icon: PERSON_ICON,
      content: content
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
