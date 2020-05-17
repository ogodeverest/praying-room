import {
  Group,
  Shape,
  MeshBasicMaterial,
  Mesh,
  Object3D,
  ExtrudeGeometry,
  CircleGeometry,
  MeshStandardMaterial,
} from 'three';
import geometricGlowMesh from './effects/threex.geometricglowmesh';
import addAtmosphereMaterial2DatGui from './effects/threex.atmospherematerialdatgui';
import CrossLight from '../crossLight';
import * as dat from 'dat.gui';

export default class Cross extends Group {
  name = 'cross';

  constructor() {
    super();

    const crossOrbit = new Object3D();
    const crossShape = this.generateCrossShape(4);

    this.crossMesh = this.generateExtrudeGeometry(crossShape);
    this.crossMesh.scale.set(1.4, 1.4, 1.4);
    this.crossMesh.receiveShadow = true;
    this.addGlowMesh(this.crossMesh);

    this.crossLight = new CrossLight();

    crossOrbit.add(this.crossMesh);
    crossOrbit.add(this.crossLight);

    this.position.set(0, 0, 0);
    this.rotation.z = Math.PI / -2;
    this.add(crossOrbit);
  }

  generateExtrudeGeometry(shape) {
    const extrudeSettings = {
      steps: 1,
      depth: 0,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 1,
    };

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    const material = new MeshBasicMaterial({ color: 0xff69b4 });
    const mesh = new Mesh(geometry, material);
    return mesh;
  }

  generateCrossShape(length = 15) {
    const width = length * 0.06;

    const divisionOne = 0.22;
    const divisionTwo = 0.276;
    const leftArmWidth = -length * 0.22;
    const rightArmWidth = length * 0.22 + width;

    const crossShape = new Shape();
    crossShape.moveTo(0, 0);
    crossShape.lineTo(length * divisionOne, 0);
    crossShape.lineTo(length * divisionOne, leftArmWidth);
    crossShape.lineTo(
      (length * (divisionTwo + divisionOne)) / 2,
      leftArmWidth - width,
    );

    crossShape.lineTo(length * divisionTwo, leftArmWidth);
    crossShape.lineTo(length * divisionTwo, 0);

    crossShape.lineTo(length, 0);
    crossShape.lineTo(length, width);
    crossShape.lineTo(length * divisionTwo, width);
    crossShape.lineTo(length * divisionTwo, rightArmWidth);
    crossShape.lineTo(
      (length * (divisionTwo + divisionOne)) / 2,
      rightArmWidth + width,
    );
    crossShape.lineTo(length * divisionOne, rightArmWidth);
    crossShape.lineTo(length * divisionOne, width);

    crossShape.lineTo(0, width);
    crossShape.lineTo(-0.5, width / 2);
    crossShape.lineTo(0, 0);

    return crossShape;
  }

  addGlowMesh(crossMesh) {
    const glowMesh = geometricGlowMesh(crossMesh);
    crossMesh.add(glowMesh.object3d);

    const insideUniforms = glowMesh.insideMesh.material.uniforms;
    insideUniforms.glowColor.value.set(0xf41f9c);

    const outsideUniforms = glowMesh.outsideMesh.material.uniforms;
    outsideUniforms.glowColor.value.set(0xae0306);

    // var datGUI = new dat.GUI();
    // addAtmosphereMaterial2DatGui(glowMesh.insideMesh.material, datGUI);
    // addAtmosphereMaterial2DatGui(glowMesh.outsideMesh.material, datGUI);
  }
}
