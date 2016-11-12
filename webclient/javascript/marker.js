class Marker {
  constructor(options) {
    this.options = options;
    this.marker = null;
    this.map = null;
  }

  setMap(map) {
    this.map = map;
    this.createMarker();
  }

  createMarker() {
    this.marker = new google.maps.Marker({
      position: this.options.position,
      icon: this.options.icon,
      map: this.map 
    });
    if (this.options.content) {
      this.addContent();
    }
  }

  setPosition(position) {
    if (this.marker) {
      this.marker.setPosition(position);
    }
  }

  remove() {
    this.marker.setMap(null);
  }

  addContent() {
    const infowindow = createInfoWindow(this.options.content);
    this.marker.addListener(
      'mouseover',
      () => infowindow.open(this.map, this.marker)
    );
    this.marker.addListener('mouseout', () => infowindow.close());
  }
}


function createInfoWindow(content) {
  return new google.maps.InfoWindow({
    content: content
  });
}

export default Marker;
