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
  Lx,
  Rx,
  maxy,
  miny,
  camera,
  scene,
  renderer,
  BoundingBArray,
  wallMesh,
  wallBB,
  wallBBN
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
  
	if (boundingSe[i].intersectsBox(wallBB)) {
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
	  
		if (boundingNo[i].intersectsBox(wallBBN)) {
		  animateNo[i].position.x += speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
		  animateNo[i].position.y += speedsNo[i] * Math.sin(rotationsNo[i]) * delta;
		} else {
		  animateNo[i].position.x -= speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
		  animateNo[i].position.y -= speedsNo[i] * Math.sin(rotationsNo[i]) * delta;
		  rotationsNo[i] += THREE.MathUtils.randFloat(-Math.PI / 1, Math.PI / 1); // Rotate between -45 and 45 degrees
		}
	  }
/* 	for (let i = 0; i < animateNo.length; i++) {
		animateNo[i].position.x += speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
		animateNo[i].position.y += speedsNo[i] * Math.sin(rotationsNo[i]) * delta;

		//update position of bounding barrier
		boundingNo[i]
			.copy(animateNo[i].geometry.boundingBox)
			.applyMatrix4(animateNo[i].matrixWorld);
		if (
			animateNo[i].position.x > Rx ||
			animateNo[i].position.x < Lx ||
			animateNo[i].position.y > maxy ||
			animateNo[i].position.y < miny
		) {
			animateNo[i].position.x = Math.min(
				Rx,
				Math.max(Lx, animateNo[i].position.x)
			);
			animateNo[i].position.y = Math.min(
				maxy,
				Math.max(miny, animateNo[i].position.y)
			);

			// Change direction and slightly rotate
			speedsNo[i] *= -1;
			rotationsNo[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
		}
	} */
/*
	// denmark animation
	for (let i = 0; i < animateDk.length; i++) {
		animateDk[i].position.x += speedsDk[i] * Math.cos(rotationsDk[i]) * delta;
		animateDk[i].position.y += speedsDk[i] * Math.sin(rotationsDk[i]) * delta;
		
    //update position of bounding barrier
		boundingDk[i]
			.copy(animateDk[i].geometry.boundingBox)
			.applyMatrix4(animateDk[i].matrixWorld);
		if (
			animateDk[i].position.x > Rx ||
			animateDk[i].position.x < Lx ||
			animateDk[i].position.y > maxy ||
			animateDk[i].position.y < miny
		) {
			animateDk[i].position.y = Math.min(
				maxy,
				Math.max(miny, animateDk[i].position.y)
			);
			animateDk[i].position.x = Math.min(
				Rx,
				Math.max(Lx, animateDk[i].position.x)
			);

			// Change direction and slightly rotate
			speedsDk[i] *= -1;
			rotationsDk[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
		}
	}

	// finland animation
	for (let i = 0; i < animateFi.length; i++) {
		animateFi[i].position.x += speedsFi[i] * Math.cos(rotationsFi[i]) * delta;
		animateFi[i].position.y += speedsFi[i] * Math.sin(rotationsFi[i]) * delta;
		//update position of bounding barrier
		boundingFi[i]
			.copy(animateFi[i].geometry.boundingBox)
			.applyMatrix4(animateFi[i].matrixWorld);
		if (
			animateFi[i].position.x > Rx ||
			animateFi[i].position.x < Lx ||
			animateFi[i].position.y > maxy ||
			animateFi[i].position.y < miny
		) {
			animateFi[i].position.y = Math.min(
				maxy,
				Math.max(miny, animateFi[i].position.y)
			);
			animateFi[i].position.x = Math.min(
				Rx,
				Math.max(Lx, animateFi[i].position.x)
			);

			// Change direction and slightly rotate
			speedsFi[i] *= -1;
			rotationsFi[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
		}
	} */

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
      Lx,
      Rx,
      maxy,
      miny,
      camera,
      scene,
      renderer,
      BoundingBArray,
      wallMesh,
      wallBB,
	  wallBBN
    )
  );
}
