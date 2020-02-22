import { Object3D, BackSide, Mesh, Color } from "three";
import dilateGeometry from "./threex.dilategeometry";
import createAtmosphereMaterial from "./threex.atmospherematerial";

const GeometricGlowMesh = function(mesh) {
  const object3d = new Object3D();

  let insideGeometry = mesh.geometry.clone();
  dilateGeometry(insideGeometry, 0.01);
  let insideMaterial = createAtmosphereMaterial();
  insideMaterial.uniforms.glowColor.value = new Color("cyan");
  insideMaterial.uniforms.coeficient.value = 1.1;
  insideMaterial.uniforms.power.value = 1.4;
  const insideMesh = new Mesh(insideGeometry, insideMaterial);
  object3d.add(insideMesh);

  let outsideGeometry = mesh.geometry.clone();
  dilateGeometry(outsideGeometry, 0.1);
  let outsideMaterial = createAtmosphereMaterial();
  outsideMaterial.uniforms.glowColor.value = new Color("cyan");
  outsideMaterial.uniforms.coeficient.value = 0.1;
  outsideMaterial.uniforms.power.value = 1.2;
  outsideMaterial.side = BackSide;
  const outsideMesh = new Mesh(outsideGeometry, outsideMaterial);
  object3d.add(outsideMesh);

  // expose a few variable
  return { outsideMesh, insideMesh, object3d };
};
export default GeometricGlowMesh;
