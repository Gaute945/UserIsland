

//three example spinning cube

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1, 1, 1);
//for lighting you must use standard material
const meterial = new THREE.MeshStandardMaterial({color: 0xdb0f24});
//const meterial = new THREE.MeshBasicMaterial({color: 0xdb0f24, wireframe: true});
const cube = new THREE.Mesh(geometry, meterial);
scene.add(cube);

const faceloader = new THREE.TextureLoader().load('portrait.jpg')
const myfaceonabox = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({map: faceloader})
)
myfaceonabox.position.set(0,0,0)
scene.add(myfaceonabox)

//this puts light in the scene and position and stuff 
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(0,2,0)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointlight)
//scene.add(lightHelper)

camera.position.z = 5;

const sexymantex = new THREE.TextureLoader().load('https://images.nightcafe.studio/jobs/qTqpq1U3rKMx1Xj4qiXJ/qTqpq1U3rKMx1Xj4qiXJ--1--aezkk.jpg?tr=w-1600,c-at_max')
scene.background = sexymantex;

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;    
    myfaceonabox.rotation.z += 0.01;
    myfaceonabox.rotation.x += 0.01;

	renderer.render( scene, camera );
}
animate();

function addstar(){
    const Stargeom = new THREE.SphereGeometry(0.25,24,24);
    const StarMeterial = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(Stargeom, StarMeterial);

    const [x, y , z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x, y , z);
    scene.add(star)
}
Array(200).fill().forEach(addstar)