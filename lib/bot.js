import Bike from './bike';

class Bot {
  constructor(bike) {
    this.bike = bike;
  }

  avoidObstacles() {
    // console.log("Checking bot obstacles...");
    if (this.nearBoundary() || this.nearWall()) {
      console.log("Obstacle detected");
      const move = this.chooseMove();
      console.log("bot performing move: ", move);
      this.bike.move(move);
    } else {
      if (Math.random() < 0.05) {
        this.bike.move(this.randomMove());
      }
    }
  }

  nearBoundary() {
    const pos = this.nextPosition();
    const testBike = new Bike(pos[0], pos[1], this.bike.color, this.bike.direciton);
    const result = testBike.boundaryCollision();
    if (result) {
      console.log("Detected upcoming boundary collision");
    }
    return result;
  }

  nearWall() {
    return false;
    // console.log("checking near wall");
    // const pos = this.nextPosition();
    // const testBike = new Bike(pos[0], pos[1], this.bike.color, this.bike.direciton);
    // return testBike.wallCollision(this.bike.wall);
  }

  nextPosition() {
    let nextCoords = [this.bike.x, this.bike.y];
    switch(this.bike.direction) {
      case "N":
        nextCoords[1] = nextCoords[1] - 10;
        break;
      case "E":
        nextCoords[0] += 10;
        break;
      case "S":
        nextCoords[1] += 10;
        break;
      case "W":
        nextCoords[0] = nextCoords[0] - 10;
        break;
    }
    return nextCoords;
  }

  chooseMove() {
    let moves;
    switch(this.bike.direction) {
      case "N":
        moves = ["E", "W"];
        break;
      case "E":
        moves = ["N", "S"];
        break;
      case "S":
        moves = ["E", "W"];
        break;
      case "W":
        moves = ["N", "S"];
        break;
    }
    return moves[Math.floor(2 * Math.random())];
  }

  randomMove() {
    const moves = ["N", "E", "S", "W"];
    return moves[Math.floor(4 * Math.random())];
  }

}

export default Bot;
