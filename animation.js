import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function animateScene(
  snowflakes,
  maxPlaneRotationZ,
  maxPlaneRotationX,
  maxPlaneRotationY,
  plane,
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
  renderer
) {
  delta = clock.getDelta();

  // OrbitControls update
  controls.update(delta);

  const angleToCamera = Math.atan2(
    camera.position.x - plane.position.x,
    camera.position.z - plane.position.z
  );

  plane.rotation.y = angleToCamera;

  // Rotate the snowflakes
  snowflakes.rotation.y += 0.001;

  // plane.lookAt(camera.position);

  // // Ensure the rotation stays within the defined limits
  // plane.rotation.x = Math.max(-maxPlaneRotationX, Math.min(maxPlaneRotationX, plane.rotation.x));
  // plane.rotation.y = Math.max(-maxPlaneRotationY, Math.min(maxPlaneRotationY, plane.rotation.y));
  // plane.rotation.z = Math.max(-maxPlaneRotationZ, Math.min(maxPlaneRotationZ, plane.rotation.z));

  /* function animate(aa) {
      for (let i = 0; i < aa.length; i++) {
        aa[i].position.x += speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
        aa[i].position.y += speedsNo[i] * Math.sin(rotationsNo[i]) * delta;
    
        if (animateNo[i].position.x > Rx || animateNo[i].position.x < Lx || animateNo[i].position.y > maxy || animateNo[i].position.y < miny
        ) {
          animateNo[i].position.x = Math.min(Rx, Math.max(Lx, animateNo[i].position.x));
          animateNo[i].position.y = Math.min(maxy, Math.max(miny, animateNo[i].position.y));
    
          // Change direction and slightly rotate
          speedsNo[i] *= -1;
          rotationsNo[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
    
        }
      }
    } */

  // sweden animation
  for (let i = 0; i < animateSe.length; i++) {
    animateSe[i].position.x += speedsSe[i] * Math.cos(rotationsSe[i]) * delta;
    animateSe[i].position.y += speedsSe[i] * Math.sin(rotationsSe[i]) * delta;

    if (
      animateSe[i].position.x > Rx ||
      animateSe[i].position.x < Lx ||
      animateSe[i].position.y > maxy ||
      animateSe[i].position.y < miny
    ) {
      animateSe[i].position.x = Math.min(
        Rx,
        Math.max(Lx, animateSe[i].position.x)
      );
      animateSe[i].position.y = Math.min(
        maxy,
        Math.max(miny, animateSe[i].position.y)
      );

      // Change direction and slightly rotate
      speedsSe[i] *= -1;
      rotationsSe[i] += THREE.MathUtils.randFloat(-Math.PI / 3, Math.PI / 3); // Rotate between -45 and 45 degrees
    }
  }

  // Norway animation
  for (let i = 0; i < animateNo.length; i++) {
    animateNo[i].position.x += speedsNo[i] * Math.cos(rotationsNo[i]) * delta;
    animateNo[i].position.y += speedsNo[i] * Math.sin(rotationsNo[i]) * delta;

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
  }

  // denmark animation
  for (let i = 0; i < animateDk.length; i++) {
    animateDk[i].position.x += speedsDk[i] * Math.cos(rotationsDk[i]) * delta;
    animateDk[i].position.y += speedsDk[i] * Math.sin(rotationsDk[i]) * delta;

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
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  camera.lookAt(scene.position);
  renderer.render(scene, camera);
  requestAnimationFrame(() =>
    animateScene(
      snowflakes,
      maxPlaneRotationZ,
      maxPlaneRotationX,
      maxPlaneRotationY,
      plane,
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
      renderer
    )
  );
}
