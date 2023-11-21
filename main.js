import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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

const seg = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const sef = new THREE.MeshBasicMaterial({ color: 0xecb920 }); //yellow mesh for sweden

const nog = new THREE.BoxGeometry(0.3, 0.3, 0.3);
let nof; //blue mesh for norway

const dkg = new THREE.SphereGeometry(0.2, 0.2, 0.2);
const dkf = new THREE.MeshBasicMaterial({ color: 0xf44336 }); //red for denmark

const fig = new THREE.ConeGeometry(0.2, 0.2, 128);
const fif = new THREE.MeshBasicMaterial({ color: 0xd5d5d5 }); //white ish gray to finland

//make cube loop puts each cube in an array for animastion later
let se;//the cube
let animateSe = [];//animation array

let no;
let animateNo = [];

let dk;
let animateDk = [];

let fi;
let animateFi = [];
const populationSe = THREE.MathUtils.randFloat(1, 80);//amount of cubes
const populationNo = THREE.MathUtils.randFloat(1, 50);
const populationDk = THREE.MathUtils.randFloat(1, 120);
const populationFi = THREE.MathUtils.randFloat(1, 30);

for (let i = 0; i < populationSe; i++) {
  let xPos = THREE.MathUtils.randFloat(3.6, 3.6);// placement random spawn
  let yPos = THREE.MathUtils.randFloat(4.5, 4.5);// placement random spawn
  se = new THREE.Mesh(seg, sef);
  se.position.set(xPos, yPos, 0);
  scene.add(se);
  animateSe.push(se);
}


for (let j = 0; j < populationNo; j++) {
  let xPos2 = THREE.MathUtils.randFloat(-5, -5);
  let yPos2 = THREE.MathUtils.randFloat(4, 4);
  nof = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
  no = new THREE.Mesh(nog, nof);
  no.position.set(xPos2, yPos2, 0);
  scene.add(no);
  animateNo.push(no);
}

for (let j = 0; j < populationDk; j++) {
  let xPos3 = THREE.MathUtils.randFloat(5, 5);
  let yPos3 = THREE.MathUtils.randFloat(-5, -5);
  dk = new THREE.Mesh(dkg, dkf);
  dk.position.set(xPos3, yPos3, 0);
  scene.add(dk);
  animateDk.push(dk);
}


for (let k = 0; k < populationFi; k++) {
  let xPos3 = THREE.MathUtils.randFloat(-5, -5);
  let yPos3 = THREE.MathUtils.randFloat(-5, -5);
  fi = new THREE.Mesh(fig, fif);
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
const pm = new THREE.MeshBasicMaterial( {map: pt, transparent: true});
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
let clock = new THREE.Clock();
let delta = 0;
// speed arrays
let speedsSe = [];
let speedsNo = [];
let speedsDk = [];
let speedsFi = [];
//rotation arrays
let rotationsNo = [];
let rotationsSe = [];
let rotationsDk = [];
let rotationsFi = [];
// how fast will object go indevidually

for (let i = 0; i < animateSe.length; i++) {
  speedsSe[i] = THREE.MathUtils.randFloat(0.1, 2);
  rotationsSe[i] = THREE.MathUtils.randFloat(0, Math.PI / 2); // Random rotation between 0 and 90 degrees
}
/* for (let i = 0; i < animateSe.length; i++) {
  speedsSe[i] = THREE.MathUtils.randFloat(0.1, 2);
} why is this here? */

for (let i = 0; i < animateNo.length; i++) {
  speedsNo[i] = THREE.MathUtils.randFloat(0.1, 2);
  rotationsNo[i] = THREE.MathUtils.randFloat(0, Math.PI / 2);
}
for (let i = 0; i < animateDk.length; i++) {
  speedsDk[i] = THREE.MathUtils.randFloat(0.1, 2);
  rotationsDk[i] = THREE.MathUtils.randFloat(0, Math.PI / 2);
}
for (let i = 0; i < animateFi.length; i++) {
  speedsFi[i] = THREE.MathUtils.randFloat(0.1, 2);
  rotationsFi[i] = THREE.MathUtils.randFloat(0, Math.PI / 2);
}

// for stop condition collision borders
const Lx = -7.7;
const Rx = 7.7;
const maxy = 6;
const miny = -7.2;

controls.autoRotate = false;
controls.autoRotateSpeed = 1;
console.log(controls);

function animate() {
  delta = clock.getDelta();

  // OrbitControlls update
  controls.update(delta);

  plane.lookAt(camera.position);

  // sweden animastion
  // loop makes it so animatese rotates and goes a slightly different direction until it hits one of the condition stoppers
  for (let i = 0; i < animateSe.length; i++) {
    animateSe[i].position.x += speedsSe[i] * Math.cos(rotationsSe[i]) * delta;
    animateSe[i].position.y += speedsSe[i] * Math.sin(rotationsSe[i]) * delta;

    if (animateSe[i].position.x > Rx || animateSe[i].position.x < Lx || animateSe[i].position.y > maxy || animateSe[i].position.y < miny
    ) {
      animateSe[i].position.x = Math.min(Rx, Math.max(Lx, animateSe[i].position.x));
      animateSe[i].position.y = Math.min(maxy, Math.max(miny, animateSe[i].position.y));

      // Change direction and slightly rotate
      speedsSe[i] *= -1;
      rotationsSe[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
    }
  }
  // Norway animastion
  for (let i = 0; i < animateNo.length; i++) {
    animateNo[i].position.x += speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
    animateNo[i].position.y += speedsNo[i] * Math.sin(rotationsNo[i]) * delta;

    if (animateNo[i].position.x > Rx || animateNo[i].position.x < Lx || animateNo[i].position.y > maxy || animateNo[i].position.y < miny
    ) {
      animateNo[i].position.x = Math.min(Rx, Math.max(Lx, animateNo[i].position.x));
      animateNo[i].position.y = Math.min(maxy, Math.max(miny, animateNo[i].position.y));

      // Change direction and slightly rotate
      speedsNo[i] *= -1;
      rotationsNo[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees

    }
    //isolated cube -- why is this comment here?
  }
  // denmark animastion
  for (let i = 0; i < animateDk.length; i++) {
    animateDk[i].position.x += speedsDk[i] * Math.cos(rotationsDk[i]) * delta;
    animateDk[i].position.y += speedsDk[i] * Math.sin(rotationsDk[i]) * delta;

    if (animateDk[i].position.x > Rx || animateDk[i].position.x < Lx || animateDk[i].position.y > maxy || animateDk[i].position.y < miny
    ) {
      animateDk[i].position.y = Math.min(maxy, Math.max(miny, animateDk[i].position.y));
      animateDk[i].position.x = Math.min(Rx, Math.max(Lx, animateDk[i].position.x));

      // Change direction and slightly rotate
      speedsDk[i] *= -1;
      rotationsDk[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
    }
  }
  // finland animastion
  for (let i = 0; i < animateFi.length; i++) {
    animateFi[i].position.x += speedsFi[i] * Math.cos(rotationsFi[i]) * delta;
    animateFi[i].position.y += speedsFi[i] * Math.sin(rotationsFi[i]) * delta;

    if (animateFi[i].position.x > Rx || animateFi[i].position.x < Lx || animateFi[i].position.y > maxy || animateFi[i].position.y < miny
    ) {
      animateFi[i].position.y = Math.min(maxy, Math.max(miny, animateFi[i].position.y));
      animateFi[i].position.x = Math.min(Rx, Math.max(Lx, animateFi[i].position.x));

      // Change direction and slightly rotate
      speedsFi[i] *= -1;
      rotationsFi[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
    }
  }
  //buttonexempt when z1
  if (buttonevent = true) {

      cubeSelc.position.z -= 0.1; 
  }

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
  camera.lookAt( scene.position );
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//eventbutton
let buttonevent = false;
let btn_element = document.getElementById("eventbutton");
const randCube = Math.floor(Math.random() * animateNo.length)//random cube out of animateNo
const cubeSelc = animateNo[randCube]//cube selection
let liftHeight = 2;

btn_element.addEventListener("click", () => {
  cubeSelc.position.z += liftHeight;
})


//run functions
animate();

