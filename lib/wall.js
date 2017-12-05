class Wall {
  constructor(bike) {
    this.bike = bike;
    this.color = bike.color;
    this.vertices = [];
  }

  render(ctx) {
    ctx.lineWidth = 5;
    ctx.beginPath();
    this.vertices.forEach((vertex, idx) => {
      if (idx === 0) {
        ctx.moveTo(vertex[0], vertex[1]);
      } else {
        ctx.lineTo(vertex[0], vertex[1]);
      }
    });
    let lastVertex = this.bike.centerCoords();
    ctx.lineTo(lastVertex[0], lastVertex[1]);
    ctx.strokeStyle = this.color;
    ctx.stroke();
  }

  addVertex(coords) {
    this.vertices.push(coords);
  }
}

export default Wall;
