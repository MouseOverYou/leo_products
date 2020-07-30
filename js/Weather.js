let skyboxMaterial, skybox
function CreateSky(scene) {
  // Sky material
  skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
  skyboxMaterial.backFaceCulling = false;
  //skyboxMaterial._cachedDefines.FOG = true;

  // Sky mesh (box)
  skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
  skybox.material = skyboxMaterial;



  window.addEventListener("keydown", function (evt) {
    switch (evt.keyCode) {
      case 49: ChangeSky("material.inclination", skyboxMaterial.inclination, 0); break; // 1
      case 50: ChangeSky("material.inclination", skyboxMaterial.inclination, -0.4); break; // 2
      case 51: ChangeSky("material.inclination", skyboxMaterial.inclination, -0.5); break; // 2

      case 52: ChangeSky("material.luminance", skyboxMaterial.luminance, 0.1); break; // 4
      case 53: ChangeSky("material.luminance", skyboxMaterial.luminance, 1.0); break; // 5

      case 54: ChangeSky("material.turbidity", skyboxMaterial.turbidity, 200); break; // 6
      case 55: ChangeSky("material.turbidity", skyboxMaterial.turbidity, 5); break; // 7

      case 56: ChangeSky("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50); break; // 8
      case 57: ChangeSky("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 0); break;  // 9
      default: break;
    }
  });

  // Set to Day
  ChangeSky("material.inclination", skyboxMaterial.inclination, 0);

}

/*
	* Keys:
    * - 1: Day
    * - 2: Afternoon
	* - 3: Evening
	* - 4: Increase Luminance
	* - 5: Decrease Luminance
	* - 6: Increase Turbidity
	* - 7: Decrease Turbidity
    * - 8: Move horizon to -50
    * - 9: Restore horizon to 0
	*/
function ChangeSky(property, from, to) {
  var keys = [
    { frame: 0, value: from },
    { frame: 100, value: to }
  ];

  var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
  animation.setKeys(keys);

  scene.stopAnimation(skybox);
  scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
};

// utility
window.random = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let lightningIsHapenning = false
let myConfig, spriteManagerSpark
function MakeLightningSystem(config) {
  //var spriteManagerSpark = new BABYLON.SpriteManager("Lightning Sprites", "https://i.imgur.com/veoNWOM.png", 100, { width: 54, height: 184 }, config.scene);
  spriteManagerSpark = new BABYLON.SpriteManager("Lightning Sprites", "assets/Lightning_02.png", 100, { width: 4096 / 10, height: 2048 }, config.scene);
  myConfig = config
}

async function SpawnLightningBolt() {
  var spark = new BABYLON.Sprite("Lightning", spriteManagerSpark);
  spark.playAnimation(0, 8, false, 60);
  spark.height = myConfig.height;
  spark.width = myConfig.width;

  spark.position = new BABYLON.Vector3(random(myConfig.min.x, myConfig.max.x), random(myConfig.min.y, myConfig.max.y), random(myConfig.min.z, myConfig.max.z));

  //kill lightning
  setTimeout(function () {
    spark.dispose();
  }, 8 * 60);

  //create new lightning
  if (lightningIsHapenning) {
    setTimeout(function () {
      SpawnLightningBolt();
    }, random(2 * 60, 8 * 60));
  }

}