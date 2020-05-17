import { Group, Math as MathUtils, LoadingManager } from 'three';
import Room from './room';
export default class SeedScene extends Group {
  constructor() {
    super();
    this.createLoadingManager();
    this.room = new Room(this.manager);
    this.add(this.room);
  }

  createLoadingManager = () => {
    this.manager = new LoadingManager();

    this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      const loaderBar = document.querySelector('.loading__indicator');
      loaderBar.style.transform = `scaleX(${itemsLoaded / itemsTotal})`;
      console.log(loaderBar.style.transform);

      if (itemsLoaded / itemsTotal === 1) {
        // loaderBar.style.transform = `scaleX(0)`;
        // loaderBar.style.transformOrigin = `right`;
        setTimeout(() => {
          document.querySelector('.loading').style.display = 'none';
        }, 2000);
      }
    };
  };

  update(time) {
    const speed = time / 10;

    this.room.animateRoom();
    // this.room.cross.crossLight.light.distance = MathUtils.lerp(
    //   10,
    //   18,
    //   Math.abs(Math.sin(speed))
    // );
  }
}
