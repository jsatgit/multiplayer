import loadGoogleMapsAPI from 'load-google-maps-api';
 
loadGoogleMapsAPI({
  key: 'AIzaSyB31n3sHV4rZCA8MtIx3_mRBoxznPUYYGY'
}).then((googleMaps) => {
  initMap();
}).catch((err) => {
  console.error(err);
});

var map;
var socket;
var coquitlam = {lat: 49.2838, lng: -122.7932};
var currentLoc = coquitlam;
var LEFT = 97;
var RIGHT = 100;
var UP = 119;
var DOWN = 115;
var INCREMENT = 0.00001;
var SPACE = 32;
var currentMarker;
var personIcon = 'https://www.apec-econ.ca/system/style/images/icon-small-person.png'
var houseIcon = 'http://findicons.com/files/icons/1672/mono/32/home.png'

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: currentLoc,
    zoom: 18 
  });
  onMapLoaded();
}

function up(loc) {
  return {
    lat: loc.lat + INCREMENT,
    lng: loc.lng
  };
}

function down(loc) {
  return {
    lat: loc.lat - INCREMENT,
    lng: loc.lng
  };
}

function left(loc) {
  return {
    lat: loc.lat,
    lng: loc.lng - INCREMENT 
  };
}

function right(loc) {
  return {
    lat: loc.lat,
    lng: loc.lng + INCREMENT 
  };
}

document.addEventListener('keypress', function(evt) {
  console.log(evt.which);
  switch (evt.which) {
    case UP:
      currentLoc = up(currentLoc);
      setPos(currentLoc);
      break;
    case DOWN:
      currentLoc = down(currentLoc);
      setPos(currentLoc);
      break;
    case LEFT:
      currentLoc = left(currentLoc);
      setPos(currentLoc);
      break;
    case RIGHT:
      currentLoc = right(currentLoc);
      setPos(currentLoc);
      break;
    case SPACE:
      addHouse(currentLoc);
      break;
  }
});

function panToMarker() {
  panTo(currentMarker)
}

function setPos(loc) {
  serverSetPos(loc);
  currentMarker.setPosition(loc);
}

function serverSetPos(loc) {
  socket.emit('setPosition', {
    person: 'me',
    loc: loc 
  });
}

function panTo(marker) {
  map.panTo(marker.getPosition());
}

function addPerson(latlong) {
  addMarkerToServer(latlong, 'person');
  return addMarker(latlong, personIcon);
}

function addHouse(latlong) {
  addMarkerToServer(latlong, 'house');
  return addMarker(latlong, houseIcon);
}

function addMarker(latlong, icon) {
  return new google.maps.Marker({
    position: latlong,
    map: map,
    title: 'Hello World!',
    icon: icon
  });
}

function addMarkerToServer(latlong, type) {
  socket.emit('addMarker', {
    type: type,
    latlong: latlong
  })
}

var isConnected = false;
var isMapLoaded = false;

function onConnected() {
  isConnected = true;
  if (isMapLoaded) {
    onReady();
  }
}

function onMapLoaded() {
  isMapLoaded = true;
  if (isConnected) {
    onReady();
  }
}

function onReady() {
  currentMarker = addPerson(currentLoc);
}

var otherPerson;

function connectToServer() {
   var domain = 'localhost';
   var port = '5000';
   socket = io.connect('http://' + domain + ':' + port);
   socket.on('connect', function() {
     onConnected();
   });
   socket.on('markerReceived', function(evt) {
     if (evt.type == 'person') {
       otherPerson = addMarker(evt.latlong, personIcon);
     } else if (evt.type == 'house') {
       addMarker(evt.latlong, houseIcon);
     }
   });
   socket.on('positionSetReceived', function(evt) {
     otherPerson.setPosition(evt.loc)
   });
}

connectToServer();
