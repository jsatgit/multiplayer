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
  this.socket = new WebSocket('ws://localhost:8000');
  this.fileReader = new FileReader();
  var self = this;
  this.fileReader.onload = function(evt) {
    var text = evt.target.result;
    self.callback(parseInt(text));
  };
  this.socket.onmessage = function(evt) {
    self.fileReader.readAsText(evt.data);
  }
};

Server.prototype.update = function() {
  this.socket.send('update');
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
