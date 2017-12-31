import Bike from './bike';
import Explosion from './explosion';
import Bot from './bot';

class Game {
  constructor(ctx, mode) {
    this.ctx = ctx;
    this.mode = mode;
    this.bikes = [
      new Bike(200, 150, "blue", "E"),
      new Bike(800, 150, "red", "S"),
    ];
    console.log(this.mode.num_players);
    if (this.mode.num_players + this.mode.num_bots > 2)  {
      this.bikes.push(new Bike(800, 600, "yellow", "W"));
      this.bikes.push(new Bike(200, 600, "green", "N"));
    }
    this.walls = this.bikes.map(bike => bike.wall);
    this.explosions = [];
    this.bots = [];
    switch(this.mode.num_bots) {
      case 1:
        this.bots.push(new Bot(this.bikes[1], this.walls));
        break;
      case 2:
        this.bots.push(new Bot(this.bikes[2], this.walls));
        this.bots.push(new Bot(this.bikes[3], this.walls));
        break;
      case 3:
        this.bots.push(new Bot(this.bikes[1], this.walls));
        this.bots.push(new Bot(this.bikes[2], this.walls));
        this.bots.push(new Bot(this.bikes[3], this.walls));
        break;
    }
    this.discoMode = false;
    this.frameCount = 0;
    this.style = Game.GRID_COLOR;
    console.log("created new game with mode: ", this.mode);
    console.log("created new game with bikes: ", this.bikes);
    console.log("created new game with bots: ", this.bots);
  }

  bindKeyHandlers() {
    const player1 = this.bikes[0];
    Object.keys(Game.PLAYER1_KEYS).forEach(k => {
      key(k, (e) => {
        e.preventDefault();
        player1.move(Game.PLAYER1_KEYS[k]);
      });
    });

    if (this.mode.num_players === 2) {
      const player2 = this.bikes[1];
      Object.keys(Game.PLAYER2_KEYS).forEach(k => {
        key(k, (e) => {
          e.preventDefault();
          player2.move(Game.PLAYER2_KEYS[k]);
        });
      });
    }
  }

  checkBoundaryCollisions() {
    this.bikes.forEach((bike, idx) => {
      if (bike.boundaryCollision()) {
        // console.log("boundary collision detected");
        this.explosions.push(new Explosion(bike.centerCoords()));
        this.bikes.splice(idx, 1);
        this.updateWalls();
      }
    });
  }

  checkWallCollisions() {
    this.bikes.forEach((bike, idx) => {
      this.walls.forEach(wall => {
        if (bike.wallCollision(wall)) {
          // console.log("wall collision detected");
          this.explosions.push(new Explosion(bike.centerCoords()));
          this.bikes.splice(idx, 1);
          this.updateWalls();
        }
      });
    });
  }

  updateWalls() {
    this.walls = this.bikes.map(bike => bike.wall);
    this.bots.forEach(bot => {
      bot.walls = this.walls;
    });
  }

  checkCollisions() {
    this.checkBoundaryCollisions();
    this.checkWallCollisions();
  }

  moveBots() {
    this.bots.forEach(bot => {
      bot.avoidObstacles();
    });
  }

  run() {
    this.bindKeyHandlers();
    this.render();
  }

  gameOver() {
    if (this.bikes.length === 0) {
      return true;
    } return false;
  }

  allObjects() {
    // bikes render their own walls
    return this.bikes.concat(this.explosions);
  }

  renderAllObjects() {
    this.allObjects().forEach((object) => object.render(this.ctx));
  }

  resetCanvas() {
    const discoLimit = 100 * Math.random();
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ctx.fillStyle = Game.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);

    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    for (let i = 0; i < Game.WIDTH; i += 40) {
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, Game.HEIGHT);
    }
    for (let j = 0; j < Game.HEIGHT; j += 40) {
      this.ctx.moveTo(0, j);
      this.ctx.lineTo(Game.WIDTH, j);
    }
    if (this.discoMode && this.frameCount > discoLimit) {
      this.style = this.discoColor();
      this.frameCount = 0;
    }
    this.frameCount++;
    this.ctx.strokeStyle = this.style;
    this.ctx.stroke();
  }

  discoColor() {
    return Game.DISCO_COLORS[Math.floor(Math.random() * Game.DISCO_COLORS.length)];
  }

  render() {
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

  showRestart() {
    const gameOver = document.getElementById("game-over");
    const restart = document.getElementById("restart-button");
    restart.addEventListener("click", () => {
      document.getElementById("game-over").style.display = "none";
      document.getElementById("game-menu").style.display = "flex";
    });
    gameOver.style.display = "flex";
  }
}

Game.PLAYER1_KEYS = {
  up: "N",
  left: "W",
  down: "S",
  right: "E"
};

Game.PLAYER2_KEYS = {
  w: "N",
  a: "W",
  s: "S",
  d: "E",
};

Game.WIDTH = 1000;
Game.HEIGHT = 750;
Game.BACKGROUND_COLOR = "#333333";
Game.GRID_COLOR = "darkviolet";
Game.DISCO_COLORS = [
  "blue",
  "cyan",
  "fuchsia",
  "lime",
  "yellow",
  "crimson"
];

export default Game;
