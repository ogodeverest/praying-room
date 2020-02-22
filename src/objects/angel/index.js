import { Group, LoadingManager } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Angel extends Group {
  constructor() {
    super();
    this.name = "angel";
    this.url =
      "https://raw.githubusercontent.com/ogodeverest/praying-room/master/src/objects/angel/object/scene.gltf";

    const manager = new LoadingManager();

    manager.onProgress = function(url, itemsLoaded, itemsTotal) {
      // const width = (itemsLoaded / itemsTotal) * 100 + "%";
      const loaderBar = document.querySelector(".loading__indicator");
      loaderBar.style.transform = `scaleX(${itemsLoaded / itemsTotal})`;
    
      if (itemsLoaded / itemsTotal === 1) {
        loaderBar.style.transform = `scaleX(0)`;
        loaderBar.style.transformOrigin = `right`;
        setTimeout(()=>{
        document.querySelector(".loading").style.display = "none";
        },200)
       
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
