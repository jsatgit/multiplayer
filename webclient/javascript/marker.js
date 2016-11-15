class Marker {
  constructor(options) {
    this.options = options;
    this.marker = null;
    this.map = null;
    this.infoWindow = null;
    this.infoWindowStayOpen = false;
    this.isFirstOpen = true;

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
    this.infoWindow.open(this.map, this.marker);
    if (this.isFirstOpen) {
      this.onFirstOpen();
      this.isFirstOpen = false;
    }
  }


  closeInfoWindow() {
    if (!this.infoWindowStayOpen) {
      this.infoWindow.close();
    }
  }

  onFirstOpen() {
    if (this.options.view.onButtonClick) {
      const view = this.options.view; 
      const button = document.getElementById(view.buttonId);
      button.addEventListener('click', view.onButtonClick.bind(view));
    }
  }

  toggleInfoWindow() {
    if (this.infoWindowStayOpen) {
      this.infoWindowStayOpen = false;
      this.closeInfoWindow();
    } else {
      this.infoWindowStayOpen = true;
      this.openInfoWindow();
    }
  }
}


function createInfoWindow(content) {
  return new google.maps.InfoWindow({
    content: content
  });
}

export default Marker;
