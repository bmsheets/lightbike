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

var _explosion = __webpack_require__(4);

var _explosion2 = _interopRequireDefault(_explosion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.bikes = [new _bike2.default()];
    this.explosions = [new _explosion2.default()];
    this.players = [];
  }

  _createClass(Game, [{
    key: 'bindKeyHandlers',
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
    key: 'run',
    value: function run() {
      this.bindKeyHandlers();
      this.render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.ctx.fillStyle = Game.BACKGROUND_COLOR;
      this.ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.bikes.forEach(function (bike) {
        return bike.render(_this.ctx);
      });
      this.explosions.forEach(function (explosion) {
        return explosion.render(_this.ctx);
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

var _wall = __webpack_require__(3);

var _wall2 = _interopRequireDefault(_wall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bike = function () {
  function Bike() {
    _classCallCheck(this, Bike);

    this.x = 100;
    this.y = 75;
    this.prevX = 100;
    this.prevY = 75;
    this.color = "yellow";
    this.direction = "E";
    this.velocity = [Bike.SPEED, 0];
    this.img = new Image();
    this.img.src = "assets/spritesheet_vehicles.png";
    this.wall = new _wall2.default(this);
    this.wall.addVertex(this.centerCoords());
  }

  _createClass(Bike, [{
    key: "move",
    value: function move(direction) {
      if (direction === this.direction) {
        return;
      }
      this.direction = direction;
      this.wall.addVertex(this.centerCoords());
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
      this.prevX = this.x;
      this.prevY = this.y;
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
      this.wall.render(ctx);
      this.updatePos();
      var centerCoords = this.centerCoords();
      ctx.save();
      ctx.translate(centerCoords[0], centerCoords[1]);
      ctx.rotate(this.rotationCoefficient() * Math.PI / 2);
      ctx.translate(-centerCoords[0], -centerCoords[1]);
      ctx.drawImage(this.img, Bike.SPRITE_COORDS[this.color].x, Bike.SPRITE_COORDS[this.color].y, Bike.SPRITE_WIDTH, Bike.SPRITE_LENGTH, this.x, this.y, Bike.WIDTH, Bike.LENGTH);
      ctx.restore();
    }
  }, {
    key: "rotationCoefficient",
    value: function rotationCoefficient() {
      return Bike.DIRECTIONS.indexOf(this.direction);
    }
  }, {
    key: "centerCoords",
    value: function centerCoords() {
      return [this.x + Bike.WIDTH / 2, this.y + Bike.LENGTH / 2];
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wall = function () {
  function Wall(bike) {
    _classCallCheck(this, Wall);

    this.bike = bike;
    this.color = bike.color;
    this.vertices = [];
  }

  _createClass(Wall, [{
    key: "render",
    value: function render(ctx) {
      ctx.lineWidth = 5;
      ctx.beginPath();
      this.vertices.forEach(function (vertex, idx) {
        if (idx === 0) {
          ctx.moveTo(vertex[0], vertex[1]);
        } else {
          ctx.lineTo(vertex[0], vertex[1]);
        }
      });
      var lastVertex = this.bike.centerCoords();
      ctx.lineTo(lastVertex[0], lastVertex[1]);
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }, {
    key: "addVertex",
    value: function addVertex(coords) {
      this.vertices.push(coords);
    }
  }]);

  return Wall;
}();

exports.default = Wall;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Explosion = function () {
  function Explosion() {
    _classCallCheck(this, Explosion);

    this.x = 500;
    this.y = 375;
    this.frame = 1;
    this.ticks = 0;
    this.ticksPerFrame = 8;
    this.img = new Image();
    this.img.src = "assets/tanks_spritesheetDefault.png";
  }

  _createClass(Explosion, [{
    key: "render",
    value: function render(ctx) {
      if (this.frame > 12) {
        return;
      }
      var sprite = Explosion.SPRITE[this.frame];
      ctx.drawImage(this.img, sprite.x, sprite.y, sprite.width, sprite.height, this.x - sprite.width / 2, this.y - sprite.height / 2, sprite.width, sprite.height);
      this.ticks += 1;
      if (this.ticks > this.ticksPerFrame) {
        this.ticks = 0;
        this.frame += 1;
      }
    }
  }]);

  return Explosion;
}();

Explosion.SPRITE = {
  1: { x: 424, y: 122, width: 64, height: 64 },
  2: { x: 498, y: 447, width: 41, height: 41 },
  3: { x: 425, y: 188, width: 60, height: 60 },
  4: { x: 422, y: 379, width: 74, height: 74 },
  5: { x: 550, y: 284, width: 14, height: 14 },
  6: { x: 542, y: 84, width: 33, height: 33 },
  7: { x: 539, y: 41, width: 41, height: 41 },
  8: { x: 425, y: 250, width: 59, height: 60 },
  9: { x: 425, y: 0, width: 59, height: 60 },
  10: { x: 543, y: 268, width: 14, height: 14 },
  11: { x: 541, y: 475, width: 33, height: 33 },
  12: { x: 539, y: 207, width: 41, height: 41 }
};

exports.default = Explosion;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map