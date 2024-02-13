import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// user docs
import { animateScene } from "./animation";

const loader = new GLTFLoader();

const appMode = "";

const clock = new THREE.Clock();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

setTimeout(function () {
  location.reload();
}, 60000); // 60000 milliseconds = 1 minute

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const renderer = new THREE.WebGLRenderer({ antialiasing: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Create snowflake geometry and material
const snowflakeGeometry = new THREE.BufferGeometry();
const snowflakeMaterial = new THREE.PointsMaterial({
  size: 0.05,
  color: 0xffffff,
});

// Create an array to store snowflake positions
const snowflakeVertices = [];
const snowAmount = getRandomInt(1, 50000);

// Populate the array with random snowflake positions
for (let i = 0; i < snowAmount; i++) {
  const x = (Math.random() - 0.5) * 25;
  const y = (Math.random() - 0.5) * 25;
  const z = (Math.random() - 0.5) * 25;
  snowflakeVertices.push(x, y, z);
}

// Set the snowflake vertices to the geometry
snowflakeGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(snowflakeVertices, 3)
);

// Create the snowflake points
const snowflakes = new THREE.Points(snowflakeGeometry, snowflakeMaterial);

let textureLoad;

switch (appMode) {
  case "christmas":
    // Add snowflakes to the scene
    scene.add(snowflakes);

    // christmas map
    textureLoad = new THREE.TextureLoader().load(
      "Resource/a1ebabf8-049a-4983-9b33-5af273a03605.jpeg"
    );

    // controls.autoRotate = true;
    break;

  default:
    // normal map
    textureLoad = new THREE.TextureLoader().load(
      "Resource/map (1)-noCircle.png"
    );
    break;
}

// helpers
// camera helper (black cross with yellow cam line, also blocks axes helper)
// start of helpers
// const helper = new THREE.CameraHelper(camera);
// scene.add(helper);
// // The X axis is red. The Y axis is green. The Z axis is blue.
// const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

// // collision visualization for boxes
// const booksMap = new THREE.Mesh(
//   new THREE.BoxGeometry(7, 3.5, 0),
//   new THREE.MeshBasicMaterial({ color: 0xff2d00, wireframe: true })
// );
// booksMap.position.set(3.6, 4.3, 0);
// scene.add(booksMap);
//end of helpers

let [
  speedsSe,
  speedsNo,
  speedsDk,
  speedsFi,
  rotationsNo,
  rotationsSe,
  rotationsDk,
  rotationsFi,
  animateSe,
  animateNo,
  animateDk,
  animateFi,
  BoundingBArray,
] = [[], [], [], [], [], [], [], [], [], [], [], [], []];

let populationSe;
let populationNo;
let populationDk;
let populationFi;

async function fetchApi() {
  try {
    const data = await fetch("http://localhost:3000/api");
    let json = await data.json();
    populationSe = json[0].number;
    populationNo = json[1].number;
    populationDk = json[2].number;
    populationFi = json[3].number;

    const sef = new THREE.MeshBasicMaterial({ color: 0xecb920 });
    const nof = new THREE.MeshBasicMaterial({ color: 0x009999 });
    const dkf = new THREE.MeshBasicMaterial({ color: 0xf44336 });
    const fif = new THREE.MeshBasicMaterial({ color: 0xd5d5d5 });

    const box = new THREE.BoxGeometry(0.3, 0.3, 0.3);

    createMeshes(
      populationSe,
      sef,
      box,
      [3.6, 3.6, 4.5, 4.5],
      scene,
      animateSe
    ),
      BoundingBArray;

    createMeshes(populationNo, nof, box, [-5, -5, 4, 4], scene, animateNo),
      BoundingBArray;

    createMeshes(populationDk, dkf, box, [5, 5, -5, -5], scene, animateDk),
      BoundingBArray;

    createMeshes(populationFi, fif, box, [-5, -5, -5, -5], scene, animateFi),
      BoundingBArray;

    document.getElementById("no").innerHTML = "No:" + Math.ceil(populationNo);
    document.getElementById("se").innerHTML = "Se:" + Math.ceil(populationSe);
    document.getElementById("dk").innerHTML = "Dk:" + Math.ceil(populationDk);
    document.getElementById("fi").innerHTML = "Fi:" + Math.ceil(populationFi);
  } catch (error) {
    console.error(error);
  }
}

await fetchApi();

function createMeshes(
  population,
  material,
  geometry,
  positionArray,
  scene,
  animateArray
) {
  //create cubes
  for (let i = 0; i < population; i++) {
    let xPos = THREE.MathUtils.randFloat(positionArray[0], positionArray[1]);
    let yPos = THREE.MathUtils.randFloat(positionArray[2], positionArray[3]);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(xPos, yPos, 0);

    //box3 bounding box
    const BoundingB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    BoundingB.setFromObject(mesh);

    scene.add(mesh);
    animateArray.push(mesh);
    BoundingBArray.push(BoundingB);
  }
}

const cylG = new THREE.CylinderGeometry(12, 13, 49, 128);
const cylM = new THREE.MeshBasicMaterial({ map: textureLoad });
const cylinder = new THREE.Mesh(cylG, cylM);

cylinder.rotation.x = 1.555;
cylinder.rotation.y = 0;
cylinder.position.z = -24.9;
scene.add(cylinder);

camera.position.z = 10;
camera.position.y = -20;
camera.position.x = 0;

// delta time
let delta;

function randRotate(animateCountry, speedsCountry, rotationsCountry) {
  for (let i = 0; i < animateCountry.length; i++) {
    speedsCountry[i] = THREE.MathUtils.randFloat(0.1, 1);
    rotationsCountry[i] = THREE.MathUtils.randFloat(0, Math.PI / 2);
    // Random rotation between 0 and 90 degrees
  }
}

randRotate(animateSe, speedsSe, rotationsSe);
randRotate(animateNo, speedsNo, rotationsNo);
randRotate(animateDk, speedsDk, rotationsDk);
randRotate(animateFi, speedsFi, rotationsFi);

/* loader.load("Resource/islandsWall.glb", (gltf) => {
	const tracedModel = gltf.scene;

	// apply color to GLB model
	const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); 
	// Replace 0xff0000 with your desired color
	tracedModel.material = material;
	tracedModel.traverse((node) => {
		node.material = material;
		material.transparent = true;
		material.opacity = 0.5;
	});

	scene.add(tracedModel);

	tracedModel.position.set(xTM, yTM, zTM);
	tracedModel.rotation.set(rTMx, rTMy, rTMz);
	tracedModel.scale.set(4.7, 6, 6);
	// tracedModel.scale.multiplyScalar(6); // removes walls
}); */
//

//############################################
//makes the bounding box wireframe dissapear
let isvisable = true
//############################################

//Swedish container(Unciviliced cunts)
const wallMesh = new THREE.Mesh(
  new THREE.SphereGeometry(3),
  new THREE.MeshPhongMaterial({ wireframe: true })
);
wallMesh.position.set(3.5, 4.5, 0);
const wallBB = new THREE.Sphere(wallMesh.position, 2.4);
//norway contaier
const wallMeshN = new THREE.Mesh(
  new THREE.SphereGeometry(3),
  new THREE.MeshPhongMaterial({ wireframe: true })
);
wallMeshN.position.set(-5, 4.5, 0);
const wallBBN = new THREE.Sphere(wallMeshN.position, 2.3);
//Danish container
const wallMeshD = new THREE.Mesh(
	new THREE.SphereGeometry(3.5),
	new THREE.MeshPhongMaterial({ wireframe: true })
  );
  wallMeshD.position.set(5, -4, 0);
  const wallBBD = new THREE.Sphere(wallMeshD.position, 3);
//Container for Alcoholics(finish)
const wallMeshF = new THREE.Mesh(
	new THREE.SphereGeometry(2),
	new THREE.MeshPhongMaterial({ wireframe: true })
  );
  wallMeshF.position.set(-5, -5.3, 0);
  const wallBBF = new THREE.Sphere(wallMeshF.position, 1.8);
  if(isvisable == true){
  scene.add(wallMeshF,wallMeshD,wallMeshN,wallMesh)}

controls.autoRotateSpeed = 1;
animateScene(
  snowflakes,
  clock,
  animateSe,
  animateNo,
  animateDk,
  animateFi,
  speedsSe,
  speedsNo,
  speedsDk,
  speedsFi,
  rotationsSe,
  rotationsNo,
  rotationsDk,
  rotationsFi,
  controls,
  delta,
  camera,
  scene,
  renderer,
  BoundingBArray,
  wallMesh,
  wallBB,
  wallBBN,
  wallBBD,
  wallBBF
);
