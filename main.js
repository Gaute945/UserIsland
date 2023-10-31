//importerer three.js som THREE
import * as THREE from "three";
//scene lager en scene
const scene = new THREE.Scene();
//camera lager et camera med perspectivet 90 fov og størelse
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//lager en webglrenderer i koden som blir kaldt ut som renderer
const renderer = new THREE.WebGLRenderer();
//renderer størelse
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoad = new THREE.TextureLoader().load("mapofplace.jpg");
const boksmap = new THREE.Mesh(
  new THREE.BoxGeometry(23, 10, 0),
  new THREE.MeshBasicMaterial({ map: textureLoad })
);
scene.add(boksmap);
boksmap.position.set(0, 0, 0);

//geometry og material er det cube bruker til å bli cube utsende
const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const material = new THREE.MeshBasicMaterial({ color: 0xff2d00 });
//geometry meterial for cyllinder
const geomeCy = new THREE.CylinderGeometry(0.3, 0.3, 0.3);
const mateCy = new THREE.MeshBasicMaterial({ color: 0x2d9c18 });
//geometry meterial for bakCyllinder
const BakgeomeCy = new THREE.CylinderGeometry(1, 1, 1, 1, 1);
const BakMatCy = new THREE.MeshBasicMaterial({ color: 0xcc3300 })

//befolkningse er kor mangen cubes/svensker eg vil rendere i siden
const befolkningSE = THREE.MathUtils.randFloat(1, 10);
//for så lange i er mindre en befolkningse lager den fleire cubes
for (let i = 0; i < befolkningSE; i++) {
  let xPos = THREE.MathUtils.randFloat(7.5, -7.5);
  let yPos = THREE.MathUtils.randFloat(3.2, -3.2);
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(xPos, yPos, 0);
  scene.add(cube);
}

//befolkning er kor mangen normen representert i cyllinder eg vil rendere i siden
const befolkningNO = THREE.MathUtils.randFloat(1, 8);
//for så lange j er mindre en befolkning se lager den fleire cubes
for (let j = 0; j < befolkningNO; j++) {
  let xPos2 = THREE.MathUtils.randFloat(7.5, -7.5);
  let yPos2 = THREE.MathUtils.randFloat(3.2, -3.2);
  const Cyllinder = new THREE.Mesh(geomeCy, mateCy);
  Cyllinder.position.set(xPos2, yPos2, 0);
  scene.add(Cyllinder);
}

const cylGeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 
const cylMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cylinder = new THREE.Mesh( cylGeometry, cylMaterial ); scene.add( cylinder );

/* for (let j = 0; j < befolkningDK; j++) {
  let xPos3 = THREE.MathUtils.randFloat(7.5, -7.5);
  let yPos3 = THREE.MathUtils.randFloat(3.2, -3.2);
  const  = new THREE.Mesh(geomeCy, mateCy);
  Cyllinder.position.set(xPos2, yPos2, 0);
  scene.add(Cyllinder);
} */

camera.position.z = 0;
camera.position.y =30;
camera.position.x = 0;
camera.rotation.x = -1.55;
camera.rotation.y = 0;
camera.rotation.z = 0;

/* camera.position.z = 15;
camera.position.y = -18;
camera.position.x = 3.5;
camera.rotation.x = 1; */

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  cube.rotateY(0.01);
  cube.rotateX(0.01);
}
animate();
