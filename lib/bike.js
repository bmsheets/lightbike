class Bike {
  constructor() {
    this.x = 100;
    this.y = 75;
    this.color = "blue";
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
    ctx.drawImage(this.img,
      Bike.SPRITE_COORDS[this.color].x,
      Bike.SPRITE_COORDS[this.color].y,
      Bike.SPRITE_WIDTH,
      Bike.SPRITE_LENGTH,
      this.x,
      this.y,
      Bike.WIDTH,
      Bike.LENGTH);
    ctx.restore();
  }

  rotationCoefficient() {
    return Bike.DIRECTIONS.indexOf(this.direction);
  }
}

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

export default Bike;
