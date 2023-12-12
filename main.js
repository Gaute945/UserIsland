import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { animateScene } from "./animation";

const appmode = "prod";

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const clock = new THREE.Clock();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialiasing: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Create snowflake geometry and material
const snowflakeGeometry = new THREE.BufferGeometry();
const snowflakeMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0xffffff });

// Create an array to store snowflake positions
const snowflakeVertices = [];
const snowAmmount = getRandomInt (1, 50000);

// Populate the array with random snowflake positions
for (let i = 0; i < snowAmmount; i++) {
  const x = (Math.random() - 0.5) * 25;
  const y = (Math.random() - 0.5) * 25;
  const z = (Math.random() - 0.5) * 25;
  snowflakeVertices.push(x, y, z);
}
console.log(snowAmmount);

// Set the snowflake vertices to the geometry
snowflakeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowflakeVertices, 3));

// Create the snowflake points
const snowflakes = new THREE.Points(snowflakeGeometry, snowflakeMaterial);

let textureLoad

switch (appmode) {
  case "prod":

    // Add snowflakes to the scene
    scene.add(snowflakes);

    // christmas map
    textureLoad = new THREE.TextureLoader().load("Resource/a1ebabf8-049a-4983-9b33-5af273a03605.jpeg");

    // controls.autoRotate = true;
    break;

  case "debug":
    // debug map
    textureLoad = new THREE.TextureLoader().load("Resource/tex_DebugGrid.png");

    // helpers
    // camera helper (black cross with yellow cam line, also blocks axes helper)
    // start of helpers
    const helper = new THREE.CameraHelper(camera);
    scene.add(helper);

    // The X axis is red. The Y axis is green. The Z axis is blue.
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // collision visualization for boxes
    const boksmap = new THREE.Mesh(
      new THREE.BoxGeometry(7, 3.5, 0),
      new THREE.MeshBasicMaterial({ color: 0xff2d00, wireframe: true })
    );
    boksmap.position.set(3.6, 4.3, 0);
    scene.add(boksmap);
    break;

  default:
    // normal map
    textureLoad = new THREE.TextureLoader().load("Resource/map (1)-noCircle.png");
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
// const boksmap = new THREE.Mesh(
//   new THREE.BoxGeometry(7, 3.5, 0),
//   new THREE.MeshBasicMaterial({ color: 0xff2d00, wireframe: true })
// );
// boksmap.position.set(3.6, 4.3, 0);
// scene.add(boksmap);
//end of helpers

// speed, rotation and animation arrays | make cube loop puts each cube in an array for animastion later
let [speedsSe, speedsNo, speedsDk, speedsFi, rotationsNo, rotationsSe, rotationsDk, rotationsFi, animateSe, animateNo, animateDk, animateFi] = [[], [], [], [], [], [], [], [], [], [], [], []];

// amount of cubes
const populationSe = THREE.MathUtils.randFloat(1, 50); // 80
const populationNo = THREE.MathUtils.randFloat(1, 25); // 50
const populationDk = THREE.MathUtils.randFloat(1, 50); // 120
const populationFi = THREE.MathUtils.randFloat(1, 10); // 30


const box = new THREE.BoxGeometry(0.3, 0.3, 0.3);

const sef = new THREE.MeshBasicMaterial({ color: 0xecb920 }); // colored mesh for sweden
const nof = new THREE.MeshBasicMaterial({ color: 0x009999 }); // colored mesh for norway
const dkf = new THREE.MeshBasicMaterial({ color: 0xf44336 }); // colored mesh for denmark
const fif = new THREE.MeshBasicMaterial({ color: 0xd5d5d5 }); // colored mesh for finland

function createMeshes(population, material, geometry, positionArray, scene, animateArray) {
  for (let i = 0; i < population; i++) {
    let xPos = THREE.MathUtils.randFloat(positionArray[0], positionArray[1]);
    let yPos = THREE.MathUtils.randFloat(positionArray[2], positionArray[3]);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(xPos, yPos, 0);
    scene.add(mesh);
    animateArray.push(mesh);
  }
}

createMeshes(populationSe, sef, box, [3.6, 3.6, 4.5, 4.5], scene, animateSe);
createMeshes(populationNo, nof, box, [-5, -5, 4, 4], scene, animateNo);
createMeshes(populationDk, dkf, box, [5, 5, -5, -5], scene, animateDk);
createMeshes(populationFi, fif, box, [-5, -5, -5, -5], scene, animateFi);


document.getElementById("no").innerHTML = "No " + Math.ceil(populationNo);
document.getElementById("se").innerHTML = "Se " + Math.ceil(populationSe);
document.getElementById("dk").innerHTML = "Dk " + Math.ceil(populationDk);
document.getElementById("fi").innerHTML = "Fi " + Math.ceil(populationFi);

const cylG = new THREE.CylinderGeometry(12, 13, 49, 128);
const cylM = new THREE.MeshBasicMaterial({ map: textureLoad });
const cylinder = new THREE.Mesh(cylG, cylM);

cylinder.rotation.x = 1.555;
cylinder.rotation.y = 0;
cylinder.position.z = -24.9;
scene.add(cylinder);

const pt = new THREE.TextureLoader().load(/* "Resource/marioCastle.png" */);//undo comment to get mario castle
const pg = new THREE.PlaneGeometry(10, 10, 1, 1);
const pm = new THREE.MeshBasicMaterial({ map: pt, transparent: true });
const plane = new THREE.Mesh(pg, pm);
plane.rotation.x = 149.21;
scene.add(plane);
plane.rotation.set(-5, 0, 0);

// Set maximum rotation limits
const maxPlaneRotationX = Math.PI / 1;
const maxPlaneRotationY = Math.PI / 1;
const maxPlaneRotationZ = Math.PI / 1;

camera.position.z = 10;
camera.position.y = -20;
camera.position.x = 0;

// delta time
let delta;

function randRotate(animasteCountry, speedsCountry, rotationsCountry) {
  for (let i = 0; i < animasteCountry.length; i++) {
    speedsCountry[i] = THREE.MathUtils.randFloat(0.1, 2);
    rotationsCountry[i] = THREE.MathUtils.randFloat(0, Math.PI / 2); // Random rotation between 0 and 90 degrees
  }
}

randRotate(animateSe, speedsSe, rotationsSe)
randRotate(animateNo, speedsNo, rotationsNo)
randRotate(animateDk, speedsDk, rotationsDk)
randRotate(animateFi, speedsFi, rotationsFi)

//GLB loader for traced island model
const loader = new GLTFLoader();

loader.load('Resource/islandswall.glb', (gltf) => {
  const tracedModel = gltf.scene;
  
  // apply color to GLB model
  const matTracedM = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Replace 0xff0000 with your desired color
  tracedModel.matTracedM = matTracedM;
  tracedModel.traverse((node) => {
    node.material = matTracedM;
  });

  scene.add(tracedModel);

  tracedModel.position.set(xTM, yTM, zTM);
  tracedModel.rotation.set(rTMx, rTMy, rTMz);
  tracedModel.scale.multiplyScalar(4);
});

let xTM = 0, yTM = 0, zTM = -6.6, rTMx = 7.8, rTMy = 6.4, rTMz = 0


// for stop condition collision borders
const Lx = -7.7;
const Rx = 7.7;
const maxy = 6;
const miny = -7.2;

controls.autoRotateSpeed = 1;

animateScene(snowflakes, maxPlaneRotationZ, maxPlaneRotationY, maxPlaneRotationX, plane, clock, animateSe, animateNo, animateDk, animateFi, speedsSe, speedsNo, speedsDk, speedsFi, rotationsSe, rotationsNo, rotationsDk, rotationsFi, controls, delta, Lx, Rx, maxy, miny, camera, scene, renderer);
