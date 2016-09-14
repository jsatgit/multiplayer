/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/*

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
	*/

	class Polygon {
	  constructor(height, width) {
	    this.height = height;
	    this.width = width;
	  }

	  get area() {
	    return this.calcArea();
	  }

	  calcArea() {
	    return this.height * this.width;
	  }
	}

	const square = new Polygon(10, 10);

	console.log(square.area);


/***/ }
/******/ ]);