class LevelScene {
	constructor() {
		this.scene = new Scene();
	}

	build() {
		this.setupCameras();
		this.setupLights();
		this.setupTerrain();
		this.setupSafeplace();

		return this.scene;
	}

	setupTerrain() {
		// Create level overall surface
		let surface = this.makeTerrain(100, 100, 1, 20, 20);
        surface.setHitbox(new BoxHitbox(-50, -0.1, -50, 50, 0, 50));
        surface.setPhysicsComponent(new PhysicsComponent());
		surface.addPhysicsCollider();
		surface.physicsComponent.setIsKinematic(true);	
		surface.physicsComponent.setMass(1000);
        surface.physicsComponent.setMovility([0,0,0]);
        
		let grass = new PBRMaterial();
		grass.setAlbedo("grass_albedo");
		grass.setNormalMap("grass_normal");
		grass.setRoughness("grass_rough");

		// Apply grass texture to surface
		surface.setMaterial(grass);

		this.scene.addChild(surface);
	}

	makeTerrain(rows, cols, tileWidth, repeatTextureX, repeatTextureY) {
		let height = [];
		let minRadius = 9;
		let maxRadius = 30;
		for (let i = 0; i < rows; i++) {
			height[i] = [];
			for (let j = 0; j < cols; j++) {
				height[i][j] = 0;
				let dx = i - (rows - 1.0) / 2.0 + 50;
				let dy = j - (rows - 1.0) / 2.0 + 60;
				let dist = dx * dx + dy * dy;
				if (
					dist <= maxRadius * maxRadius &&
					dist >= minRadius * minRadius
				) {
					height[i][j] = -10;
				}
			}
		}

		return gSurfaceCreator.makeHeightMap(
			rows,
			cols,
			tileWidth,
			height,
			repeatTextureX,
			repeatTextureY
		);
	}

	setupSafeplace() {
        // Create game logic
        let gameManager = new GameManager(this.scene);
		gameManager.init();
        this.scene.addChild(gameManager);
        
		// Create safeplace
		let structure = new Object3d();
		let length = 10;
		let height = 6;
		let width = 0.3;

		let wall1 = gSurfaceCreator.makeCube(width, height, length);
		wall1.translate([40, 2, -20]);
		let wall2 = gSurfaceCreator.makeCube(width, height, length);
		wall2.translate([35, 2, -25]);
		wall2.rotate(Math.PI / 2, [0, 1, 0]);
		let wall3 = gSurfaceCreator.makeCube(width, height, length);
		wall3.translate([30, 2, -20]);
		let wall4 = gSurfaceCreator.makeCube(width, height, length);
		wall4.translate([35, 2, -15]);
		wall4.rotate(Math.PI / 2, [0, 1, 0]);

		let roof = gSurfaceCreator.makeCube(12, width, 12);
		roof.translate([35, 5, -20]);
		roof.rotate(Math.PI / 20, [0, 0, 1]);

		structure.addChild(wall1);
		structure.addChild(wall2);
		structure.addChild(wall3);
		structure.addChild(wall4);
		structure.addChild(roof);

		let bricks1 = new PBRMaterial();
		bricks1.setAlbedo("bricks_albedo");
		bricks1.setNormalMap("bricks_normal");
		bricks1.setRoughness("bricks_rough");
		wall1.setMaterial(bricks1);

		let bricks2 = new PBRMaterial();
		bricks2.setAlbedo("bricks_albedo");
		bricks2.setNormalMap("bricks_normal");
		bricks2.setRoughness("bricks_rough");
		wall2.setMaterial(bricks2);

		let bricks3 = new PBRMaterial();
		bricks3.setAlbedo("bricks_albedo");
		bricks3.setNormalMap("bricks_normal");
		bricks3.setRoughness("bricks_rough");
		wall3.setMaterial(bricks3);

		let bricks4 = new PBRMaterial();
		bricks4.setAlbedo("bricks_albedo");
		bricks4.setNormalMap("bricks_normal");
		bricks4.setRoughness("bricks_rough");
		wall4.setMaterial(bricks4);

		let roofTiles = new PBRMaterial();
		roofTiles.setAlbedo('roof_albedo');
		roofTiles.setNormalMap('roof_normal');
		roofTiles.setRoughness('roof_rough');
		roof.setMaterial(roofTiles);

		this.scene.addChild(structure);
	}

	setupCameras() {
        let player = new Player();
		let playerController = new PlayerController(player);
		this.scene.setController(playerController);
		this.scene.addChild(player);
		
        this.scene.addCamera(new FirstPersonCamera([0,1.5,0] , [0,1,3]), "fp", player);
         // x, y, z
		this.scene.addCamera(
			new OrbitalCamera(100, [0.0, 0.0, 0.0]),
			"orbital"
		);
		this.scene.useCamera("fp");
	}

	setupLights() {
		let light = new DirectionalLight();
		light.setDirection([0, 10, 0]);
		light.intensity = [3, 3, 3];

		this.scene.addDirectionalLight(light);

		let pointLight = new PointLight([35, 3.0, -20], [3, 3, 3]);
		this.scene.addPointLight(pointLight);
	}
}

LevelScene.loadScene = () => {
	return new LevelScene().build();
};