class HitBox {
  constructor(bike) {
    this.bike = bike;
    this.vertices = [];
  }

  generateVertices() {
    this.vertices = [];
    const bikePos = this.bike.centerCoords();
    switch(this.bike.direction) {
      case "N":
      case "S":
        this.vertices.push([bikePos[0] - HitBox.WIDTH, bikePos[1] - HitBox.LENGTH]);
        this.vertices.push([bikePos[0] + HitBox.WIDTH, bikePos[1] - HitBox.LENGTH]);
        this.vertices.push([bikePos[0] + HitBox.WIDTH, bikePos[1] + HitBox.LENGTH]);
        this.vertices.push([bikePos[0] - HitBox.WIDTH, bikePos[1] + HitBox.LENGTH]);
        break;
      case "E":
      case "W":
        this.vertices.push([bikePos[0] - HitBox.LENGTH, bikePos[1] - HitBox.WIDTH]);
        this.vertices.push([bikePos[0] + HitBox.LENGTH, bikePos[1] - HitBox.WIDTH]);
        this.vertices.push([bikePos[0] + HitBox.LENGTH, bikePos[1] + HitBox.WIDTH]);
        this.vertices.push([bikePos[0] - HitBox.LENGTH, bikePos[1] + HitBox.WIDTH]);
        break;
    }
  }

  render(ctx) {
    this.generateVertices();
    ctx.lineWidth = 2;
    ctx.beginPath();
    this.vertices.forEach((vertex, idx) => {
      if (idx === 0) {
        ctx.moveTo(vertex[0], vertex[1]);
      } else {
        ctx.lineTo(vertex[0], vertex[1]);
      }
    });
    const firstVertex = this.vertices[0];
    ctx.lineTo(firstVertex[0], firstVertex[1]);
    ctx.strokeStyle = "red";
    ctx.stroke();
  }

  addVertex(coords) {
    this.vertices.push(coords);
  }

  getLines() {
    if (this.vertices.length < 4) this.generateVertices();
    return [
      [this.vertices[0], this.vertices[1]],
      [this.vertices[1], this.vertices[2]],
      [this.vertices[2], this.vertices[3]],
      [this.vertices[3], this.vertices[0]]
    ];
  }
}

HitBox.WIDTH = 11;
HitBox.LENGTH = 25;

export default HitBox;
