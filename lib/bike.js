import Wall from './wall.js';

class Bike {
  constructor() {
    this.x = 100;
    this.y = 75;
    this.prevX = 100;
    this.prevY = 75;
    this.color = "blue";
    this.direction = "E";
    this.velocity = [Bike.SPEED, 0];
    this.img = new Image();
    this.img.src = "assets/spritesheet_vehicles.png";
    this.wall = new Wall(this);
    this.wall.addVertex(this.centerCoords());
    this.wallCollision = this.wallCollision.bind(this);
  }

  move(direction) {
    if (direction === this.direction) { return; }
    switch(direction) {
      case "N":
        if (this.direction === "S") { return; }
        this.velocity = [0, -Bike.SPEED];
        break;
      case "W":
        if (this.direction === "E") { return; }
        this.velocity = [-Bike.SPEED, 0];
        break;
      case "S":
        if (this.direction === "N") { return; }
        this.velocity = [0, Bike.SPEED];
        break;
      case "E":
        if (this.direction === "W") { return; }
        this.velocity = [Bike.SPEED, 0];
        break;
    }
    this.direction = direction;
    this.wall.addVertex(this.centerCoords());
  }

  updatePos() {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x += this.velocity[0];
    this.y += this.velocity[1];
  }

  boundaryCollision() {
    if (this.x < 20 || this.x > 960 || this.y < 0 || this.y > 700) {
      return true;
    }
    return false;
  }

  wallCollision(wall) {
    const vertices = wall.vertices;
    for (let i = 1; i < vertices.length; i++) {
      if (this.betweenVertices(vertices[i - 1], vertices[i])) {
        return true;
      }
    }
    return false;
  }

  betweenVertices(v1, v2) {
    let frontPosition = this.centerCoords();
    switch(this.direction) {
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
      // console.log("comparing front pos to vertical line: ", frontPosition, v1);
      if (frontPosition[1] > v1[1] - 2 && frontPosition[1] < v1[1] + 2) {
        // front of bike is within line
        // console.log("vertical line collision");
        return true;
      }
    } else if (v1[1] === v2[1]) {
      // horizontal line
      if (frontPosition[0] > v1[0] - 2 && frontPosition[0] < v1[0] + 2) {
        // front of bike is within line
        return true;
      }
    } else {
      console.error("Verticies are not adjacent!");
    }
    return false;
  }

  render(ctx) {
    this.wall.render(ctx);
    this.updatePos();
    let centerCoords = this.centerCoords();
    ctx.save();
    ctx.translate(centerCoords[0], centerCoords[1]);
    ctx.rotate(this.rotationCoefficient() * Math.PI / 2);
    ctx.translate(-centerCoords[0], -centerCoords[1]);
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

  centerCoords() {
    return [this.x + Bike.WIDTH / 2, this.y + Bike.LENGTH / 2];
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
