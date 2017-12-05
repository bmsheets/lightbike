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
      key(k, () => {
        bike.move(Game.MOVES[k]);
      });
    });
  }

  run() {
    this.bindKeyHandlers();
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, Game.width, Game.height);
    this.bikes.forEach((bike) => bike.render(this.ctx));
    requestAnimationFrame(this.render.bind(this));
  }
}

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

Game.width = 800;
Game.height = 600;

export default Game;
