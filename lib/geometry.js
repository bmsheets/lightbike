class Geometry {
  intersection(a, b) {
    let [a1, a2] = a;
    let [b1, b2] = b;
    const cond1 = b1[0] > Math.min(a1[0], a2[0]) && b1[0] < Math.max(a1[0], a2[0]);
    const cond2 = a1[1] > Math.min(b1[1], b2[1]) && a1[1] < Math.max(b1[1], b2[1]);
    const cond3 = a1[0] > Math.min(b1[0], b2[0]) && a1[0] < Math.max(b1[0], b2[0]);
    const cond4 = b1[1] > Math.min(a1[1], a2[1]) && b1[1] < Math.max(a1[1], a2[1]);
    return (cond1 && cond2) || (cond3 && cond4);
  }

  test() {
    let a, b;
    const AVALS = [
      [[0, 1], [4, 1]],
      [[0, 1], [4, 1]],
      [[0, 1], [4, 1]],
      [[0, 3], [4, 3]],
      [[0, -1], [4, -1]],
      [[2, 2], [2, -2]],
      [[2, 2], [2, -2]],
      [[2, 2], [2, -2]],
      [[2, 2], [2, -2]],
      [[2, 2], [2, -2]],
    ];

    const BVALS = [
      [[1, 0], [1, 2]],
      [[-1, 0], [-1, 2]],
      [[4, 0], [4, 2]],
      [[1, 0], [1, 2]],
      [[1, 0], [1, 2]],
      [[0, -1], [3, -1]],
      [[0, 3], [3, 3]],
      [[0, -3], [3, -3]],
      [[0, 0], [3, 0]],
      [[0, 1], [3, 1]],
    ];

    const RESULTS = [
      true, false, false, false, false, true, false, false, true, true
    ];

    for (let i = 0; i < RESULTS.length; i ++) {
      a = AVALS[i];
      b = BVALS[i];
      console.log(`testing case ${i + 1}...`);
      console.assert(this.intersection(a, b) === RESULTS[i], `Failed test case ${i + 1}`);
    }

    console.log("All tests passed.");
  }
}

module.exports = Geometry;
