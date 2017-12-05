class Bike {
  constructor() {
    this.x = 100;
    this.y = 75;
    this.direction = "E";
    this.velocity = [Bike.SPEED, 0];
    this.img = new Image();
    this.img.src = "spritesheet_vehicles.png";
  }

  move(direction) {
    this.direction = direction;
    switch(direction) {
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

  updatePos() {
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

  render(ctx) {
    this.updatePos();
    ctx.save();
    ctx.translate(this.x + Bike.WIDTH / 2, this.y + Bike.LENGTH / 2);
    ctx.rotate(this.rotationCoefficient() * Math.PI / 2);
    ctx.translate(-(this.x + Bike.WIDTH / 2), -(this.y + Bike.LENGTH / 2));
    ctx.drawImage(this.img, 506, 133, 44, 100, this.x, this.y, Bike.WIDTH, Bike.LENGTH);
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
