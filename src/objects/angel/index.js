import { Group, LoadingManager } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Angel extends Group {
  constructor() {
    super();
    this.name = "angel";
    this.url =
      "https://github.com/ogodeverest/praying-room/blob/master/src/objects/angel/object/scene.gltf";

    const manager = new LoadingManager();

    manager.onProgress = function(url, itemsLoaded, itemsTotal) {
      // const width = (itemsLoaded / itemsTotal) * 100 + "%";
      const loader = document.querySelector(".loading__indicator");
      loader.style.transform = `scaleX(${itemsLoaded / itemsTotal})`;
      if (itemsLoaded / itemsTotal === 1) {
        document.querySelector(".loading").style.display = "none";
      }
    };

    const loader = new GLTFLoader(manager);

    loader.load(this.url, gltf => {
      this.add(gltf.scene);
    });

    this.scale.set(1.8, 1.8, 1.8);
    this.rotation.y = Math.PI;
  }
}
