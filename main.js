import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const helper = new THREE.CameraHelper(camera);
scene.add(helper);

const renderer = new THREE.WebGLRenderer({ antialiasing: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoad = new THREE.TextureLoader().load("Resource/tex_DebugGrid.png");
const boksmap = new THREE.Mesh(
  new THREE.BoxGeometry(10, 8.8, 0),
  new THREE.MeshBasicMaterial({ color: 0xff2d00, wireframe: true })
);
scene.add(boksmap);
boksmap.position.set(0, -3, 0);

const seg = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const sef = new THREE.MeshBasicMaterial({ color: 0xff2d00 });

const nog = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const nof = new THREE.MeshBasicMaterial({ color: 0x2d9c18 });

const dkg = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const dkf = new THREE.MeshBasicMaterial({ color: 0xe00ff });

const fig = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const fif = new THREE.MeshBasicMaterial({ color: 0xa832a6 });

let se
let animateSe = []

const populationSe = THREE.MathUtils.randFloat(1, 8);

for (let i = 0; i < populationSe; i++) {
  let xPos = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos = THREE.MathUtils.randFloat(-7, 2);
  se = new THREE.Mesh(seg, sef);
  se.position.set(xPos, yPos, 0);
  scene.add(se);
  animateSe.push(se)
}

let no
let animateNo = []

const PopulationNo = THREE.MathUtils.randFloat(1, 5);

for (let j = 0; j < PopulationNo; j++) {
  let xPos2 = THREE.MathUtils.randFloat(7.5, -7.5);
  let yPos2 = THREE.MathUtils.randFloat(1.1, -6);
  no = new THREE.Mesh(nog, nof);
  no.position.set(xPos2, yPos2, 0);
  scene.add(no);
  animateNo.push(no)
}

let dk
let animateDk = []

const befolkningDK = THREE.MathUtils.randFloat(1, 12);
for (let j = 0; j < befolkningDK; j++) {
  let xPos3 = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos3 = THREE.MathUtils.randFloat(-7, 2);
  dk = new THREE.Mesh(dkg, dkf);
  dk.position.set(xPos3, yPos3, 0);
  scene.add(dk);
  animateDk.push(dk)
}

let fi
let animateFi = []
const befolkningFI = THREE.MathUtils.randFloat(1, 3);
for (let k = 0; k < befolkningFI; k++) {
  let xPos3 = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos3 = THREE.MathUtils.randFloat(-7, 2);
  fi = new THREE.Mesh(fig, fif);
  fi.position.set(xPos3, yPos3, 0);
  scene.add(fi);
  animateFi.push(fi)
}

const cylG = new THREE.CylinderGeometry(6, 7, 49, 128);
const cylM = new THREE.MeshBasicMaterial({ map: textureLoad, });
const cylinder = new THREE.Mesh(cylG, cylM);
cylinder.rotation.x = -1.5
cylinder.position.z = -25.2
scene.add(cylinder);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

camera.position.z = 10;
camera.position.y = -18;
camera.position.x = 0;
camera.rotation.x = 1;

function animate() {
  requestAnimationFrame(animate);
  for (let i = 0; i < animateNo.length; i++) {
    animateNo[i].rotation.x += 0.01;
    animateNo[i].rotation.y += 0.01;
  }

  for (let i = 0; i < animateSe.length; i++) {
    animateSe[i].rotation.x += 0.01;
    animateSe[i].rotation.y += 0.01;
  }

  for (let i = 0; i < animateDk.length; i++) {
    animateDk[i].rotation.x += 0.01;
    animateDk[i].rotation.y += 0.01;
  }
  
    for (let i = 0; i < animateFi.length; i++) {
    animateFi[i].rotation.x += 0.01;
    animateFi[i].rotation.y += 0.01;
  }
  renderer.render(scene, camera);
}

animate();
