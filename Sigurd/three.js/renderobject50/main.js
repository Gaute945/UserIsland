//importerer three.js som THREE
import * as THREE from 'three';
//scene lager en scene
const scene = new THREE.Scene();
//camera lager et camera med perspectivet 90 fov og størelse
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 );

//lager en webglrenderer i koden som blir kaldt ut som renderer
const renderer = new THREE.WebGLRenderer();
//renderer størelse
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );



//
const textureLoad = new THREE.TextureLoader().load('mapofplace.jpg')
const boksmap = new THREE.Mesh(
    new THREE.BoxGeometry(23,10,0),
    new THREE.MeshBasicMaterial({map: textureLoad})
)
scene.add(boksmap)
boksmap.position.set(0,0,0)



//geometry og material er det cube bruker til å bli cube utsende 
const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const material = new THREE.MeshBasicMaterial( { color: 0xFF2D00} );
//

//numcube er kor mangen cubes eg vil rendere i siden
const numcube =(THREE.MathUtils.randFloat(1,300)) 
//for så lange i er mindre en numcude lager den fleire cubes
for (let i = 0; i < numcube; i++){
    const cube = new THREE.Mesh( geometry, material );
    
    let xPos = THREE.MathUtils.randFloat(7.5, -7.5);
    let yPos = THREE.MathUtils.randFloat(3.2, -3.2); 

    cube.position.set(xPos, yPos, 0);
    scene.add(cube)
    
}

/* const numtri =(THREE.MathUtils.randFloat(1,100)) 
//for så lange i er mindre en numcude lager den fleire cubes
for (let i = 0; i < numtri; i++){
    const triangle = new THREE.Mesh( geometry, material );
    
    let xPos = THREE.MathUtils.randFloat(7.5, -7.5);
    let yPos = THREE.MathUtils.randFloat(3.2, -3.2); 

    cube.position.set(xPos, yPos, 0);
    scene.add(trian)
    
} */


camera.position.z = 6;
camera.position.y = -5
camera.rotation.x = 0.6;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
    cube.rotateY(0.01)
    cube.rotateX(0.01)
}
animate();

