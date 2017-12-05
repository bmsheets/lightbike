class Explosion {
  constructor() {
    this.x = 500;
    this.y = 375;
    this.frame = 1;
    this.ticks = 0;
    this.ticksPerFrame = 8;
    this.img = new Image();
    this.img.src = "assets/tanks_spritesheetDefault.png";
  }

  render(ctx) {
    if (this.frame > 12) { return; }
    const sprite = Explosion.SPRITE[this.frame];
    ctx.drawImage(this.img,
      sprite.x,
      sprite.y,
      sprite.width,
      sprite.height,
      this.x - sprite.width/2,
      this.y - sprite.height/2,
      sprite.width,
      sprite.height);
      this.ticks += 1;
      if (this.ticks > this.ticksPerFrame) {
        this.ticks = 0;
        this.frame += 1;
      }
  }
}

Explosion.SPRITE = {
  1: {x: 424, y: 122, width: 64, height: 64},
  2: {x: 498, y: 447, width: 41, height: 41},
  3: {x: 425, y: 188, width: 60, height: 60},
  4: {x: 422, y: 379, width: 74, height: 74},
  5: {x: 550, y: 284, width: 14, height: 14},
  6: {x: 542, y: 84, width: 33, height: 33},
  7: {x: 539, y: 41, width: 41, height: 41},
  8: {x: 425, y: 250, width: 59, height: 60},
  9: {x: 425, y: 0, width: 59, height: 60},
  10: {x: 543, y: 268, width: 14, height: 14},
  11: {x: 541, y: 475, width: 33, height: 33},
  12: {x: 539, y: 207, width: 41, height: 41}
};

export default Explosion;
