class PBRScene_Test {
    constructor () {
	this.scene = new Scene();
    }
    
    build() {
	this.scene.addCamera(new OrbitalCamera(20, [0.0,0.0,0.0]), "orbital");
	this.scene.useCamera("orbital");

	let light = new PBRLight();
	light.setDirection([0, 10,5]);
	light.intensity = [3.01,3.01,3.01];

//	this.scene.addDirectionalLight(light);

	// Keep point light here for now. Maybe later move it as something of dev view. 
	let pointLight = new PointLight([-0.5,3.0,-2.0], [9,9,9]);
	this.scene.addPointLight(pointLight);

	

	gTextureManager.createTextureFromArray("blue", new Uint8Array([122,  122, 255.0]));
	gTextureManager.createTextureFromArray("rough", new Uint8Array([100, 0, 0]));
	gTextureManager.createTextureFromArray("grey", new Uint8Array([10, 10, 10]));
	
	let sphere = gSurfaceCreator.makeSphere(1, 70);
	let testMaterial = new PBRMaterial();
	testMaterial.setAlbedo("white");
	testMaterial.setRoughness("white");
	testMaterial.setMetallic("white");
	testMaterial.setAmbientOcclusion("black");
	testMaterial.setReflectionMap("skybox");
	sphere.setMaterial(testMaterial);
	this.scene.addChild(sphere);
	
	let sphere2 = gSurfaceCreator.makeSphere(1, 40);
	let testMaterial2 = new PBRMaterial();
/*	testMaterial2.setAlbedo("metal_albedo");
	testMaterial2.setRoughness("metal_roughness");
	testMaterial2.setMetallic("black");
	testMaterial2.setNormalMap("metal_normal");
	testMaterial2.setAmbientOcclusion("metal_ao");
	sphere2.setMaterial(testMaterial2);*/
	sphere2.translate([4, 0, 0]);
	this.scene.addChild(sphere2);

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
	
	gDeveloperTools.drawNormals(structure);
	this.scene.addChild(structure);
	
	let h = 1;
	let w = 1;
	let form = {
	    "positions" : [
		[0.0, -h/2, -w/2],
		[0.0, h/2, -w/2],
		[0.0, h/2, 0], 
		[0.0, h/2, w/2],
		[0.0, -h/2, w/2],
		[0.0, -h/2, 0], 
		[0.0, -h/2, -w/2]
	    ],
	    "normals" : [
		[0, 0, -1],
		[0, 0, -1],
		[0, 1, 0],
		[0, 0, 1],
		[0, 0, 1],
		[0, -1, 0],
		[0, 0, -1]
	    ],
	    "amountOfVertices" : 7
	};
	let test = gSurfaceCreator.makeSurfaceFromFormAndCurve(form, new BezierCurve([[0, 0, 0], [8, 0,0], [8,0,6], [0,0,6]]), 50);
	test.translate([2,0,2]);
	test.rotate(Math.PI/2, [0,0,1]);
	this.scene.addChild(test);
	let testMaterial4 = new PBRMaterial();
	test.setMaterial(testMaterial4);

	gDeveloperTools.drawNormals(test);
	return this.scene;
    }
}

PBRScene_Test.loadScene = () => {
    return new PBRScene_Test().build();
}
