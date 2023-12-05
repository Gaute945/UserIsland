import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { animateScene } from "./animation";

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

const textureLoad = new THREE.TextureLoader().load("Resource/map (1)-noCircle.png");
/* const textureLoad = new THREE.TextureLoader().load("Resource/tex_DebugGrid.png"); */


// speed, rotation and animation arrays | make cube loop puts each cube in an array for animastion later
let [speedsSe, speedsNo, speedsDk, speedsFi, rotationsNo, rotationsSe, rotationsDk, rotationsFi, animateSe, animateNo, animateDk, animateFi] = [[], [], [], [], [], [], [], [], [], [], [], []];

// country var
let se, no, dk, fi, nof;

//amount of cubes
const populationSe = THREE.MathUtils.randFloat(1, 50); // 80
const populationNo = THREE.MathUtils.randFloat(1, 25); // 50
const populationDk = THREE.MathUtils.randFloat(1, 50); // 120
const populationFi = THREE.MathUtils.randFloat(1, 10); // 30

const sef = new THREE.MeshBasicMaterial({ color: 0xecb920 }); //yellow mesh for sweden
const box = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const dkf = new THREE.MeshBasicMaterial({ color: 0xf44336 }); //red for denmark
const fif = new THREE.MeshBasicMaterial({ color: 0xd5d5d5 }); //white ish gray to finland

// function addBoxes(populationCountry) {
//   const box = new THREE.BoxGeometry(0.2, 0.2, 0.2);
//   for (let i = 0; i < populationCountry; i++) {
//     let xPos = THREE.MathUtils.randFloat(3.6, 3.6);// placement random spawn
//     let yPos = THREE.MathUtils.randFloat(4.5, 4.5);// placement random spawn
//     a = new THREE.Mesh(box, sef);
//     a.position.set(xPos, yPos, 0);
//     scene.add(a);
//     animateSe.push(a);
//   }
// }

for (let i = 0; i < populationSe; i++) {
  let xPos = THREE.MathUtils.randFloat(3.6, 3.6);// placement random spawn
  let yPos = THREE.MathUtils.randFloat(4.5, 4.5);// placement random spawn
  se = new THREE.Mesh(box, sef);
  se.position.set(xPos, yPos, 0);
  scene.add(se);
  animateSe.push(se);
}

for (let j = 0; j < populationNo; j++) {
  let xPos2 = THREE.MathUtils.randFloat(-5, -5);
  let yPos2 = THREE.MathUtils.randFloat(4, 4);
  nof = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
  no = new THREE.Mesh(box, nof);
  no.position.set(xPos2, yPos2, 0);
  scene.add(no);
  animateNo.push(no);
}

for (let j = 0; j < populationDk; j++) {
  let xPos3 = THREE.MathUtils.randFloat(5, 5);
  let yPos3 = THREE.MathUtils.randFloat(-5, -5);
  dk = new THREE.Mesh(box, dkf);
  dk.position.set(xPos3, yPos3, 0);
  scene.add(dk);
  animateDk.push(dk);
}


for (let k = 0; k < populationFi; k++) {
  let xPos3 = THREE.MathUtils.randFloat(-5, -5);
  let yPos3 = THREE.MathUtils.randFloat(-5, -5);
  fi = new THREE.Mesh(box, fif);
  fi.position.set(xPos3, yPos3, 0);
  scene.add(fi);
  animateFi.push(fi);
}

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

const pt = new THREE.TextureLoader().load("Resource/marioCastle.png");
const pg = new THREE.PlaneGeometry(10, 10, 1, 1);
const pm = new THREE.MeshBasicMaterial({ map: pt, transparent: true });
const plane = new THREE.Mesh(pg, pm);
plane.rotation.x = 149.21;
scene.add(plane);

camera.position.z = 10;
camera.position.y = -20;
camera.position.x = 0;

// helpers
/* const helper = new THREE.CameraHelper(camera);
scene.add(helper); */

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
// end of helpers

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

// for stop condition collision borders
const Lx = -7.7;
const Rx = 7.7;
const maxy = 6;
const miny = -7.2;

controls.autoRotate = false;
controls.autoRotateSpeed = 1;

animateScene(plane ,clock, animateSe, animateNo, animateDk, animateFi, speedsSe, speedsNo, speedsDk, speedsFi, rotationsSe, rotationsNo, rotationsDk, rotationsFi, controls, delta, Lx, Rx, maxy, miny, camera, scene, renderer);
