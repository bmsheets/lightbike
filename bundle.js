/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  var game = new _game2.default(ctx);
  game.run();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bike = __webpack_require__(2);

var _bike2 = _interopRequireDefault(_bike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.bikes = [new _bike2.default()];
    this.players = [];
  }

  _createClass(Game, [{
    key: "bindKeyHandlers",
    value: function bindKeyHandlers() {
      var bike = this.bikes[0];
      Object.keys(Game.MOVES).forEach(function (k) {
        key(k, function () {
          bike.move(Game.MOVES[k]);
        });
      });
    }
  }, {
    key: "run",
    value: function run() {
      this.bindKeyHandlers();
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.ctx.fillStyle = Game.BG_COLOR;
      this.ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.bikes.forEach(function (bike) {
        return bike.render(_this.ctx);
      });
      requestAnimationFrame(this.render.bind(this));
    }
  }]);

  return Game;
}();

Game.MOVES = {
  w: [0, -1],
  a: [-1, 0],
  s: [0, 1],
  d: [1, 0],
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1],
  right: [1, 0]
};

Game.WIDTH = 800;
Game.HEIGHT = 600;
Game.BG_COLOR = "#333333";

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bike = function () {
  function Bike() {
    _classCallCheck(this, Bike);

    this.x = 0;
    this.y = 0;
    this.velocity = [Bike.SPEED, 0];
    this.width = 40;
    this.height = 20;
    this.color = "#FF0000";
  }

  _createClass(Bike, [{
    key: "move",
    value: function move(vector) {
      this.width = vector[0] ? 40 : 20;
      this.height = vector[1] ? 40 : 20;
      this.velocity[0] = vector[0] * Bike.SPEED;
      this.velocity[1] = vector[1] * Bike.SPEED;
    }
  }, {
    key: "updatePos",
    value: function updatePos() {
      this.x += this.velocity[0];
      this.y += this.velocity[1];
    }
  }, {
    key: "render",
    value: function render(ctx) {
      this.updatePos();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }]);

  return Bike;
}();

Bike.SPEED = 5;

exports.default = Bike;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map