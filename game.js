var ClickerView = function() {
  this.clicker = document.getElementById('clicker');
};

ClickerView.prototype.onClick = function(callback) {
  this.clicker.onclick = callback;
};

var CounterView = function() {
  this.counter = document.getElementById('count');
};

CounterView.prototype.show = function(count) {
  this.counter.innerHTML = count;
};

var Server = function() {
  var domain = 'localhost';
  var port = '5000';
  this.socket = io.connect('http://' + domain + ':' + port);
  this.socket.on('connect', function() {
    console.log('Connected to server');
  });
  var self = this;
  this.socket.on('count', function(count) {
    self.callback(count);
  });
}

Server.prototype.update = function() {
  this.socket.emit('update');
};

Server.prototype.onUpdate = function(callback) {
  this.callback = callback
};


var clickerView = new ClickerView();
var counterView = new CounterView();
var server = new Server();

server.onUpdate(function(count) {
  counterView.show(count);
});

clickerView.onClick(function() {
  server.update();
});
