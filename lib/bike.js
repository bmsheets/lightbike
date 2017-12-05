class Bike {
  constructor() {
    this.x = 100;
    this.y = 100;
    this.velocity = [Bike.SPEED, 0];
    this.img = new Image();
    this.img.src = "spritesheet_vehicles.png";
    this.direction = "E";
  }

  move(vector) {
    this.velocity[0] = vector[0] * Bike.SPEED;
    this.velocity[1] = vector[1] * Bike.SPEED;
    if (vector[0]) {
      if (vector[0] > 0) {
        this.direction = "E";
      } else {
        this.direction = "W";
      }
    } else {
      if (vector[1] > 0) {
        this.direction = "S";
      } else {
        this.direction = "N";
      }
    }
  }

  updatePos() {
    this.x += this.velocity[0];
    this.y += this.velocity[1];
    if (this.x < 0) {
      this.x += 800;
    } else {
      this.x %= 800;
    }
    if (this.y < 0) {
      this.y += 600;
    } else {
      this.y %= 600;
    }
  }

  render(ctx) {
    this.updatePos();
    ctx.save();
    ctx.translate(this.x + Bike.WIDTH / 2, this.y + Bike.LENGTH / 2);
    ctx.rotate(this.rotationCoefficient() * Math.PI / 2);
    ctx.translate(-(this.x + Bike.WIDTH / 2), -(this.y + Bike.LENGTH / 2));
    ctx.drawImage(this.img, 480, 389, 44, 100, this.x, this.y, Bike.WIDTH, Bike.LENGTH);
    ctx.restore();
  }

  rotationCoefficient() {
    return Bike.DIRECTIONS.indexOf(this.direction);
  }
}

Bike.SPEED = 5;
Bike.LENGTH = 50;
Bike.WIDTH = 22;
Bike.DIRECTIONS = ["N", "E", "S", "W"];

export default Bike;
