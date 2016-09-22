import loadGoogleMapsAPI from 'load-google-maps-api';

const COQUITLAM = {lat: 49.2838, lng: -122.7932};

class Map {
  constructor(map, server) {
    this.googleMaps = null;
    this.currentPosition = COQUITLAM;
  }

  addMarker(position, icon) {
    return new google.maps.Marker({
      position: position,
      map: this.googleMaps,
      icon: icon
    });
  }


  load() {
    return new Promise((resolve, reject) => {
      loadGoogleMapsAPI({
        key: 'AIzaSyB31n3sHV4rZCA8MtIx3_mRBoxznPUYYGY'
      }).then(maps => {
        this.googleMaps = new google.maps.Map(document.getElementById('map'), {
          center: this.currentPosition,
          zoom: 18 
        });
        resolve();
      });
    });
  } 
}

export default Map;
