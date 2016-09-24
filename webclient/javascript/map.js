import loadGoogleMapsAPI from 'load-google-maps-api';

/**
 * Interface with google maps api
 */
class Map {
  constructor() {
    this.googleMaps = null;
  }

  addMarker(position, icon) {
    return new google.maps.Marker({
      position: position,
      map: this.googleMaps,
      icon: icon
    });
  }

  load(apiKey, centerPosition) {
    return new Promise((resolve, reject) => {
      loadGoogleMapsAPI({
        key: apiKey
      }).then(maps => {
        this.googleMaps = new google.maps.Map(document.getElementById('map'), {
          /*
           * TODO center data should be gotten from the server
           * load maps after connecting to server
           */
          center: centerPosition,
          zoom: 18 
        });
        resolve();
      });
    });
  } 
}

export default Map;
