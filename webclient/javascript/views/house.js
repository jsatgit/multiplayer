import View from './view';
import HouseModel from '../models/house';
import Map from '../map';
import Marker from '../marker';
import HouseInfoWindow from './infowindows/houseInfoWindow';

const HOUSE_ICON = 'http://findicons.com/files/icons/1672/mono/32/home.png';

class House extends View {
  constructor() {
    super();
    this.marker = null;
  }

  render(house) {
    this.marker = Map.addMarker({
      position: house.position,
      icon: HOUSE_ICON,
      view: new HouseInfoWindow(house)
    });
  }

  handler() {
    return {
      [HouseModel.REMOVE]: () => {
        this.marker.remove();
      }
    };
  }
}

export default House;
