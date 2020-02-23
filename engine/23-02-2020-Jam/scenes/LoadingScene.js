class LoadingScene {
    constructor(graphicsApplication, scene) {
     this.scene = new Scene();
     gTextureManager.loadTextures().then(() => {
	 graphicsApplication.scene = scene.loadScene();
     });
    }

    build() {
	this.scene.addCamera(new OrbitalCamera(20, [0.0,0.0,0.0]), "orbital");
	this.scene.useCamera("orbital");

	let light = new DirectionalLight();
	light.setDirection([0, 10,5]);
	light.intensity = [3.01,3.01,3.01];

	// Keep point light here for now. Maybe later move it as something of dev view. 
	let pointLight = new PointLight([-0.5,3.0,-2.0], [10.9,0.2,0]);
	this.scene.addPointLight(pointLight);

	let pointLight2 = new PointLight([-0.5,3.0,2.0], [0.1,0,0.5]);
	this.scene.addPointLight(pointLight2);
	

	gTextureManager.createTextureFromArray("blue", new Uint8Array([122,  122, 255.0]));
	gTextureManager.createTextureFromArray("rough", new Uint8Array([100, 0, 0]));
	gTextureManager.createTextureFromArray("grey", new Uint8Array([10, 10, 10]));
	
	let sphere = gSurfaceCreator.makeSphere(1, 70);
	let testMaterial = new PBRMaterial();
	testMaterial.setAlbedo("white");
	testMaterial.setRoughness("white");
	testMaterial.setMetallic("white");
	testMaterial.setAmbientOcclusion("black");
	testMaterial.setNormalMap("blue");
	sphere.setMaterial(testMaterial);
	this.scene.addChild(sphere);
	
	let structure = new Object3d();
	let length = 10;
	let width = 0.3;
	let wall = gSurfaceCreator.makeCube(width, length, length);
	wall.translate([-length/2,0.0,0]);
	let floor = gSurfaceCreator.makeCube(length, width, length);
	floor.translate([0,-length/2,0]);
	let wall2 = gSurfaceCreator.makeCube(length, length, width);
	wall2.translate([0,0,-length/2]);

	structure.addChild(wall);
	structure.addChild(wall2);
	structure.addChild(floor);

	let mat = new PBRMaterial();
	wall.setMaterial(mat);
	
	let mat2 = new PBRMaterial();
	wall2.setMaterial(mat2);

	let mat3 = new PBRMaterial();
	floor.setMaterial(mat3);
	
	return this.scene;
    }
}

LoadingScene.loadScene = () => {
    return new LoadingScene().build();
}
