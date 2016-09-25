import loadGoogleMapsAPI from 'load-google-maps-api';

/**
 * Interface with google maps api
 */
class Map {
  constructor() {
    this.googleMaps = null;
  }

  createInfoWindow(title) {
    return new google.maps.InfoWindow({
      content: title 
    });
  }

  addTitleToMarker(marker, title) {
    const infowindow = this.createInfoWindow(title);
    marker.addListener('mouseover', () => {
      infowindow.open(this.googleMaps, marker);
    });
    marker.addListener('mouseout', () => {
      infowindow.close();
    });
  }

  addMarker(position, icon, title) {
    const marker = new google.maps.Marker({
      position: position,
      map: this.googleMaps,
      icon: icon
    });
    if (title) {
      this.addTitleToMarker(marker, title);
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
