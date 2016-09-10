var CounterModel = function() {
  this.count = 0;
  this.callback;
}

CounterModel.prototype.update = function() {
  this.count++;
  this.notifyChange();
};

CounterModel.prototype.notifyChange = function() {
  this.callback(this.count);
};

CounterModel.prototype.onChange = function(callback) {
  this.callback = callback;
};

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

clickerView = new ClickerView();
counterModel = new CounterModel();
counterView = new CounterView();

clickerView.onClick(function() {
  counterModel.update();
});

counterModel.onChange(function(count) {
  counterView.show(count);
});
