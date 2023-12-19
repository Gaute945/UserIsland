import * as THREE from "three";

let arrayName = [];
class cubeClass {
	constructor(id, origin) {
		this.id = id;
		this.origin = origin;
	}
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function makeCubes(amount, country) {
	for (let i = 0; i <= amount; i++) {
		let newCubes = new cubeClass(i, country);
		scene.add(cube);

		arrayName.push(newCubes);
		console.log(newCubes);
	}
	return arrayName;
}

makeCubes(5, "no");
makeCubes(10, "se");
console.log(arrayName);


camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);
}

animate();
