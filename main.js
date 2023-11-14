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

const textureLoad = new THREE.TextureLoader().load(
  "Resource/Scandinavia_regions_map.png"
);
/* const textureLoad = new THREE.TextureLoader().load("Resource/tex_DebugGrid.png"); */

const seg = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const sef = new THREE.MeshBasicMaterial({ color: 0xecb920 });//yellow mesh for sweden

const nog = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const nof = new THREE.MeshBasicMaterial({ color: 0x2986cc}); //blue mesh for norway

const dkg = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const dkf = new THREE.MeshBasicMaterial({ color: 0xf44336 });//red for denmark

const fig = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const fif = new THREE.MeshBasicMaterial({ color: 0xbcbcbc });//white ish gray to finland

let se;
let animateSe = [];

const populationSe = THREE.MathUtils.randFloat(1, 8);

for (let i = 0; i < populationSe; i++) {
  let xPos = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos = THREE.MathUtils.randFloat(-7, 2);
  se = new THREE.Mesh(seg, sef);
  se.position.set(xPos, yPos, 0);
  scene.add(se);
  animateSe.push(se);
}

let no;
let animateNo = [];

const populationNo = THREE.MathUtils.randFloat(1, 5);

for (let j = 0; j < populationNo; j++) {
  let xPos2 = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos2 = THREE.MathUtils.randFloat(-7, 2);
  no = new THREE.Mesh(nog, nof);
  no.position.set(xPos2, yPos2, 0);
  scene.add(no);
  animateNo.push(no);
}

let dk;
let animateDk = [];

const populationDk = THREE.MathUtils.randFloat(1, 12);
for (let j = 0; j < populationDk; j++) {
  let xPos3 = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos3 = THREE.MathUtils.randFloat(-7, 2);
  dk = new THREE.Mesh(dkg, dkf);
  dk.position.set(xPos3, yPos3, 0);
  scene.add(dk);
  animateDk.push(dk);
}

let fi;
let animateFi = [];
const populationFi = THREE.MathUtils.randFloat(1, 3);
for (let k = 0; k < populationFi; k++) {
  let xPos3 = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos3 = THREE.MathUtils.randFloat(-7, 2);
  fi = new THREE.Mesh(fig, fif);
  fi.position.set(xPos3, yPos3, 0);
  scene.add(fi);
  animateFi.push(fi);
}

document.getElementById("no").innerHTML = "No " + Math.ceil(populationNo);
document.getElementById("se").innerHTML = "Se " + Math.ceil(populationSe);
document.getElementById("dk").innerHTML = "Dk " + Math.ceil(populationDk);
document.getElementById("fi").innerHTML = "Fi " + Math.ceil(populationFi);

const cylG = new THREE.CylinderGeometry(6, 7, 49, 128);
const cylM = new THREE.MeshBasicMaterial({ map: textureLoad });
const cylinder = new THREE.Mesh(cylG, cylM);
cylinder.rotation.x = -1.5;
cylinder.rotation.y = 1.5;
cylinder.position.z = -25.5;
scene.add(cylinder);

camera.position.z = 10;
camera.position.y = -18;
camera.position.x = 0;
camera.rotation.x = 1;

/* //helpers
  const helper = new THREE.CameraHelper(camera);
  scene.add(helper);

  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  //collision visualization for boxes
  const boksmap = new THREE.Mesh(
    new THREE.BoxGeometry(10, 8.8, 0),
    new THREE.MeshBasicMaterial({ color: 0xff2d00, wireframe: true })
  );
  boksmap.position.set(0, -3, 0);
  scene.add(boksmap); */

// for stop condition
const Lx = -5;
const Rx = 5;
const maxy = 1.5;
const miny = -7.2;

//delta time
let clock = new THREE.Clock();
let speed = 2;
let delta = 0;
let speedsSe = [];
let speedsNo = [];
let speedsDk = [];
let speedsFi = [];
//how fast will object go indevidually
for (let i = 0; i < animateSe.length; i++) {
  speedsSe[i] = 1;
}
for (let i = 0; i < animateNo.length; i++) {
  speedsNo[i] = 1;
}
for (let i = 0; i < animateDk.length; i++) {
  speedsDk[i] = 1;
}
for (let i = 0; i < animateFi.length; i++) {
  speedsFi[i] = 1;
}

function animate() {
  requestAnimationFrame(animate);

  delta = clock.getDelta();

  //sweden animastion
  for (let i = 0; i < animateSe.length; i++) {
    animateSe[i].position.x += speedsSe[i] * delta;

    if (animateSe[i].position.x > Rx || animateSe[i].position.x < Lx) {
      animateSe[i].position.x = Math.min(
        Rx,
        Math.max(Lx, animateSe[i].position.x)
      );
      speedsSe[i] *= -1;
    }
  }
  //Norway animastion
  for (let i = 0; i < animateNo.length; i++) {
    animateNo[i].position.x += speedsNo[i] * delta;

    if (animateNo[i].position.x > Rx || animateNo[i].position.x < Lx) {
      animateNo[i].position.x = Math.min(
        Rx,
        Math.max(Lx, animateNo[i].position.x)
      );
      speedsNo[i] *= -1;
    }
  }
/*   //denmark animastion
  for (let i = 0; i < animateDk.length; i++) {
    animateDk[i].position.y += speedsDk[i] * delta;

    if (animateDk[i].position.y > maxy || animateDk[i].position.y < miny) {
      animateDk[i].position.y = Math.min(
        maxy,
        Math.max(miny, animateDk[i].position.y)
      );
      speedsDk[i] *= -1;
    }
  }
  //finland animastion
  for (let i = 0; i < animateFi.length; i++) {
    animateFi[i].position.y += speedsFi[i] * delta;

    if (animateFi[i].position.y > maxy || animateFi[i].position.y < miny) {
      animateFi[i].position.y = Math.min(
        maxy,
        Math.max(miny, animateFi[i].position.y)
      );
      speedsFi[i] *= -1;
    }
  } */
  ;
  let eventjump = false;
  if (eventjump = true){
    
  };
  renderer.render(scene, camera);
}

animate();