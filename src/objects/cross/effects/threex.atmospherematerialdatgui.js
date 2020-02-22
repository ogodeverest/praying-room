/**
 * vendor.js framework definition
 * @type {Object}
 */

const addAtmosphereMaterial2DatGui = function(material, datGui) {
  datGui = datGui || new dat.GUI();
  const uniforms = material.uniforms;
  // options
  const options = {
    coeficient: uniforms["coeficient"].value,
    power: uniforms["power"].value,
    glowColor: "#" + uniforms.glowColor.value.getHexString(),
    presetFront: function() {
      options.coeficient = 0;
      options.power = 3.1;
      onChange();
    },
    presetBack: function() {
      options.coeficient = 0.04;
      options.power = 1.3;
      onChange();
    }
  };
  const onChange = function() {
    uniforms["coeficient"].value = options.coeficient;
    uniforms["power"].value = options.power;
    uniforms.glowColor.value.set(options.glowColor);
  };
  onChange();

  // config datGui
  datGui
    .add(options, "coeficient", 0.0, 2)
    .listen()
    .onChange(onChange);
  datGui
    .add(options, "power", 0.0, 5)
    .listen()
    .onChange(onChange);
  datGui
    .addColor(options, "glowColor")
    .listen()
    .onChange(onChange);
  datGui.add(options, "presetFront");
  datGui.add(options, "presetBack");
};

export default addAtmosphereMaterial2DatGui;
