import { Group, PointLight } from "three";
import * as dat from "dat.gui";
export default class CrossLight extends Group {
  constructor() {
    super();

    const color = 0xaa0206;
    const intensity = 1.86;
    this.light = new PointLight(color, intensity);
    this.light.castShadow = true;
    this.light.distance = 18;

    // const gui = new dat.GUI();
    // gui.add(this.light, "intensity", 0, 2, 0.01).listen();
    // gui.add(this.light, "distance", 0, 40).listen();

    this.add(this.light);
  }
}
