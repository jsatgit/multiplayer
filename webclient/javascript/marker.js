class Marker {
  constructor(options) {
    this.options = options;
    this.marker = null;
    this.map = null;

    this.infoWindow = null;
    this.isInfoWindowOpen = false;
    this.isInfoWindowSticky = false;

    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.toggleInfoWindow = this.toggleInfoWindow.bind(this);
  }

  addButtonClickListener(buttonClickCallback) {
    this.buttonClickCallback = buttonClickCallback;
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
    if (this.options.view) {
      this.renderContent();
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

  renderContent() {
    this.infoWindow = createInfoWindow(this.options.view.render());
    this.marker.addListener('mouseover', this.openInfoWindow);
    this.marker.addListener('mouseout', this.closeInfoWindow);
    this.marker.addListener('click', this.toggleInfoWindow);
  }

  openInfoWindow() {
    if (this.isInfoWindowOpen) {
      return;
    }

    this.isInfoWindowOpen = true;
    this.infoWindow.setContent(this.options.view.render());
    this.infoWindow.open(this.map, this.marker);

    if (this.options.view.onRendered) {
      this.options.view.onRendered();
    }
  }

  closeInfoWindow() {
    if (!this.isInfoWindowOpen 
        || (this.isInfoWindowOpen && this.isInfoWindowSticky)
    )  {
      return;
    }

    this.isInfoWindowOpen = false;
    this.infoWindow.close();
  }

  toggleInfoWindow() {
    this.isInfoWindowSticky = !this.isInfoWindowSticky;
    this.isInfoWindowOpen ? this.closeInfoWindow() : this.openInfoWindow();
  }
}


function createInfoWindow(content) {
  return new google.maps.InfoWindow({
    content: content
  });
}

export default Marker;
