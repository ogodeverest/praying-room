/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, PerspectiveCamera, Scene, Vector3 } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import SeedScene from "./objects/Scene.js";

const scene = new Scene();
const camera = new PerspectiveCamera(45, 2, 0.1, 100);
const renderer = new WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
const seedScene = new SeedScene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
// scene
scene.add(seedScene);

// camera
camera.position.set(0, 0, 8.5);

// renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

// render loop
const onAnimationFrameHandler = timeStamp => {
  controls.update();
  renderer.render(scene, camera);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener("resize", windowResizeHanlder);

// dom
document.body.style.margin = 0;
document.body.style.width = "100%";
document.body.style.height = "100%";
//loader
createLoaderScreen();
//renderer
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.display = "block";

document.body.appendChild(renderer.domElement);

function createLoaderScreen() {
  const loaderScreen = document.createElement("div");
  loaderScreen.classList.add("loading");
  loaderScreen.style.position = "fixed";
  loaderScreen.style.width = "100%";
  loaderScreen.style.height = "100%";
  loaderScreen.style.backgroundColor = "black";
  loaderScreen.style.display = "flex";
  loaderScreen.style.justifyContent = "center";
  loaderScreen.style.alignItems = "center";
  document.body.appendChild(loaderScreen);

  const loadingBar = document.createElement("div");
  loadingBar.classList.add("loading__bar");
  loadingBar.style.width = "500px";
  loadingBar.style.height = "5px";
  loadingBar.style.backgroundColor = "#121212";
  loaderScreen.appendChild(loadingBar);

  const loadingIndicator = document.createElement("div");
  loadingIndicator.classList.add("loading__indicator");
  loadingIndicator.style.height = "100%";
  loadingIndicator.style.width = "100%";
  loadingIndicator.style.transform = "scaleX(0)";
  loadingIndicator.style.transition = ".5s transform";
  loadingIndicator.style.transformOrigin = "left";
  loadingIndicator.style.backgroundColor = "#f41f9c";
  loadingIndicator.style.boxShadow = `0 0 10px #ae0306, 0 0 20px #ae0306, 0 0 30px #ae0306, 0 0 40px #ae0306, 0 0 70px #ae0306, 0 0 80px #ae0306, 0 0 100px #ae0306, 0 0 150px #ae0306`;

  loadingBar.appendChild(loadingIndicator);
}
