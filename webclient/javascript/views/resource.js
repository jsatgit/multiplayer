import View from './view'
import ResourceInfoWindow from './infowindows/resourceInfoWindow'
import Map from '../map'
import ResourceModel from '../models/resource'

class Resource extends View {
  constructor(color) {
    super();
    this.marker = null;
    this.infoWindow = null;
  }

  render(resource, color) {
    this.infoWindow = new ResourceInfoWindow(resource)
    this.marker = Map.addMarker({
      position: resource.position,
      icon: {
        path: 'M -2,0 0,-2 2,0 0,2 z',
        strokeColor: color,
        fillColor: color,
        fillOpacity: 1,
        scale: 3
      },
      view: this.infoWindow 
    });
  }

  handler() {
    return {
      [ResourceModel.UPDATE_AMOUNT]: amount => {
        this.infoWindow.updateAmount(amount);
      }
    };
  }
}

export default Resource;
