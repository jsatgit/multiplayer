import loadGoogleMapsAPI from 'load-google-maps-api';
import Page from './page'

let googleMaps = null;
let mapElement = document.getElementById('map');
let mapPromise = null;

function addContentToMarker(marker, content) {
  const infowindow = createInfoWindow(content);
  marker.addListener('mouseover', () => {
    infowindow.open(googleMaps, marker);
  });
  marker.addListener('mouseout', () => {
    infowindow.close();
  });
}

function createInfoWindow(content) {
  return new google.maps.InfoWindow({
    content: content 
  });
}

/**
 * Interface with google maps api
 */
class Map extends Page {
  static addMarker(markerOptions) {
    const marker = new google.maps.Marker({
      position: markerOptions.position,
      map: googleMaps,
      icon: markerOptions.icon
    });
    if (markerOptions.content) {
      addContentToMarker(marker, markerOptions.content);
    }
    return marker;
  }

  static load(mapInfo) {
    mapPromise = new Promise((resolve, reject) => {
      loadGoogleMapsAPI({
        key: mapInfo.apiKey
      }).then(maps => {
        googleMaps = new google.maps.Map(mapElement, {
          center: mapInfo.centerPosition,
          zoom: 18 
        });
        resolve();
      });
    });
  } 
    
  static isReady() {
    return googleMaps;
  }

  static onReady(func) {
    mapPromise.then(func);
  }

  static get element() {
    return mapElement;
  }

}

export default Map;
