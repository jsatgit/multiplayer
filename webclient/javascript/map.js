import loadGoogleMapsAPI from 'load-google-maps-api';

/**
 * Interface with google maps api
 */
class Map {
  constructor() {
    this.googleMaps = null;
  }

  createInfoWindow(content) {
    return new google.maps.InfoWindow({
      content: content 
    });
  }

  addContentToMarker(marker, content) {
    const infowindow = this.createInfoWindow(content);
    marker.addListener('mouseover', () => {
      infowindow.open(this.googleMaps, marker);
    });
    marker.addListener('mouseout', () => {
      infowindow.close();
    });
  }

  addMarker(position, icon, content) {
    const marker = new google.maps.Marker({
      position: position,
      map: this.googleMaps,
      icon: icon
    });
    if (content) {
      this.addContentToMarker(marker, content);
    }
    return marker;
  }

  load(apiKey, centerPosition) {
    return new Promise((resolve, reject) => {
      loadGoogleMapsAPI({
        key: apiKey
      }).then(maps => {
        this.googleMaps = new google.maps.Map(document.getElementById('map'), {
          center: centerPosition,
          zoom: 18 
        });
        resolve();
      });
    });
  } 
}

export default Map;
