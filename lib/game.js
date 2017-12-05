import Bike from './bike';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bikes = [new Bike()];
    this.players = [];
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

  run() {
    this.bindKeyHandlers();
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.ctx.fillStyle = Game.BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, Game.WIDTH, Game.HEIGHT);
    this.bikes.forEach((bike) => bike.render(this.ctx));
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
