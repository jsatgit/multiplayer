import View from './view'
import HouseModel from '../models/house'
import Map from '../map';
import Marker from '../marker';
import People from '../models/people'

const HOUSE_ICON = 'http://findicons.com/files/icons/1672/mono/32/home.png'

class House extends View {
  constructor() {
    super();
    this.marker = null;
  }

  render(houseModel) {
    const ownerName = People.directory[houseModel.owner].name;
    const content = `
      <div>
        ${ownerName}'s house
      </div>
    `;
    this.marker = Map.addMarker({
      position: houseModel.position,
      icon: HOUSE_ICON,
      content: content
    });
  }

  handler() {
    return {
      [HouseModel.REMOVE]: () => {
        this.marker.remove();
      }
    }
  }
}

export default House;
