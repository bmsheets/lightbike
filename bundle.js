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
        key(k, function (e) {
          e.preventDefault();
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
      this.ctx.fillStyle = Game.BACKGROUND_COLOR;
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
  w: "N",
  a: "W",
  s: "S",
  d: "E",
  up: "N",
  left: "W",
  down: "S",
  right: "E"
};

Game.WIDTH = 1000;
Game.HEIGHT = 750;
Game.BACKGROUND_COLOR = "#333333";

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

    this.x = 100;
    this.y = 75;
    this.color = "blue";
    this.direction = "E";
    this.velocity = [Bike.SPEED, 0];
    this.img = new Image();
    this.img.src = "spritesheet_vehicles.png";
  }

  _createClass(Bike, [{
    key: "move",
    value: function move(direction) {
      this.direction = direction;
      switch (direction) {
        case "N":
          this.velocity = [0, -Bike.SPEED];
          break;
        case "W":
          this.velocity = [-Bike.SPEED, 0];
          break;
        case "S":
          this.velocity = [0, Bike.SPEED];
          break;
        case "E":
          this.velocity = [Bike.SPEED, 0];
          break;
      }
    }
  }, {
    key: "updatePos",
    value: function updatePos() {
      this.x += this.velocity[0];
      this.y += this.velocity[1];
      // Temporary wrap around level
      if (this.x < -50) {
        this.x += 1000;
      } else {
        this.x %= 1000;
      }
      if (this.y < -50) {
        this.y += 750;
      } else {
        this.y %= 750;
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      this.updatePos();
      ctx.save();
      ctx.translate(this.x + Bike.WIDTH / 2, this.y + Bike.LENGTH / 2);
      ctx.rotate(this.rotationCoefficient() * Math.PI / 2);
      ctx.translate(-(this.x + Bike.WIDTH / 2), -(this.y + Bike.LENGTH / 2));
      ctx.drawImage(this.img, Bike.SPRITE_COORDS[this.color].x, Bike.SPRITE_COORDS[this.color].y, Bike.SPRITE_WIDTH, Bike.SPRITE_LENGTH, this.x, this.y, Bike.WIDTH, Bike.LENGTH);
      ctx.restore();
    }
  }, {
    key: "rotationCoefficient",
    value: function rotationCoefficient() {
      return Bike.DIRECTIONS.indexOf(this.direction);
    }
  }]);

  return Bike;
}();

// Constants and pixel values


Bike.SPEED = 5;
Bike.LENGTH = 50;
Bike.WIDTH = 22;
Bike.DIRECTIONS = ["N", "E", "S", "W"];
Bike.SPRITE_LENGTH = 100;
Bike.SPRITE_WIDTH = 44;
Bike.SPRITE_COORDS = {
  red: { x: 290, y: 399 },
  blue: { x: 506, y: 133 },
  green: { x: 480, y: 389 },
  yellow: { x: 219, y: 133 }
};

exports.default = Bike;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map