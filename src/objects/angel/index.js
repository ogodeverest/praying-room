import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Angel extends Group {
  name = 'angel';

  constructor(manager) {
    super();
    this.loadModel(manager);
  }

  loadModel = (manager) => {
    const url =
      'https://raw.githubusercontent.com/ogodeverest/praying-room/master/src/objects/angel/object/scene.gltf';

    const loader = new GLTFLoader(manager);

    loader.load(url, (gltf) => {
      this.add(gltf.scene);
    });

    this.scale.set(1.8, 1.8, 1.8);
    this.rotation.y = Math.PI;
  };
}
