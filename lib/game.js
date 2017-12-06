import Bike from './bike';
import Explosion from './explosion';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bikes = [new Bike()];
    this.walls = this.bikes.map(bike => bike.wall);
    this.explosions = [];
  }

  bindKeyHandlers() {
    const bike = this.bikes[0];
    Object.keys(Game.MOVES).forEach(k => {
      key(k, (e) => {
        e.preventDefault();
        bike.move(Game.MOVES[k]);
      });
    });
  }

  checkBoundaryCollisions() {
    this.bikes.forEach((bike, idx) => {
      if (bike.boundaryCollision()) {
        console.log("boundary collision detected");
        this.explosions.push(new Explosion(bike.centerCoords()));
        this.bikes.splice(idx, 1);
      }
    });
  }

  checkWallCollisions() {
    this.bikes.forEach((bike, idx) => {
      this.walls.forEach(wall => {
        if (bike.wallCollision(wall)) {
          console.log("wall collision detected");
          this.explosions.push(new Explosion(bike.centerCoords()));
          this.bikes.splice(idx, 1);
        }
      });
    });
  }

  checkCollisions() {
    this.checkBoundaryCollisions();
    this.checkWallCollisions();
  }

  run() {
    this.bindKeyHandlers();
    this.render();
  }

  allObjects() {
    // bikes render their own walls
    return this.bikes.concat(this.explosions);
  }

  renderAllObjects() {
    this.allObjects().forEach((object) => object.render(this.ctx));
  }

  resetCanvas() {
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
    this.ctx.strokeStyle = "darkviolet";
    this.ctx.stroke();
  }

  render() {
    this.resetCanvas();
    this.checkCollisions();
    this.renderAllObjects();
    requestAnimationFrame(this.render.bind(this));
  }
}

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

export default Game;
