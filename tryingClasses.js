class cube {
  constructor(id, origin, event) {
    this.id = id;
    this.origin = origin;
    this.event = event;
  }
}

const cubes = new cube(1, "no", true);

console.log(cubes);

let no = [];

for (let i = 0; i <= 500; i++) {
  let NoCubes = new cube(i, "no", true);

  no.push(NoCubes);
}

console.log(no);

console.log(no[50]);

function makeCubes(array, amount) {
  let array = [];

  for (let i = 0; i <= amount; i++) {
    let NoCubes = new cube(i, "no", true);

    no.push(NoCubes);
  }
  return array;
}
