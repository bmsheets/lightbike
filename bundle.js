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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wall = __webpack_require__(3);

var _wall2 = _interopRequireDefault(_wall);

var _hitbox = __webpack_require__(4);

var _hitbox2 = _interopRequireDefault(_hitbox);

var _geometry = __webpack_require__(5);

var _geometry2 = _interopRequireDefault(_geometry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bike = function () {
  function Bike(x, y, color, direction) {
    _classCallCheck(this, Bike);

    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.color = color;
    this.direction = direction;
    this.velocity = this.getVelocity();
    this.img = new Image();
    this.img.src = "assets/spritesheet_vehicles.png";
    this.wall = new _wall2.default(this);
    this.wall.addVertex(this.centerCoords());
    this.wallCollision = this.wallCollision.bind(this);
    this.hitBox = new _hitbox2.default(this);
  }

  _createClass(Bike, [{
    key: 'move',
    value: function move(direction) {
      if (direction === this.direction) {
        return;
      }
      switch (direction) {
        case "N":
          if (this.direction === "S") {
            return;
          }
          this.velocity = [0, -Bike.SPEED];
          break;
        case "W":
          if (this.direction === "E") {
            return;
          }
          this.velocity = [-Bike.SPEED, 0];
          break;
        case "S":
          if (this.direction === "N") {
            return;
          }
          this.velocity = [0, Bike.SPEED];
          break;
        case "E":
          if (this.direction === "W") {
            return;
          }
          this.velocity = [Bike.SPEED, 0];
          break;
      }
      this.direction = direction;
      this.wall.addVertex(this.centerCoords());
    }
  }, {
    key: 'getVelocity',
    value: function getVelocity() {
      // return [0, 0];
      switch (this.direction) {
        case "N":
          return [0, -Bike.SPEED];
        case "W":
          return [-Bike.SPEED, 0];
        case "S":
          return [0, Bike.SPEED];
        case "E":
          return [Bike.SPEED, 0];
      }
    }
  }, {
    key: 'updatePos',
    value: function updatePos() {
      this.prevX = this.x;
      this.prevY = this.y;
      this.x += this.velocity[0];
      this.y += this.velocity[1];
    }
  }, {
    key: 'boundaryCollision',
    value: function boundaryCollision() {
      if (this.x < 20 || this.x > 960 || this.y < 0 || this.y > 700) {
        return true;
      }
      return false;
    }
  }, {
    key: 'wallCollision',
    value: function wallCollision(wall) {
      var vertices = wall.vertices;
      for (var i = 1; i < vertices.length; i++) {
        if (this.betweenVertices(vertices[i - 1], vertices[i])) {
          return true;
        }
      }
      if (this.wall !== wall && this.betweenVertices(vertices[vertices.length - 1], wall.lastVertex)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'wallCollision2',
    value: function wallCollision2(wall) {
      // console.log("this value in wallCollision: ", this);
      var hitboxLines = this.hitBox.getLines();
      var wallLines = [];

      for (var i = 0; i < wall.vertices.length - 1; i++) {
        wallLines.push([wall.vertices[i], wall.vertices[i + 1]]);
      }

      return wallLines.some(function (line1) {
        return hitboxLines.some(function (line2) {
          return _geometry2.default.intersection(line1, line2);
        });
      });
    }
  }, {
    key: 'betweenVertices',
    value: function betweenVertices(v1, v2) {
      var frontPosition = this.centerCoords();
      switch (this.direction) {
        case "N":
          frontPosition[1] -= 25;
          break;
        case "W":
          frontPosition[0] -= 25;
          break;
        case "S":
          frontPosition[1] += 25;
          break;
        case "E":
          frontPosition[0] += 25;
          break;
      }

      if (v1[0] === v2[0]) {
        // vertical line
        var coplanar = frontPosition[0] > v1[0] - 2 && frontPosition[0] < v1[0] + 2;
        var aligned = frontPosition[1] > Math.min(v1[1], v2[1]) && frontPosition[1] < Math.max(v1[1], v2[1]);
        if (coplanar && aligned) {
          console.log("vertical line collision between front position:", frontPosition, " and vertices: ", v1, v2);
          return true;
        }
      } else if (v1[1] === v2[1]) {
        // horizontal line
        var _coplanar = frontPosition[1] > v1[1] - 2 && frontPosition[1] < v1[1] + 2;
        var _aligned = frontPosition[0] > Math.min(v1[0], v2[0]) && frontPosition[0] < Math.max(v1[0], v2[0]);
        if (_coplanar && _aligned) {
          console.log("horizontal line collision between front position:", frontPosition, " and vertices: ", v1, v2);
          return true;
        }
      } else {
        console.error("Verticies are not adjacent!");
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render(ctx) {
      this.wall.render(ctx);
      // this.hitBox.render(ctx);
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
    key: 'rotationCoefficient',
    value: function rotationCoefficient() {
      return Bike.DIRECTIONS.indexOf(this.direction);
    }
  }, {
    key: 'centerCoords',
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(2);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// document.addEventListener('DOMContentLoaded', () => {
//   const canvas = document.getElementById("game-canvas");
//   const ctx = canvas.getContext("2d");
//   const game = new Game(ctx);
//   game.run();
// });

var GAME_MODES = [{ num_players: 1, num_bots: 3 }, { num_players: 2, num_bots: 2 }];

var gameModeButtons = document.querySelectorAll("#game-modes button");
gameModeButtons.forEach(function (button, idx) {
  if (idx < 2) {
    button.addEventListener("click", startGame(GAME_MODES[idx]));
  } else {
    button.addEventListener("click", displayControls);
  }
});

var soundIcon = document.getElementById("sound-icon");
var gameAudio = document.getElementById("game-audio");
var audioPlaying = false;
soundIcon.addEventListener("click", function () {
  if (audioPlaying) {
    soundIcon.setAttribute("src", "assets/mute.png");
    gameAudio.pause();
    audioPlaying = false;
  } else {
    soundIcon.setAttribute("src", "assets/unmute.png");
    gameAudio.play();
    audioPlaying = true;
  }
});

function startGame(mode) {
  return function () {
    var menu = document.getElementById("game-menu");
    menu.style.display = "none";
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext("2d");
    var game = new _game2.default(ctx, mode);
    game.run();
  };
}

function displayControls() {
  var gameModes = document.getElementById("game-modes");
  gameModes.style.display = "none";
  var controls = document.getElementById("controls");
  controls.style.display = "flex";
  var back = document.getElementById("back-button");
  back.addEventListener("click", displayModes);
}

function displayModes() {
  var controls = document.getElementById("controls");
  controls.style.display = "none";
  var gameModes = document.getElementById("game-modes");
  gameModes.style.display = "flex";
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bike = __webpack_require__(0);

var _bike2 = _interopRequireDefault(_bike);

var _explosion = __webpack_require__(6);

var _explosion2 = _interopRequireDefault(_explosion);

var _bot = __webpack_require__(7);

var _bot2 = _interopRequireDefault(_bot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(ctx, mode) {
    _classCallCheck(this, Game);

    this.ctx = ctx;
    this.mode = mode;
    this.bikes = [new _bike2.default(200, 150, "blue", "E"), new _bike2.default(800, 150, "red", "S")];
    console.log(this.mode.num_players);
    if (this.mode.num_players + this.mode.num_bots > 2) {
      this.bikes.push(new _bike2.default(800, 600, "yellow", "W"));
      this.bikes.push(new _bike2.default(200, 600, "green", "N"));
    }
    this.walls = this.bikes.map(function (bike) {
      return bike.wall;
    });
    this.explosions = [];
    this.bots = [];
    switch (this.mode.num_bots) {
      case 1:
        this.bots.push(new _bot2.default(this.bikes[1], this.walls));
        break;
      case 2:
        this.bots.push(new _bot2.default(this.bikes[2], this.walls));
        this.bots.push(new _bot2.default(this.bikes[3], this.walls));
        break;
      case 3:
        this.bots.push(new _bot2.default(this.bikes[1], this.walls));
        this.bots.push(new _bot2.default(this.bikes[2], this.walls));
        this.bots.push(new _bot2.default(this.bikes[3], this.walls));
        break;
    }
    this.discoMode = false;
    this.pulseMode = true;
    this.frameCount = 0;
    this.style = Game.GRID_COLOR;
    console.log("created new game with mode: ", this.mode);
    console.log("created new game with bikes: ", this.bikes);
    console.log("created new game with bots: ", this.bots);
  }

  _createClass(Game, [{
    key: 'bindKeyHandlers',
    value: function bindKeyHandlers() {
      var player1 = this.bikes[0];
      Object.keys(Game.PLAYER1_KEYS).forEach(function (k) {
        key(k, function (e) {
          e.preventDefault();
          player1.move(Game.PLAYER1_KEYS[k]);
        });
      });

      if (this.mode.num_players === 2) {
        var player2 = this.bikes[1];
        Object.keys(Game.PLAYER2_KEYS).forEach(function (k) {
          key(k, function (e) {
            e.preventDefault();
            player2.move(Game.PLAYER2_KEYS[k]);
          });
        });
      }
    }
  }, {
    key: 'checkBoundaryCollisions',
    value: function checkBoundaryCollisions() {
      var _this = this;

      this.bikes.forEach(function (bike, idx) {
        if (bike.boundaryCollision()) {
          // console.log("boundary collision detected");
          _this.explosions.push(new _explosion2.default(bike.centerCoords()));
          _this.bikes.splice(idx, 1);
          _this.updateWalls();
        }
      });
    }
  }, {
    key: 'checkWallCollisions',
    value: function checkWallCollisions() {
      var _this2 = this;

      this.bikes.forEach(function (bike, idx) {
        _this2.walls.forEach(function (wall) {
          if (bike.wallCollision(wall)) {
            // console.log("wall collision detected");
            _this2.explosions.push(new _explosion2.default(bike.centerCoords()));
            _this2.bikes.splice(idx, 1);
            _this2.updateWalls();
          }
        });
      });
    }
  }, {
    key: 'updateWalls',
    value: function updateWalls() {
      var _this3 = this;

      this.walls = this.bikes.map(function (bike) {
        return bike.wall;
      });
      this.bots.forEach(function (bot) {
        bot.walls = _this3.walls;
      });
    }
  }, {
    key: 'checkCollisions',
    value: function checkCollisions() {
      this.checkBoundaryCollisions();
      this.checkWallCollisions();
    }
  }, {
    key: 'moveBots',
    value: function moveBots() {
      this.bots.forEach(function (bot) {
        bot.avoidObstacles();
      });
    }
  }, {
    key: 'run',
    value: function run() {
      this.bindKeyHandlers();
      this.render();
    }
  }, {
    key: 'gameOver',
    value: function gameOver() {
      if (this.bikes.length === 0) {
        return true;
      }return false;
    }
  }, {
    key: 'allObjects',
    value: function allObjects() {
      // bikes render their own walls
      return this.bikes.concat(this.explosions);
    }
  }, {
    key: 'renderAllObjects',
    value: function renderAllObjects() {
      var _this4 = this;

      this.allObjects().forEach(function (object) {
        return object.render(_this4.ctx);
      });
    }
  }, {
    key: 'resetCanvas',
    value: function resetCanvas() {
      var opacity = void 0;
      var discoLimit = 100 * Math.random();
      this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
      this.ctx.fillStyle = Game.BACKGROUND_COLOR;
      this.ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);

      this.ctx.lineWidth = 0.5;
      this.ctx.beginPath();
      for (var i = 0; i < Game.WIDTH; i += 40) {
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i, Game.HEIGHT);
      }
      for (var j = 0; j < Game.HEIGHT; j += 40) {
        this.ctx.moveTo(0, j);
        this.ctx.lineTo(Game.WIDTH, j);
      }
      if (this.discoMode && this.frameCount > discoLimit) {
        this.style = this.discoColor();
        this.frameCount = 0;
      } else if (this.pulseMode) {
        opacity = 0.7 + 0.3 * Math.sin(this.frameCount / 20.0);
        this.style = 'rgba(148, 0, 211, ' + opacity + ')';
      }
      this.frameCount++;
      this.ctx.strokeStyle = this.style;
      this.ctx.stroke();
    }
  }, {
    key: 'discoColor',
    value: function discoColor() {
      return Game.DISCO_COLORS[Math.floor(Math.random() * Game.DISCO_COLORS.length)];
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.gameOver()) {
        this.showRestart();
        return;
      }
      this.resetCanvas();
      this.moveBots();
      this.checkCollisions();
      this.renderAllObjects();
      requestAnimationFrame(this.render.bind(this));
    }
  }, {
    key: 'showRestart',
    value: function showRestart() {
      var gameOver = document.getElementById("game-over");
      var restart = document.getElementById("restart-button");
      restart.addEventListener("click", function () {
        document.getElementById("game-over").style.display = "none";
        document.getElementById("game-menu").style.display = "flex";
      });
      gameOver.style.display = "flex";
    }
  }]);

  return Game;
}();

Game.PLAYER1_KEYS = {
  w: "N",
  a: "W",
  s: "S",
  d: "E"
};

Game.PLAYER2_KEYS = {
  up: "N",
  left: "W",
  down: "S",
  right: "E"
};

Game.WIDTH = 1000;
Game.HEIGHT = 750;
Game.BACKGROUND_COLOR = "#333333";
// Game.GRID_COLOR = "darkviolet";
Game.GRID_COLOR = "rgba(148, 0, 211, 1)";
Game.DISCO_COLORS = ["blue", "cyan", "fuchsia", "lime", "yellow", "crimson"];

exports.default = Game;

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
    this.lastVertex = bike.centerCoords();
  }

  _createClass(Wall, [{
    key: "render",
    value: function render(ctx) {
      ctx.lineWidth = Wall.WIDTH;
      ctx.beginPath();
      this.vertices.forEach(function (vertex, idx) {
        if (idx === 0) {
          ctx.moveTo(vertex[0], vertex[1]);
        } else {
          ctx.lineTo(vertex[0], vertex[1]);
        }
      });
      this.lastVertex = this.bike.centerCoords();
      ctx.lineTo(this.lastVertex[0], this.lastVertex[1]);
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

Wall.WIDTH = 5;

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

var HitBox = function () {
  function HitBox(bike) {
    _classCallCheck(this, HitBox);

    this.bike = bike;
    this.vertices = [];
  }

  _createClass(HitBox, [{
    key: "generateVertices",
    value: function generateVertices() {
      this.vertices = [];
      var bikePos = this.bike.centerCoords();
      switch (this.bike.direction) {
        case "N":
        case "S":
          this.vertices.push([bikePos[0] - HitBox.WIDTH, bikePos[1] - HitBox.LENGTH]);
          this.vertices.push([bikePos[0] + HitBox.WIDTH, bikePos[1] - HitBox.LENGTH]);
          this.vertices.push([bikePos[0] + HitBox.WIDTH, bikePos[1] + HitBox.LENGTH]);
          this.vertices.push([bikePos[0] - HitBox.WIDTH, bikePos[1] + HitBox.LENGTH]);
          break;
        case "E":
        case "W":
          this.vertices.push([bikePos[0] - HitBox.LENGTH, bikePos[1] - HitBox.WIDTH]);
          this.vertices.push([bikePos[0] + HitBox.LENGTH, bikePos[1] - HitBox.WIDTH]);
          this.vertices.push([bikePos[0] + HitBox.LENGTH, bikePos[1] + HitBox.WIDTH]);
          this.vertices.push([bikePos[0] - HitBox.LENGTH, bikePos[1] + HitBox.WIDTH]);
          break;
      }
    }
  }, {
    key: "render",
    value: function render(ctx) {
      this.generateVertices();
      ctx.lineWidth = 2;
      ctx.beginPath();
      this.vertices.forEach(function (vertex, idx) {
        if (idx === 0) {
          ctx.moveTo(vertex[0], vertex[1]);
        } else {
          ctx.lineTo(vertex[0], vertex[1]);
        }
      });
      var firstVertex = this.vertices[0];
      ctx.lineTo(firstVertex[0], firstVertex[1]);
      ctx.strokeStyle = "red";
      ctx.stroke();
    }
  }, {
    key: "addVertex",
    value: function addVertex(coords) {
      this.vertices.push(coords);
    }
  }, {
    key: "getLines",
    value: function getLines() {
      if (this.vertices.length < 4) this.generateVertices();
      return [[this.vertices[0], this.vertices[1]], [this.vertices[1], this.vertices[2]], [this.vertices[2], this.vertices[3]], [this.vertices[3], this.vertices[0]]];
    }
  }]);

  return HitBox;
}();

HitBox.WIDTH = 11;
HitBox.LENGTH = 25;

exports.default = HitBox;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Geometry = function () {
  function Geometry() {
    _classCallCheck(this, Geometry);
  }

  _createClass(Geometry, [{
    key: "intersection",
    value: function intersection(a, b) {
      var _a = _slicedToArray(a, 2),
          a1 = _a[0],
          a2 = _a[1];

      var _b = _slicedToArray(b, 2),
          b1 = _b[0],
          b2 = _b[1];

      var cond1 = b1[0] >= Math.min(a1[0], a2[0]) && b1[0] <= Math.max(a1[0], a2[0]);
      var cond2 = a1[1] >= Math.min(b1[1], b2[1]) && a1[1] <= Math.max(b1[1], b2[1]);
      var cond3 = a1[0] >= Math.min(b1[0], b2[0]) && a1[0] <= Math.max(b1[0], b2[0]);
      var cond4 = b1[1] >= Math.min(a1[1], a2[1]) && b1[1] <= Math.max(a1[1], a2[1]);
      return cond1 && cond2 || cond3 && cond4;
    }
  }, {
    key: "test",
    value: function test() {
      var a = void 0,
          b = void 0;
      var AVALS = [[[0, 1], [4, 1]], [[0, 1], [4, 1]], [[0, 1], [4, 1]], [[0, 3], [4, 3]], [[0, -1], [4, -1]], [[2, 2], [2, -2]], [[2, 2], [2, -2]], [[2, 2], [2, -2]], [[2, 2], [2, -2]], [[2, 2], [2, -2]]];

      var BVALS = [[[1, 0], [1, 2]], [[-1, 0], [-1, 2]], [[4, 0], [4, 2]], [[1, 0], [1, 2]], [[1, 0], [1, 2]], [[0, -1], [3, -1]], [[0, 3], [3, 3]], [[0, -3], [3, -3]], [[0, 0], [3, 0]], [[0, 1], [3, 1]]];

      var RESULTS = [true, false, false, false, false, true, false, false, true, true];

      for (var i = 0; i < RESULTS.length; i++) {
        a = AVALS[i];
        b = BVALS[i];
        console.log("testing case " + (i + 1) + "...");
        console.assert(this.intersection(a, b) === RESULTS[i], "Failed test case " + (i + 1));
      }

      console.log("All tests passed.");
    }
  }]);

  return Geometry;
}();

module.exports = Geometry;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Explosion = function () {
  function Explosion(coords) {
    _classCallCheck(this, Explosion);

    this.x = coords[0];
    this.y = coords[1];
    this.frame = 1;
    this.ticks = 0;
    this.ticksPerFrame = 6;
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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bike = __webpack_require__(0);

var _bike2 = _interopRequireDefault(_bike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bot = function () {
  function Bot(bike, walls) {
    _classCallCheck(this, Bot);

    this.bike = bike;
    this.walls = walls;
  }

  _createClass(Bot, [{
    key: "avoidObstacles",
    value: function avoidObstacles() {
      // console.log("Checking bot obstacles...");
      if (this.nearBoundary() || this.nearWall()) {
        // console.log("Obstacle detected");
        var move = this.chooseMove();
        // console.log("bot performing move: ", move);
        this.bike.move(move);
      } else {
        if (Math.random() < 0.05) {
          this.bike.move(this.randomMove());
        }
      }
    }
  }, {
    key: "nearBoundary",
    value: function nearBoundary() {
      var pos = this.nextPosition();
      var testBike = new _bike2.default(pos[0], pos[1], this.bike.color, this.bike.direciton);
      var result = testBike.boundaryCollision();
      if (result) {
        // console.log("Detected upcoming boundary collision");
      }
      return result;
    }
  }, {
    key: "nearWall",
    value: function nearWall() {
      return false;
      // console.log("checking near wall");
      // const pos = this.nextPosition();
      // const testBike = new Bike(pos[0], pos[1], this.bike.color, this.bike.direciton);
      // const result = this.walls.some((wall) => {
      //   return testBike.wallCollision(wall);
      // });
      // // console.log("result: ", result);
      // if (result) {
      //   console.log("*****Detected upcoming wall collision");
      // }
      // return result;
    }
  }, {
    key: "nextPosition",
    value: function nextPosition() {
      var nextCoords = [this.bike.x, this.bike.y];
      switch (this.bike.direction) {
        case "N":
          nextCoords[1] = nextCoords[1] - 10;
          break;
        case "E":
          nextCoords[0] += 10;
          break;
        case "S":
          nextCoords[1] += 10;
          break;
        case "W":
          nextCoords[0] = nextCoords[0] - 10;
          break;
      }
      return nextCoords;
    }
  }, {
    key: "chooseMove",
    value: function chooseMove() {
      var moves = void 0;
      switch (this.bike.direction) {
        case "N":
          moves = ["E", "W"];
          break;
        case "E":
          moves = ["N", "S"];
          break;
        case "S":
          moves = ["E", "W"];
          break;
        case "W":
          moves = ["N", "S"];
          break;
      }
      return moves[Math.floor(2 * Math.random())];
    }
  }, {
    key: "randomMove",
    value: function randomMove() {
      var moves = ["N", "E", "S", "W"];
      return moves[Math.floor(4 * Math.random())];
    }
  }]);

  return Bot;
}();

exports.default = Bot;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map