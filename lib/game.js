class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bikes = [];
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
  }

  run() {
    requestAnimationFrame(this.render.bind(this));
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
  }
}

export default Game;
