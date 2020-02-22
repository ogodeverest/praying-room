import {
  Group,
  Object3D,
  BoxGeometry,
  MeshPhongMaterial,
  BackSide,
  Mesh
} from "three";
import Cross from "../cross";
import Angel from "../angel";

export default class Room extends Group {
  constructor() {
    super();

    this.name = "room";

    const roomOrbit = new Object3D();

    const roomSize = 20;
    const roomGeometry = new BoxGeometry(roomSize, roomSize, roomSize * 2);
    const roomMaterial = new MeshPhongMaterial({
      color: "#A9A9A9",
      side: BackSide
    });
    const roomMesh = new Mesh(roomGeometry, roomMaterial);
    roomMesh.receiveShadow = true;
    roomMesh.castShadow = true;

    this.cross = new Cross();
    this.cross.position.set(0, roomSize / 6, -roomSize + 2);

    this.angel = new Angel();

    this.angel.position.set(0, -roomSize / 2 + 2, -roomSize / 2);

    roomOrbit.add(roomMesh);
    roomOrbit.add(this.cross);
    roomOrbit.add(this.angel);
    this.add(roomOrbit);
  }
}
