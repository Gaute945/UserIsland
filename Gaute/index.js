import * as THREE from 'three';

camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xbf00ff } );
const lmaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const cube = new THREE.Mesh( geometry, material );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const lgeometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );

scene.add( line );
//scene.add( cube );

camera.position.z = 5;
camera.position.x = 0;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera);
}

animate();