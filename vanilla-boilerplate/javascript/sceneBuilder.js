import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function buildScene() {
  //Canvas
  const refCanvas = document.querySelector("#canvas");

  const myCanvas = document.createElement("canvas");
  myCanvas.className = "webgl";
  document.querySelector("#app").appendChild(myCanvas);

  myCanvas.width = refCanvas.width;
  myCanvas.style.width = refCanvas.width / window.devicePixelRatio + "px";

  myCanvas.height = refCanvas.height;
  myCanvas.style.height = refCanvas.height / window.devicePixelRatio + "px";

  //Sizes
  const sizes = {
    width: refCanvas.width,
    height: refCanvas.height,
  };

  //Cursor
  const cursor = {
    x: 0,
    y: 0,
  };

  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = -(event.clientY / sizes.height - 0.5);
  });

  //Scene
  const scene = new THREE.Scene();

  //Object
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  );
  scene.add(mesh);

  //Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );

  camera.position.z = 30;
  camera.lookAt(mesh.position);
  scene.add(camera);

  //Controls
  const controls = new OrbitControls(camera, myCanvas);

  controls.enableDamping = true;
  // controls.target.y = 2
  // controls.update()

  //Renderer
  const renderer = new THREE.WebGLRenderer({
    myCanvas: myCanvas,
    // alpha: true,
  });
  renderer.setClearColor(0xffffff, 1);

  //Animate
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update Controls
    controls.update();
    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}
