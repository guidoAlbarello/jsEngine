class FinalScene {
    constructor() {
	this.scene = new Scene();
    }

    build() {
	this.scene.addCamera(new OrbitalCamera(90, [20.0,0.0,-20.0]), "default");
	this.scene.addCamera(new FirstPersonCamera([0.0, 2.8, 1.0],[0.0, 2.8,0.0] ), "person");
	
	let moonlight = new PBRLight();
	moonlight.setDirection([0, 10, -1]);
	moonlight.intensity = [0.00,0.51,1.01];

	this.scene.addDirectionalLight(moonlight);

	let plane = this.makeTerrain(350, 350, 1, 10, 10);
	let planeMaterial = new PBRMaterial();
	planeMaterial.setAlbedo("grass");
	planeMaterial.setSecondAlbedo("dust");
//	planeMaterial.setReflectionMap("skybox");
	planeMaterial.setAmbientOcclusion("white");
	//planeMaterial.setNormalMap("grass");
	plane.setMaterial(planeMaterial);
	this.scene.addChild(plane);
	
	let noCrossedPath = [[-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0], [-18, 1.0, -2], [-16.0, 2.0, -5.0], [-12.0, 9.0, -10.0], [-7, 10, -15], [-2.0, 6.0, -10.0], [0.0, 4.5, -2.0], [2.0, 3.2, 2.0], [-4.0, 1.2, 4.0], [-6.0, 1.0, 10.1], [-10, 1.0, 6.0], [-15.0, 1, 10], [-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0]];
	let crossedPath = [[-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0], [-18, 1.0, -2], [-16.0, 2.0, -5.0], [-12.0, 9.0, -10.0], [-2, 9,-10],  [5, 8, -15.0],[7, 8, -20.0], [-7, 7, -15], [-2.0, 6.0, -10.0], [0.0, 4.5, -2.0], [2.0, 3.2, 2.0], [-4.0, 1.2, 4.0], [-6.0, 1.0, 10.1], [-10, 1.0, 6.0], [-15.0, 1, 10], [-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0], [-17.5, 1.0, 0.0]];
	let rollerCoasterPath = new BSplineCurve(gGUIParams.profile == "cruzada" ? crossedPath : noCrossedPath);

	let rollerCoaster = gModelMaker.makeRollerCoaster(rollerCoasterPath, gGUIParams.columns+1);
	rollerCoaster.translate([28, 0.0, -11]);
	rollerCoaster.rotate(Math.PI/3, [0,1,0]);

//	gDeveloperTools.drawNormals(rollerCoaster);
	this.scene.addCamera(new OrbitalCamera(40, [-10,0,0]), "rollerCoaster", rollerCoaster);
	this.scene.addChild(rollerCoaster);

	let cart = gModelMaker.makeCart();
	rollerCoasterPath.translate([28, 0.6, -11]);
	rollerCoasterPath.rotate(Math.PI/3, [0,1,0]);

	rollerCoasterPath.transformCurveSections();
	
	let animationCart = new Animation();
	animationCart.setCurve(rollerCoasterPath);
	cart.addAnimation(animationCart);
	//cart.setMaterial(new DefaultMaterial(makeRgb(168,0,128)));
	let cartCamera = new Camera([-0.5,0.6,0], [5, 1,0]);
	this.scene.addCamera(cartCamera, "cart", cart);
	this.scene.addCamera(new OrbitalCamera(5, [0,0,0]), "cartOrbital", cart);
	this.scene.addChild(cart);

	//gDeveloperTools.drawNormals(cart);
	
	let heightCarousel = gGUIParams.elevation;
	let carousel = gModelMaker.makeCarousel(heightCarousel, gGUIParams.chairs);
	carousel.translate([60.0, 0.0, -40.0]);
	this.scene.addChild(carousel);
	this.scene.addCamera(new OrbitalCamera(30, [0.0, heightCarousel/2, 0.0]), "carousel", carousel);

	let bridge = gModelMaker.makeBridge(2,0.5,[60.0, 0.0, -33.0]);
	bridge.scale([0.5,1,2.5])
	this.scene.addChild(bridge);
	let bridgeMaterial = new PBRMaterial();
	bridgeMaterial.setAlbedo("PavingStones40_albedo");
	bridgeMaterial.setRoughness("PavingStones40_roughness");
	bridgeMaterial.setMetallic("PavingStones40_metallic");
	bridgeMaterial.setAmbientOcclusion("PavingStones40_ao");
	bridgeMaterial.setNormalMap("PavingStones40_normal");
	bridge.setMaterial(bridgeMaterial);

	let skybox = gSurfaceCreator.makeSphere(150, 70);
	skybox.setMaterial(new SkyboxMaterial("skybox"));
	this.scene.addChild(skybox);

	//lanterns
	let positionsLanterns = [[10,0,-1],[28, 0, -15], [30, 0, 7], [60.0, 0.0, -45.0], [60.0, 0.0, -35.0], [62.0, 0.0, -18.0], [58.0, 0.0, -18.0]];
	for(let i = 0; i<positionsLanterns.length; i++){
		let lantern = gModelMaker.makeLantern();
	    lantern.translate(positionsLanterns[i]);
	    this.scene.addChild(lantern);
	    this.scene.addPointLight(new PointLight([0,1.8,0], [50,50,50]), lantern);
	}
	
/*
	let amountOfLanterns = 25;
	let pathWidth = 2;
	let pathCurve = new BezierCurve([[40,0,20], [60, 0, 0], [-28,0,-65], [80, 0, -80]]);
	let mainPath = pathCurve.getUniformSampling(amountOfLanterns);
	let pathForm = gAssetManager.makeModelParams();
	
	let count = 0;
	let amountLight = 600;

	for (let i = 0; i < amountOfLanterns; i++) {
	    let point = mainPath[i].slice(12, 15);
	    let binormal = mainPath[i].slice(8,11);
	    let displacement = vec3.create();

	    // Place left Lantern
	    let leftLantern = gModelMaker.makeLantern();
	    vec3.scale(displacement, binormal, -pathWidth);
	    leftLantern.translate(displacement);
	    leftLantern.translate(point);

	    this.scene.addChild(leftLantern);
	    this.scene.addPointLight(new PointLight([0,1.8,0], [10,10,10]), leftLantern);
	    
	    // Place right Lantern
	    let rightLantern = gModelMaker.makeLantern();
	    vec3.scale(displacement, binormal, pathWidth);
	    rightLantern.translate(displacement);
	    rightLantern.translate(point);
	    this.scene.addChild(rightLantern);
	    this.scene.addPointLight(new PointLight([0,1.8,0], [10,10,10]), rightLantern);

	    // Make path
	    let leftPoint = leftLantern.modelMatrix.slice(12,15);
	    let rightPoint = rightLantern.modelMatrix.slice(12,15);
	    pathForm.positions.push(leftPoint[0]);
	    pathForm.positions.push(leftPoint[1]);
	    pathForm.positions.push(leftPoint[2]);

    	    pathForm.positions.push(rightPoint[0]);
	    pathForm.positions.push(rightPoint[1]);
	    pathForm.positions.push(rightPoint[2]);

	    pathForm.normals.push(0);
	    pathForm.normals.push(1);
	    pathForm.normals.push(0);
	    
	    pathForm.normals.push(0);
	    pathForm.normals.push(1);
	    pathForm.normals.push(0);
	}
	
	let path = new Object3d();
	path.setModel(gAssetManager.makeModelData(pathForm, gSurfaceCreator.generateIndexBuffer(amountOfLanterns, 2), "TRIANGLE_STRIP"));
	path.translate([0,-1.7,0]);

	let pathMaterial = new PBRMaterial();
	pathMaterial.setAlbedo("PavingStones40_albedo");
	pathMaterial.setRoughness("PavingStones40_roughness");
	pathMaterial.setMetallic("PavingStones40_metallic");
	pathMaterial.setAmbientOcclusion("PavingStones40_ao");
	pathMaterial.setNormalMap("PavingStones40_normal");
	path.setMaterial(pathMaterial);

	this.scene.addChild(path);
	*/
	this.scene.useCamera("default");
	return this.scene;
    }


    makeTerrain(rows, cols, tileWidth, repeatTextureX, repeatTextureY) {
	let height = [];
	let minRadius = 9;
	let maxRadius = 20;
	for (let i = 0; i < rows; i++) {
	    height[i] = [];
	    for (let j = 0; j < cols; j++) {
		height[i][j] = 0;
		let dx = i- (rows - 1.0) / 2.0 - 60;
		let dy = j- (rows - 1.0) / 2.0 +40;
		let dist = dx*dx + dy*dy;
		if (dist <= maxRadius*maxRadius && dist >= minRadius*minRadius) {
		    height[i][j] = -10;
		}
	    }
	}

	return gSurfaceCreator.makeHeightMap(rows, cols, tileWidth, height, repeatTextureX, repeatTextureY);
	}

}

FinalScene.loadScene = () => {
    return new FinalScene().build();
}
