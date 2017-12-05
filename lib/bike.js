class Bike {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.velocity = [Bike.SPEED, 0];
    this.width = 40;
    this.height = 20;
    this.color = "#FF0000";
  }

  move(vector) {
    this.width = vector[0] ? 40 : 20;
    this.height = vector[1] ? 40 : 20;
    this.velocity[0] = vector[0] * Bike.SPEED;
    this.velocity[1] = vector[1] * Bike.SPEED;
  }

  updatePos() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }

  render(ctx) {
    this.updatePos();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

Bike.SPEED = 5;

export default Bike;
