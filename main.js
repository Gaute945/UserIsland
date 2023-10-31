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
const helper = new THREE.CameraHelper( camera );
scene.add( helper );

//lager en webglrenderer i koden som blir kaldt ut som renderer
const renderer = new THREE.WebGLRenderer();
//renderer størelse
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoad = new THREE.TextureLoader().load("mapofplace.jpg");
const boksmap = new THREE.Mesh(
  new THREE.BoxGeometry(7, 6.8, 0),
  new THREE.MeshBasicMaterial({ color: 0xff2d00,wireframe: true })
);
scene.add(boksmap);
boksmap.position.set(0, -2, 0);

//geometry og material er det cube bruker til å bli cube utsende
//geometry og material er det Svensker bruker til å bli Svensker utsende
const SvenskG = new THREE.BoxGeometry(0.3,0.3,0.3);
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

let testnumbef = 1
//geometry meterial for bakCyllinder
const BakgeomeCy = new THREE.CylinderGeometry(1, 1, 1, 1, 1);
const BakMatCy = new THREE.MeshBasicMaterial({ color: 0xcc330 })

//befolkningse er kor mangen cube/svensker eg vil rendere i siden
const befolkningSE = THREE.MathUtils.randFloat(1, 8);
//for så lange i er mindre en befolkningse lager den fleire Svenskers
for (let i = 0; i < befolkningSE; i++) {
  let xPos = THREE.MathUtils.randFloat(1.875, -1.875);
  let yPos = THREE.MathUtils.randFloat(1.1,-6);
  const Svensker = new THREE.Mesh(SvenskG, SvenskF);
  Svensker.position.set(xPos, yPos, 0);
  scene.add(Svensker);
}
//befolkning er kor mangen normen representert i cyllinder eg vil rendere i siden
const befolkningNO = THREE.MathUtils.randFloat(1, 5);
//for så lange j er mindre en befolkning se lager den fleire Svenskers
for (let j = 0; j < befolkningNO; j++) {
  let xPos2 = THREE.MathUtils.randFloat(7.5, -7.5);
  let yPos2 = THREE.MathUtils.randFloat(1.1,-6);
  const normen = new THREE.Mesh(NorskG, NorskF);
  normen.position.set(xPos2, yPos2, 0);
  scene.add(normen);
}
const befolkningDK = THREE.MathUtils.randFloat(1, 12);
for (let j = 0; j < befolkningDK; j++) {
  let xPos3 = THREE.MathUtils.randFloat(7.5, -7.5);
  let yPos3 = THREE.MathUtils.randFloat(1.1,-6);
  const Danske = new THREE.Mesh(DanskG, DanskF);
  Danske.position.set(xPos3, yPos3, 0);
  scene.add(Danske);
}
const befolkningFI = THREE.MathUtils.randFloat(1, 12);
for (let k = 0; k < befolkningFI; k++) {
  let xPos3 = THREE.MathUtils.randFloat(7.5, -7.5);
  let yPos3 = THREE.MathUtils.randFloat(1.1,-6);
  const finske = new THREE.Mesh(FinskG, FinskF);
  finske.position.set(xPos3, yPos3, 0);
  scene.add(finske);
}

const cylGeometry = new THREE.CylinderGeometry( 4, 5, 50, 128 ); 
const cylMaterial = new THREE.MeshBasicMaterial({ map: textureLoad }); 
const cylinder = new THREE.Mesh( cylGeometry, cylMaterial ); 
cylinder.rotation.x = -1.5
cylinder.position.z = -25.2
scene.add( cylinder );

const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

camera.position.z = 15;
camera.position.y = -18;
camera.position.x = 3.5;
camera.rotation.x = 1;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
}
animate();
