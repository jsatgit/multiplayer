import loadGoogleMapsAPI from 'load-google-maps-api';
import Page from './page'
import Marker from './marker'

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
    const marker = new Marker(markerOptions);
    if (isReady()) {
      marker.setMap(googleMap);
    } else {
      mapPromise.then(() => marker.setMap(googleMap));
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
    if (isReady()) {
      addEventMapping(mapping)
    } else {
      eventMappings.push(mapping);
    }
  }

  static get element() {
    return mapElement;
  }
}

const eventWrapper = {
  [Map.CLICK]: evt => evt.latLng.toJSON()
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

function isReady() {
  return googleMap;
}

export default Map;
