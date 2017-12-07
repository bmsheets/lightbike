class Wall {
  constructor(bike) {
    this.bike = bike;
    this.color = bike.color;
    this.vertices = [];
    this.lastVertex = bike.centerCoords();
  }

  render(ctx) {
    ctx.lineWidth = Wall.WIDTH;
    ctx.beginPath();
    this.vertices.forEach((vertex, idx) => {
      if (idx === 0) {
        ctx.moveTo(vertex[0], vertex[1]);
      } else {
        ctx.lineTo(vertex[0], vertex[1]);
      }
    });
    this.lastVertex = this.bike.centerCoords();
    ctx.lineTo(this.lastVertex[0], this.lastVertex[1]);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  addVertex(coords) {
    this.vertices.push(coords);
  }
}

Wall.WIDTH = 5;

export default Wall;
