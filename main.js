import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// geometry
const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
//const cylGeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 ); 

// mesh materials
const basicMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//const cylMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );

// meshes
const cube = new THREE.Mesh( boxGeometry, basicMaterial );
//const cylinder = new THREE.Mesh( cylGeometry, cylMaterial ); scene.add( cylinder );

// scene
scene.add( cube );

// render
renderer.render( scene, camera );

camera.position.z = 5;
