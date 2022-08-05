import {
  Group,
  Math as MathUtils,
  AudioLoader,
  Audio,
  LoadingManager,
} from 'three';
import Room from './room';
import BasicLights from './Lights';
import radiant from '../audio/radiant.mp3';

export default class SeedScene extends Group {
  constructor(listener) {
    super();
    this.createLoadingManager();
    this.room = new Room(this.manager);
    this.lights = new BasicLights();
    this.add(this.room);
    this.loadAudio(listener, this.manager);
  }

  loadAudio = (listener, manager) => {
    const sound = new Audio(listener);

    const audioLoader = new AudioLoader(manager);
    audioLoader.load(radiant, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(2);
      sound.play();
    });
  };

  createLoadingManager = () => {
    this.manager = new LoadingManager();

    this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      const loaderBar = document.querySelector('.loading__indicator');
      loaderBar.style.transform = `scaleX(${itemsLoaded / itemsTotal})`;

      if (itemsLoaded / itemsTotal === 1) {
        setTimeout(() => {
          document.querySelector('.loading').style.display = 'none';
        }, 2000);
      }
    };
  };
}
