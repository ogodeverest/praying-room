/**
 * entry.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */

import { WebGLRenderer, PerspectiveCamera, Scene, AudioListener } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  GodRaysEffect,
  EffectPass,
  KernelSize,
  EffectComposer,
  RenderPass,
} from 'postprocessing/build/postprocessing';
import gsap from 'gsap';
import SeedScene from './objects/Scene.js';
import logo from './images/logo.ico';
const scene = new Scene();
const camera = new PerspectiveCamera(35, 2, 0.1, 100);
camera.position.set(0, 10, 32);

const tl = gsap.timeline();

const renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.autoClear = false;
renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);
const listener = new AudioListener();
camera.add(listener);

const seedScene = new SeedScene(listener);
scene.add(seedScene);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const godRaysEffect = new GodRaysEffect(
  camera,
  seedScene.room.cross.crossMesh,
  {
    blurriness: 1,
    height: 480,
    kernelSize: KernelSize.SMALL,
    density: 0.96,
    decay: 0.92,
    weight: 0.5,
    exposure: 0.54,
    samples: 60,
    clampMax: 1.0,
  },
);

const pass = new EffectPass(camera, godRaysEffect);
pass.renderToScreen = true;
composer.addPass(pass);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.target.set(0, -3, 30);

animateCamera();
// scene

// render loop
let then = 0;
const onAnimationFrameHandler = (timeStamp) => {
  timeStamp *= 0.001;
  const deltaTime = timeStamp - then;
  then = timeStamp;
  controls.update();
  composer.render(deltaTime);
  seedScene.update && seedScene.update(timeStamp);
  window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// resize
const windowResizeHanlder = () => {
  const { innerHeight, innerWidth } = window;
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;

  camera.updateProjectionMatrix();
};
windowResizeHanlder();
window.addEventListener('resize', windowResizeHanlder);

// dom
initDefaultStyles();
createLoaderScreen();
//renderer

document.body.appendChild(renderer.domElement);

function createLoaderScreen() {
  const loaderScreen = document.createElement('div');
  loaderScreen.classList.add('loading');
  loaderScreen.style.position = 'fixed';
  loaderScreen.style.width = '100%';
  loaderScreen.style.height = '100%';
  loaderScreen.style.backgroundColor = 'black';
  loaderScreen.style.display = 'flex';
  loaderScreen.style.justifyContent = 'center';
  loaderScreen.style.alignItems = 'center';
  document.body.appendChild(loaderScreen);

  const loadingBar = document.createElement('div');
  loadingBar.classList.add('loading__bar');
  loadingBar.style.width = '500px';
  loadingBar.style.height = '5px';
  loadingBar.style.backgroundColor = '#121212';
  loaderScreen.appendChild(loadingBar);

  const loadingIndicator = document.createElement('div');
  loadingIndicator.classList.add('loading__indicator');
  loadingIndicator.style.height = '100%';
  loadingIndicator.style.width = '100%';
  loadingIndicator.style.transform = 'scaleX(0)';
  loadingIndicator.style.transition = '.8s transform';
  loadingIndicator.style.transformOrigin = 'left';
  loadingIndicator.style.backgroundColor = '#f41f9c';
  loadingIndicator.style.boxShadow = `0 0 10px #ae0306, 0 0 20px #ae0306, 0 0 30px #ae0306, 0 0 40px #ae0306, 0 0 70px #ae0306, 0 0 80px #ae0306, 0 0 100px #ae0306, 0 0 150px #ae0306`;

  loadingBar.appendChild(loadingIndicator);

  const link = document.createElement('link');
  link.setAttribute('rel', 'icon');
  link.setAttribute('href', logo);
  document.getElementsByTagName('head')[0].appendChild(link);
}

function initDefaultStyles() {
  document.body.style.margin = 0;
  document.body.style.width = '100%';
  document.body.style.height = '100%';
  document.title = 'Praying Room';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
}

function animateCamera() {
  tl.to(controls.target, {
    duration: 18,
    y: 6,
    z: 0,
    ease: 'slow(0.7, 0.7, false)',
  }).to(
    camera.position,
    {
      duration: 20,
      z: 5,
      y: 10,
      x: 0,
      ease: 'slow(0.7, 0.7, false)',
    },
    '-=4',
  );
}
