import { Group, Math as MathUtils } from "three";
import Room from "./room";
export default class SeedScene extends Group {
  constructor() {
    super();

    this.room = new Room();
    this.add(this.room);
  }

  update(time) {
    time *= 0.001;
    const speed = time / 10;

    this.room.cross.crossLight.light.distance = MathUtils.lerp(
      10,
      18,
      Math.abs(Math.sin(speed))
    );
    // this.rotation.y = timeStamp / 10000;
  }
}
