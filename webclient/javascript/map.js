import loadGoogleMapsAPI from 'load-google-maps-api';
import Page from './page';
import Marker from './marker';

let map = null;

export const CLICK = 'click';

const eventWrapper = {
  [CLICK]: evt => evt.latLng.toJSON()
};

/**
 * The map view containing the google maps
 * @extends Page
 */
class Map extends Page {
  constructor() {
    super();
    this.googleMap = null;
    this.eventMappings = [];
    this.mapElement = document.getElementById('map');
    this.mapPromise = null;
  }

  isReady() {
    return this.googleMap;
  }

  addEventMapping(mapping) {
    for (let evt in mapping) {
      this.googleMap.addListener(evt, e => {
        const wrappedEvent = eventWrapper[evt](e);
        mapping[evt](wrappedEvent);
      });
    }
  }

  setEventMappings() {
    while (this.eventMappings.length) {
      this.addEventMapping(this.eventMappings.pop());
    }
  }

  get element() {
    return this.mapElement;
  }

  /**
   * Load google maps given config by calling Google Maps API
   * @param {Object} mapInfo - configuration for google maps
   * @param {string} mapInfo.apiKey - google Maps API key
   * @param {Object} mapInfo.centerPosition - coordinates of the center of the map
   */
  load(mapInfo) {
    this.mapPromise = new Promise((resolve, reject) => {
      loadGoogleMapsAPI({
        key: mapInfo.apiKey
      }).then(maps => {
        this.googleMap = new google.maps.Map(this.mapElement, {
          center: mapInfo.centerPosition,
          zoom: 18
        });
        this.setEventMappings();
        resolve();
      });
    });
  }

  /**
   * Add an event mapping
   * @param {Object} mapping - mapping from event name to callback function
   */
  addMapping(mapping) {
    if (this.isReady()) {
      this.addEventMapping(mapping);
    } else {
      this.eventMappings.push(mapping);
    }
  }

  /**
   * Add a marker to the map
   * @param {Object} markerOptions
   * @param {Object} position - coordinates where the marker is placd
   * @param {String} icon - url of the asset that visually represents the marker
   * @param {InfoWindow} view - the view that is rendered when the marker is hovered or clicked
   * @returns {Marker} the marker object that was created
   */
  addMarker(markerOptions) {
    const marker = new Marker(markerOptions);
    if (this.isReady()) {
      marker.setMap(this.googleMap);
    } else {
      this.mapPromise.then(() => marker.setMap(this.googleMap));
    }
    return marker;
  }

}

/**
 * retrieves the global map object
 * @returns {Map}
 */
export function getMap() {
  if (!map) {
    map = new Map();
  }
  return map;
}
