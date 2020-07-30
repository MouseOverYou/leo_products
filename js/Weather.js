function CreateSky(scene){
    // Sky material
	var skyboxMaterial = new BABYLON.SkyMaterial("skyMaterial", scene);
    skyboxMaterial.backFaceCulling = false;
	//skyboxMaterial._cachedDefines.FOG = true;

	// Sky mesh (box)
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, scene);
    skybox.material = skyboxMaterial;
	
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
	var setSkyConfig = function (property, from, to) {
		var keys = [
            { frame: 0, value: from },
			{ frame: 100, value: to }
        ];
		
		var animation = new BABYLON.Animation("animation", property, 100, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);
		
		scene.stopAnimation(skybox);
		scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
	};
	
	window.addEventListener("keydown", function (evt) {
		switch (evt.keyCode) {
			case 49: setSkyConfig("material.inclination", skyboxMaterial.inclination, 0); break; // 1
            case 50: setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.4); break; // 2
            case 51: setSkyConfig("material.inclination", skyboxMaterial.inclination, -0.5); break; // 2

			case 52: setSkyConfig("material.luminance", skyboxMaterial.luminance, 0.1); break; // 4
			case 53: setSkyConfig("material.luminance", skyboxMaterial.luminance, 1.0); break; // 5
			
			case 54: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 200); break; // 6
			case 55: setSkyConfig("material.turbidity", skyboxMaterial.turbidity, 5); break; // 7
			
            case 56: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 50); break; // 8
            case 57: setSkyConfig("material.cameraOffset.y", skyboxMaterial.cameraOffset.y, 0); break;  // 9
			default: break;
		}
    });
	
	// Set to Day
	setSkyConfig("material.inclination", skyboxMaterial.inclination, 0);

}
// utility
window.random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

function MakeLightningSystem(config) {
    //var spriteManagerSpark = new BABYLON.SpriteManager("Lightning Sprites", "https://i.imgur.com/veoNWOM.png", 100, { width: 54, height: 184 }, config.scene);
    var spriteManagerSpark = new BABYLON.SpriteManager("Lightning Sprites", "assets/Lightning.png", 100, { width: 4096/9, height: 2048 }, config.scene);
  
    function SpawnLightningBolt(config) {
      var spark = new BABYLON.Sprite("Lightning", spriteManagerSpark);
      spark.playAnimation(0, 8, false, 60);
      spark.height = config.height;
      spark.width = config.width;
    
      spark.position = new BABYLON.Vector3(random(config.min.x, config.max.x), random(config.min.y, config.max.y), random(config.min.z, config.max.z));
  
      setTimeout(function() {
        spark.dispose();
      }, 8 * 60);
  
      setTimeout(function() {
        SpawnLightningBolt(config);
      }, random(8 * 60, 480 *4));
    }
  
    setTimeout(function() {
      SpawnLightningBolt(config);
    }, random(8 * 60, 480 * 4));
  }