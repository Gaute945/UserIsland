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
  wallBBF
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

  // sweden animation
  for (let i = 0; i < animateSe.length; i++) {
	boundingSe[i]
	  .copy(animateSe[i].geometry.boundingBox)
	  .applyMatrix4(animateSe[i].matrixWorld);
  
	if (boundingSe[i].intersectsSphere(wallBB)) {
	  animateSe[i].position.x += speedsSe[i] * Math.cos(rotationsSe[i]) * delta;
	  animateSe[i].position.y += speedsSe[i] * Math.sin(rotationsSe[i]) * delta;
	} else {
	  animateSe[i].position.x -= speedsSe[i] * Math.cos(rotationsSe[i]) * delta;
	  animateSe[i].position.y -= speedsSe[i] * Math.sin(rotationsSe[i]) * delta;
	  rotationsSe[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
	}
  }
  

  
    // Norway animation
	for (let i = 0; i < animateNo.length; i++) {
		boundingNo[i]
		  .copy(animateNo[i].geometry.boundingBox)
		  .applyMatrix4(animateNo[i].matrixWorld);
	  
		if (boundingNo[i].intersectsSphere(wallBBN)) {
		  animateNo[i].position.x += speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
		  animateNo[i].position.y += speedsNo[i] * Math.sin(rotationsNo[i]) * delta;
		} else {
		  animateNo[i].position.x -= speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
		  animateNo[i].position.y -= speedsNo[i] * Math.sin(rotationsNo[i]) * delta;
		  rotationsNo[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
		}
	  }
    // finish animation
	for (let i = 0; i < animateFi.length; i++) {
		boundingFi[i]
		  .copy(animateFi[i].geometry.boundingBox)
		  .applyMatrix4(animateFi[i].matrixWorld);
	  
		if (boundingFi[i].intersectsSphere(wallBBF)) {
		  animateFi[i].position.x += speedsFi[i] * Math.cos(rotationsFi[i]) * delta;
		  animateFi[i].position.y += speedsFi[i] * Math.sin(rotationsFi[i]) * delta;
		} else {
		  animateFi[i].position.x -= speedsFi[i] * Math.cos(rotationsFi[i]) * delta;
		  animateFi[i].position.y -= speedsFi[i] * Math.sin(rotationsFi[i]) * delta;
		  rotationsFi[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
		}
	  }
	      // Danish animation
	for (let i = 0; i < animateDk.length; i++) {
		boundingDk[i]
		  .copy(animateDk[i].geometry.boundingBox)
		  .applyMatrix4(animateDk[i].matrixWorld);
	  
		if (boundingDk[i].intersectsSphere(wallBBD)) {
		  animateDk[i].position.x += speedsDk[i] * Math.cos(rotationsDk[i]) * delta;
		  animateDk[i].position.y += speedsDk[i] * Math.sin(rotationsDk[i]) * delta;
		} else {
		  animateDk[i].position.x -= speedsDk[i] * Math.cos(rotationsDk[i]) * delta;
		  animateDk[i].position.y -= speedsDk[i] * Math.sin(rotationsDk[i]) * delta;
		  rotationsDk[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
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
	  wallBBF
    )
  );
}
