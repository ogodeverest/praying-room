import * as THREE from 'three';
import { Group, Object3D, PlaneBufferGeometry, Color, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import pillarsGltf from './object/scene.gltf';
import particleFire from 'three-particle-fire';
particleFire.install({ THREE: THREE });

export default class Pillars extends Group {
  name = 'pillars';
  then = 0;
  delta = 0;
  constructor(manager) {
    super();
    this.createFire();
    this.loadModel(manager);
  }

  loadModel = (manager) => {
    const loader = new GLTFLoader(manager);

    loader.load(pillarsGltf, (gltf) => {
      const pillarRight = new Object3D();
      pillarRight.add(gltf.scene);
      pillarRight.position.x = 6;
      pillarRight.add(this.fire);
      const box = new Box3().setFromObject(pillarRight);
      this.fire.position.y = box.max.y - box.min.y;
      const pillarLeft = pillarRight.clone();
      pillarLeft.position.x = -6;
      this.add(pillarLeft, pillarRight);
    });
  };

  createFire = () => {
    const fireRadius = 0.5;
    const fireHeight = 3;
    const particleCount = 800;
    const geometry = new particleFire.Geometry(
      fireRadius,
      fireHeight,
      particleCount,
    );
    const material = new particleFire.Material({ color: 'red' });
    material.setPerspective(45, window.innerHeight);
    this.fire = new THREE.Points(geometry, material);
  };
  animatePillars = (now) => {
    this.delta = now - this.then;
    this.then = now;
    this.fire.material.update(this.delta);
  };
}
