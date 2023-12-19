arrayName = [];
class cube {
	constructor(id, origin) {
		this.id = id;
		this.origin = origin;
	}
}
function makeCubes(amount, country) {
	for (let i = 0; i <= amount; i++) {
		let cubes = new cube(i, country);

		arrayName.push(cubes);
	}
	return arrayName;
};

makeCubes(255, "no");
makeCubes(255, "ca");
console.log(arrayName);
console.log(arrayName.length)