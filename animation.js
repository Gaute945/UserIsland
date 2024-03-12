import * as THREE from "three";
export function animateScene(
  snowflakes,
  clock,
  animateSe,
  animateNo,
  animateDk,
  animateFi,
  speedsSe,
  speedsNo,
  speedsDk,
  speedsFi,
  rotationsSe,
  rotationsNo,
  rotationsDk,
  rotationsFi,
  controls,
  delta,
  camera,
  scene,
  renderer,
  BoundingBArray,
  wallMesh,
  wallBB,
  wallBBN,
  wallBBD,
  wallBBF,
  cylinder,
) {
  delta = clock.getDelta();
  // OrbitControls update
  controls.update(delta);

  // Rotate the snowflakes
  snowflakes.rotation.y += 0.001;
  const boundingSe = [];
  const boundingDk = [];
  const boundingNo = [];
  const boundingFi = [];
  for (let i = 0; i < animateSe.length; i++) {
    boundingSe.push(BoundingBArray[i]);
  }
  for (let i = 0; i < animateNo.length; i++) {
    boundingNo.push(BoundingBArray[i]);
  }
  for (let i = 0; i < animateDk.length; i++) {
    boundingDk.push(BoundingBArray[i]);
  }
  for (let i = 0; i < animateFi.length; i++) {
    boundingFi.push(BoundingBArray[i]);
  }
  //




// sweden animation
  for (let i = 0; i < animateSe.length; i++) {
    boundingSe[i]
      .copy(animateSe[i].geometry.boundingBox)
      .applyMatrix4(animateSe[i].matrixWorld);
      const speedDelta = speedsSe[i] * delta;
    if (boundingSe[i].intersectsSphere(wallBB)) {
      animateSe[i].position.x += speedsSe[i] * Math.cos(rotationsSe[i]) * delta;
      animateSe[i].position.y += speedsSe[i] * Math.sin(rotationsSe[i]) * delta;
    } else {
      animateSe[i].position.x -= speedDelta * Math.cos(rotationsSe[i]);
      animateSe[i].position.y -= speedDelta * Math.sin(rotationsSe[i]);
      rotationsSe[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1);
    }
    let distance = animateSe[i].position.distanceTo(wallBB.center);
    let radius = wallBB.radius + 0.5
    if(distance > radius){
      animateSe[i].position.set(3.5,4.5,0)
    }

}

  
    // Norway animation
	for (let i = 0; i < animateNo.length; i++) {
		boundingNo[i]
		  .copy(animateNo[i].geometry.boundingBox)
		  .applyMatrix4(animateNo[i].matrixWorld);
      const speedDelta = speedsNo[i] * delta;
		if (boundingNo[i].intersectsSphere(wallBBN)) {
		  animateNo[i].position.x += speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
		  animateNo[i].position.y += speedsNo[i] * Math.sin(rotationsNo[i]) * delta;
		} else {
		  animateNo[i].position.x -= speedDelta * Math.cos(rotationsNo[i])
      animateNo[i].position.y -= speedDelta * Math.sin(rotationsNo[i])
		  rotationsNo[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
		}
    let distance = animateNo[i].position.distanceTo(wallBBN.center);
    let radius = wallBBN.radius + 0.5
    if(distance > radius){
      animateNo[i].position.set(-5, 4.5, 0)
    }
	  }
    // finish animation
	for (let i = 0; i < animateFi.length; i++) {
		boundingFi[i]
		  .copy(animateFi[i].geometry.boundingBox)
		  .applyMatrix4(animateFi[i].matrixWorld);
      const speedDelta = speedsFi[i] * delta;
	  
		if (boundingFi[i].intersectsSphere(wallBBF)) {
		  animateFi[i].position.x += speedsFi[i] * Math.cos(rotationsFi[i]) * delta;
		  animateFi[i].position.y += speedsFi[i] * Math.sin(rotationsFi[i]) * delta;
		} else {
		  animateFi[i].position.x -= speedDelta * Math.cos(rotationsFi[i])
		  animateFi[i].position.y -= speedDelta * Math.sin(rotationsFi[i])
		  rotationsFi[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
		}
    let distance = animateFi[i].position.distanceTo(wallBBF.center);
    let radius = wallBBF.radius + 0.5
    if(distance > radius){
      animateFi[i].position.set(-5,-5.3,0)
    }
	  }
	      // Danish animation
	for (let i = 0; i < animateDk.length; i++) {
		boundingDk[i]
		  .copy(animateDk[i].geometry.boundingBox)
		  .applyMatrix4(animateDk[i].matrixWorld);
      const speedDelta = speedsDk[i] * delta;
	  
		if (boundingDk[i].intersectsSphere(wallBBD)) {
		  animateDk[i].position.x += speedsDk[i] * Math.cos(rotationsDk[i]) * delta;
		  animateDk[i].position.y += speedsDk[i] * Math.sin(rotationsDk[i]) * delta;
		} else {
		  animateDk[i].position.x -= speedDelta * Math.cos(rotationsDk[i]);
		  animateDk[i].position.y -= speedDelta * Math.sin(rotationsDk[i]);
		  rotationsDk[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
		}
    let distance = animateDk[i].position.distanceTo(wallBBD.center);
    let radius = wallBBD.radius + 0.5
    if(distance > radius){
      animateDk[i].position.set(5, -4, 0)
    }
	  }
  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  renderer.render(scene, camera);
  requestAnimationFrame(() =>
    animateScene(
      snowflakes,
      clock,
      animateSe,
      animateNo,
      animateDk,
      animateFi,
      speedsSe,
      speedsNo,
      speedsDk,
      speedsFi,
      rotationsSe,
      rotationsNo,
      rotationsDk,
      rotationsFi,
      controls,
      delta,
      camera,
      scene,
      renderer,
      BoundingBArray,
      wallMesh,
      wallBB,
	  wallBBN,
	  wallBBD,
	  wallBBF,
    cylinder,
    )
  );
}
