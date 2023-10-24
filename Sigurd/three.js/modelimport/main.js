

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

//this puts light in the scene and position and stuff 
const pointlight = new THREE.PointLight(0xffffff)
pointlight.position.set(0,2,0)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointlight, )

const lightHelper = new THREE.PointLightHelper(pointlight)
scene.add(lightHelper)

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();
