import { Group, DirectionalLight } from 'three';

export default class BasicLights extends Group {
  name = 'Lights';
  constructor(...args) {
    super(...args);

    this.createDirLight(5, 1, 2);
    this.createDirLight(-5, 1, 2);
    this.add(dirLightOne);
  }

  createDirLight = (...pos) => {
    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLightTwo.position.set(...pos);
    dirLightTwo.target.position.set(0, 1, 0);
    this.add(dirLight);
  };
}
