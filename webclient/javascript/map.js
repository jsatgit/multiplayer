import loadGoogleMapsAPI from 'load-google-maps-api';
import Page from './page'

let googleMap = null;
let mapElement = document.getElementById('map');
let mapPromise = null;
let eventMappings = [];

/**
 * Interface with google maps api
 */
class Map extends Page {
  static get CLICK() {return 'click';}

  static addMarker(markerOptions) {
    const marker = new google.maps.Marker({
      position: markerOptions.position,
      map: googleMap,
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
        googleMap = new google.maps.Map(mapElement, {
          center: mapInfo.centerPosition,
          zoom: 18 
        });
        setEventMappings();
        resolve();
      });
    });
  } 

  static addMapping(mapping) {
    if (Map.isReady()) {
      addEventMapping(mapping)
    } else {
      eventMappings.push(mapping);
    }
  }
    
  static isReady() {
    return googleMap;
  }

  static onReady(func) {
    mapPromise.then(func);
  }

  static get element() {
    return mapElement;
  }

}

const eventWrapper = {
  [Map.CLICK]: evt => evt.latLng.toJSON()
}

function addContentToMarker(marker, content) {
  const infowindow = createInfoWindow(content);
  marker.addListener('mouseover', () => {
    infowindow.open(googleMap, marker);
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

function addEventMapping(mapping) {
  for (let evt in mapping) {
    googleMap.addListener(evt, e => {
      const wrappedEvent = eventWrapper[evt](e);
      mapping[evt](wrappedEvent);
    });
  }
}

function setEventMappings() {
  while (eventMappings.length) {
    addEventMapping(eventMappings.pop())
  }
}

export default Map;
