
var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = null;
let scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
var page = document.title

let rain, rainSystems;

/******* Add the create scene function ******/
var createScene = function () {

    // Create the scene space
    scene = new BABYLON.Scene(engine);

    var assetsManager = new BABYLON.AssetsManager(scene)
    LoadAssets(scene, assetsManager, page)
    camera = new BABYLON.ArcRotateCamera("Camera", -90 * (Math.PI / 180), 90 * (Math.PI / 180), 20, new BABYLON.Vector3(0, 5, 0), scene);
    //camera = new BABYLON.ArcRotateCamera("Camera", 130 * (Math.PI / 180), 90 * (Math.PI / 180), 4, new BABYLON.Vector3(0, 0.5, 0), scene);
    camera.minZ = 1
    camera.panningDistanceLimit = 0;
    camera.pinchToPanMaxDistance = 0;
    camera.panningSensibility = 0
    camera.lowerRadiusLimit = 10
    camera.upperRadiusLimit = 30
    camera.upperBetaLimit = 180 * (Math.PI / 180)
    camera.angularSensibilityX = 3000
    camera.angularSensibilityy = 3000
    camera.wheelPrecision = 10
    camera.attachControl(canvas, true, true, false);

    //scene.clearColor = new BABYLON.Color3(0, 0, 0);
    //scene.ambientColor = new BABYLON.Color3(0, 0, 0);
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
    sphere.position.y = 0;
    sphere.position.z = 20
    CreateSky(scene)
    // Lightning
    MakeLightningSystem({
        scene: scene,
        max: new BABYLON.Vector3(20, 50, -20),
        min: new BABYLON.Vector3(-20, 10, 20), 
        width: 10  ,
        height: 50
    });


    return scene;
};
/******* End of the create scene function ******/

engine = createDefaultEngine();
if (!engine) throw 'engine should not be null.';
scene = createScene();;
sceneToRender = scene

let UpdateAnimRate = false
let readyForPosters = false
let AnimRate = 0
engine.runRenderLoop(function () {
    if (sceneToRender) {
        sceneToRender.render();
    }
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});
