import {
  Group,
  Object3D,
  BoxGeometry,
  MeshStandardMaterial,
  BackSide,
  Mesh,
  TextureLoader,
} from 'three';
import Cross from '../cross';
import Angel from '../angel';
import diffuseTexturePath from './textures4k/large_sandstone_blocks_01_diff_4k.jpg';
import normalTexturePath from './textures4k/large_sandstone_blocks_01_nor_4k.jpg';
import aoTexturePath from './textures4k/large_sandstone_blocks_01_ao_4k.jpg';
import disTexturePath from './textures4k/large_sandstone_blocks_01_disp_4k.jpg';
import roughTexturePath from './textures4k/large_sandstone_blocks_01_rough_4k.jpg';
export default class Room extends Group {
  name = 'room';
  constructor(manager) {
    super();
    this.createRoom(manager);
  }

  createRoom = (manager) => {
    const roomOrbit = new Object3D();
    const textureLoader = new TextureLoader(manager);
    const diffTexture = textureLoader.load(diffuseTexturePath);
    const normalTexture = textureLoader.load(normalTexturePath);
    const aoTexture = textureLoader.load(aoTexturePath);
    const dispTexture = textureLoader.load(disTexturePath);
    const roughTexture = textureLoader.load(roughTexturePath);
    const roomSize = 20;
    const roomGeometry = new BoxGeometry(roomSize, roomSize, roomSize * 2);
    const roomMaterial = new MeshStandardMaterial({
      color: '#A9A9A9',
      side: BackSide,
      map: diffTexture,
      normalMap: normalTexture,
      aoMap: aoTexture,
      displacementMap: dispTexture,
      roughnessMap: roughTexture,
    });
    const roomMesh = new Mesh(roomGeometry, roomMaterial);
    roomMesh.receiveShadow = true;
    roomMesh.castShadow = true;

    this.cross = new Cross();
    this.cross.position.set(0, roomSize / 6, -roomSize + 2);

    console.log(manager);
    this.angel = new Angel(manager);
    this.angel.position.set(0, -roomSize / 2 + 2, -roomSize / 2);

    roomOrbit.add(roomMesh);
    roomOrbit.add(this.cross);
    roomOrbit.add(this.angel);
    this.add(roomOrbit);
  };

  animateRoom = () => {};
}
