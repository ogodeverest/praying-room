import { Group, DirectionalLight } from "three";

export default class BasicLights extends Group {
  constructor(...args) {
    super(...args);

    const dirLightOne = new DirectionalLight(0xffffff, 1);
    dirLightOne.position.set(5, 1, 2);
    dirLightOne.target.position.set(0, 0, 0);

    const dirLightTwo = new DirectionalLight(0xffffff, 1);
    dirLightTwo.position.set(-5, 1, 2);
    dirLightTwo.target.position.set(0, 1, 0);

    this.add(dirLightOne);
  }
}
