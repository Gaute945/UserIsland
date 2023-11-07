//importerer three.js som THREE
import * as THREE from "three";

//scene lager en scene
const scene = new THREE.Scene();

//camera lager et camera med perspectivet 90 fov og størelse
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const helper = new THREE.CameraHelper(camera);
scene.add(helper);

//lager en webglrenderer i koden som blir kaldt ut som renderer
const renderer = new THREE.WebGLRenderer({ antialiasing: true });

//renderer størelse
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoad = new THREE.TextureLoader().load("Resource/tex_DebugGrid.png");
const boksmap = new THREE.Mesh(
  new THREE.BoxGeometry(10, 8.8, 0),
  new THREE.MeshBasicMaterial({ color: 0xff2d00, wireframe: true })
);
scene.add(boksmap);
boksmap.position.set(0, -3, 0);

//geometry og material er det cube bruker til å bli cube utsende
//geometry og material er det Svensker bruker til å bli Svensker utsende
const SvenskG = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const SvenskF = new THREE.MeshBasicMaterial({ color: 0xff2d00 });

//geometry meterial for normen
const NorskG = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const NorskF = new THREE.MeshBasicMaterial({ color: 0x2d9c18 });

//DanskF er meterial og DasnkG er Geimetry
const DanskG = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const DanskF = new THREE.MeshBasicMaterial({ color: 0xe00ff });

//FinskF og FinskG representerer geobox og metbasic til finland
const FinskG = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const FinskF = new THREE.MeshBasicMaterial({ color: 0xa832a6 });




//let for å holde arrays alle objectene som går igjennom loopen neddenfor
let normen
let animateNO = []

//befolkning er kor mangen normen representert i cyllinder eg vil rendere i siden
const befolkningNO = 5//THREE.MathUtils.randFloat(1, 50);
//for så lange j er mindre en befolkning se lager den fleire Svenskers
for (let j = 0; j < befolkningNO; j++) {
  let xPos2 = THREE.MathUtils.randFloat(-4,4.5);
  let yPos2 = THREE.MathUtils.randFloat(-7,2);
  normen = new THREE.Mesh(NorskG, NorskF);
  normen.position.set(xPos2, yPos2, 0);
  scene.add(normen);
  animateNO.push(normen)
}





//let for å holde arrays alle objectene som går igjennom loopen neddenfor
let Svensker
let animateSE = []

//befolkningse er kor mangen cube/svensker eg vil rendere i siden
const befolkningSE = 0//THREE.MathUtils.randFloat(1, 80);
//for så lange i er mindre en befolkningse lager den fleire Svenskers
for (let i = 0; i < befolkningSE; i++) {
  let xPos = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos = THREE.MathUtils.randFloat(-7, 2);
  Svensker = new THREE.Mesh(SvenskG, SvenskF);
  Svensker.position.set(xPos, yPos, 0);
  scene.add(Svensker);
  animateSE.push(Svensker)
}

//let for å holde arrays alle objectene som går igjennom loopen neddenfor
let Danske
let animateDK = []
//
const befolkningDK = 0//THREE.MathUtils.randFloat(1, 120);
for (let j = 0; j < befolkningDK; j++) {
  let xPos3 = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos3 = THREE.MathUtils.randFloat(-7, 2);
  Danske = new THREE.Mesh(DanskG, DanskF);
  Danske.position.set(xPos3, yPos3, 0);
  scene.add(Danske);
  animateDK.push(Danske)
}

//let for å holde arrays alle objectene som går igjennom loopen neddenfor
let finske
let animateFI = []
const befolkningFI = 0//THREE.MathUtils.randFloat(1, 30);
for (let k = 0; k < befolkningFI; k++) {
  let xPos3 = THREE.MathUtils.randFloat(-4, 4.5);
  let yPos3 = THREE.MathUtils.randFloat(-7, 2);
  finske = new THREE.Mesh(FinskG, FinskF);
  finske.position.set(xPos3, yPos3, 0);
  scene.add(finske);
  animateFI.push(finske)
}

const cylGeometry = new THREE.CylinderGeometry(6, 7, 49, 128);
const cylMaterial = new THREE.MeshBasicMaterial({ map: textureLoad, });
const cylinder = new THREE.Mesh(cylGeometry, cylMaterial);
cylinder.rotation.x = -1.5
cylinder.position.z = -25.5
scene.add(cylinder);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

camera.position.z = 10;
camera.position.y = -18;
camera.position.x = 0;
camera.rotation.x = 1;

function animate() {
  requestAnimationFrame(animate);

  //normen.rotation.x += 0.01;
  //animate norman i animateNO array
  for (let i = 0; i < animateNO.length; i++) {
    

  }

  //animate svensker i animateSE
  for (let i = 0; i < animateSE.length; i++) {
    animateSE[i].rotation.x += 0.01;
    animateSE[i].rotation.y += 0.01;
  }

  //animate dansker i animateSE
  for (let i = 0; i < animateDK.length; i++) {
    animateDK[i].rotation.x += 0.01;
    animateDK[i].rotation.y += 0.01;
  }

  //animate finske i animateFI
  for (let i = 0; i < animateFI.length; i++) {
    animateFI[i].rotation.x += 0.01;
    animateFI[i].rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();
