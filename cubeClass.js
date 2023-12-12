export function makeCubes(arrayName, amount, country, event) {
  class cube {
    constructor(id, origin, event) {
      this.id = id;
      this.origin = origin;
      this.event = event;
    }
  }

  function makeCubes(arrayName, amount, country, event) {
    global[arrayName] = [];

    for (let i = 0; i <= amount; i++) {
      let cubes = new cube(i, country, event);

      global[arrayName].push(cubes);
    }
    return global[arrayName];
  }
}

// makeCubes("name", 255, "ca", false);