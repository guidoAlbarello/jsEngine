class ForestLevel {
	constructor() {
		this.scene = new Scene();
		this.objective = new Map([
			["liver", 1],
			["brain", 1],
			["heart", 1]
		]);
	}

	build() {
		this.setupPlayer();
		this.setupCameras();

		this.setupBackground();
		this.setupLevelGeometry();


		let gameManager = new GameManager(this.scene, this.objective);
		gameManager.init();
		this.scene.addChild(gameManager);

		return this.scene;
	}

	setupCameras() {
		// Set up cameras
		this.scene.addCamera(new OrtographicCamera([0, 0, 20], [0, 0, 0], [0, 1, 0], 27, 48), "ortho", gQuerySystem.getPlayer());
		this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
		this.scene.useCamera("ortho");
	}

	setupPlayer() {
		// Create the player
		let player = gEntityManager.instantiateObjectWithTag("player", Player);
		player.translate([0, 3, 0]);

		// Create a player controller and set the player to it.
		// This way we can control the player with input.
		let playerController = new PlayerController(player);
		this.scene.setController(playerController);

		// Add animation maanger for player
		//player.setAnimationManager(this.createAnimations(player));


		// Added player to the scene
		this.scene.addChild(player);
	}

	setupBackground() {
		let background = gEntityManager.instantiateObjectWithTag("background", Sprite, 50, 50, "background", 1, 1);
		background.translate([0, 0, 10]);
		gQuerySystem.getPlayer().addChild(background);
	}

	setupLevelGeometry() {
		let baseY = 15;
		let d_y = 0;
		let d_x = 0;
		const increaseDisplacement = (x, y) => {
			d_x += x;
			d_y += y;
		};

		// Upper level
		// First Jumps
		this.createPlatformFromSizeAt(30, baseY + 10, d_x, d_y);
		increaseDisplacement(38, 5);
		this.createPlatformFromSizeAt(8, baseY, d_x - 8, -5);
		this.createPlatformFromSizeAt(15, baseY + 10 + d_y, d_x, d_y);
		increaseDisplacement(23, 6);
		this.createPlatformFromSizeAt(8, baseY, d_x - 8, -5);
		this.createLavaAt(8, 8, d_x - 12, -1);
		this.createPlatformFromSizeAt(20, 7, d_x, d_y);

		// Cave + platforms
		increaseDisplacement(0, -17);
		this.createPlatformFromSizeAt(50, baseY, d_x, d_y);
		this.createPlatformFromSizeAt(8, 16, d_x, 16 + d_y);
		this.createEnemyOfTypeAt(Zombie, 2 + d_x, d_y);

		increaseDisplacement(50, 0);
		this.createPlatformFromSizeAt(5, 1, 4 + d_x, d_y - 3);
		this.createPlatformFromSizeAt(1, 8, 6 + d_x, 14 + d_y);
		this.createPlatformFromSizeAt(1, 8, 6 + d_x, 24 + d_y);
		this.createLavaAt(14, 20, d_x - 7, d_y - 20);
		increaseDisplacement(14, 27);

		// Upper platform before colliseum
		this.createPlatformFromSizeAt(40, 30 + baseY + d_y, d_x, d_y);
		increaseDisplacement(40, 0);
		this.createPlatformFromSizeAt(1, 8, d_x - 9, 13 + d_y);
		this.createPlatformFromSizeAt(15, 1, d_x + 1, 10 + d_y);
		this.createEnemyOfTypeAt(Zombie, d_x - 1, d_y);
		this.createTombAt(14 + d_x, 10 + d_y - 0.1);

		// Colliseum
		this.createPlatformFromSizeAt(30, 30, d_x, -30);
		this.createPlatformFromSizeAt(10, 2, 30 + d_x, -30.1); // This platform is movable.
		this.createPlatformFromSizeAt(30, 30, 40 + d_x, -30);
		this.createPlatformFromSizeAt(30, 150, 70 + d_x, 0);

		// Bottom level

		// Start Area
		increaseDisplacement(0, -150);
		this.createEnemyOfTypeAt(Wolf, 60 + d_x, d_y);
		this.createPlatformFromSizeAt(70, baseY, d_x, d_y);
		increaseDisplacement(-20, 0);

		// Upper platforming area
		this.createPlatformFromSizeAt(4, 1, d_x + 13, d_y + 10);
		this.createPlatformFromSizeAt(4, 1, d_x + 20, d_y + 18);

		this.createPlatformFromSizeAt(1, 8, d_x + 28, d_y + 29 + 6);
		this.createPlatformFromSizeAt(1, 8, d_x + 22, d_y + 35 + 6);
		this.createPlatformFromSizeAt(1, 8, d_x + 28, d_y + 40 + 6);

		this.createPlatformFromSizeAt(36, 3, d_x - 16, d_y + 50);
		this.createPlatformFromSizeAt(3, 30, d_x - 16, d_y + 50);
		this.createPlatformFromSizeAt(3, 45, d_x - 26, d_y + 65);
		this.createPlatformFromSizeAt(46, 3, d_x - 26, d_y + 65);
		this.createTombAt(d_x - 26, d_y + 65);
		this.createPlatformFromSizeAt(7, 3, d_x - 23, d_y + 23);
		this.createTombAt(d_x - 23, d_y + 23);

		// Bottom platform section with lava
		this.createLavaAt(10, baseY, d_x + 5, d_y - 13);
		this.createEnemyOfTypeAt(Wolf, d_x + 7, d_y);
		this.createPlatformFromSizeAt(10, baseY, d_x, d_y);
		increaseDisplacement(-10 - 14, 0);
		this.createLavaAt(19, baseY, d_x - 4.5, d_y - 13);
		this.createPlatformFromSizeAt(5, baseY, d_x, d_y);
		this.createLavaAt(34, baseY, d_x - 51, d_y - 13);
		this.createPlatformFromSizeAt(4, 0.8, d_x - 20, d_y + 8); // Hook Platform
		this.createHookAt(d_x - 18, d_y - 2);
		this.createTombAt(d_x - 18, d_y + 8);
		increaseDisplacement(-5 - 54, 0);
		this.createPlatformFromSizeAt(25, baseY, d_x, d_y);

		// Upper platforming area
		this.createPlatformFromSizeAt(27, 3, d_x + 5, d_y + baseY * 3 / 4);
		this.createPlatformFromSizeAt(3, 8, 29.1 + d_x, baseY + 1.33 + d_y);

		this.createPlatformFromSizeAt(8, 1, d_x + 37, baseY * 3 / 4 + 4 + d_y);
		this.createPlatformFromSizeAt(1, 8, d_x + 50, baseY * 3 / 4 + 17 + d_y);


		// Endzone
		increaseDisplacement(-15, 6);
		this.createPlatformFromSizeAt(35, 8, d_x - 20, d_y);
		this.createPlatformFromSizeAt(2, 7, d_x, d_y - 8);
		increaseDisplacement(-20, -15);
		this.createPlatformFromSizeAt(25, 8 * baseY, d_x, d_y);

		// Slope side
		increaseDisplacement(-50, -2 * baseY);
		this.createPlatformFromSizeAt(1, 8, d_x + 40, d_y + 2.5 * baseY);
		this.createEnemyOfTypeAt(Zombie, d_x + 28, d_y + 1.75 * baseY);
		this.createPlatformFromSizeAt(8, 5, d_x + 27, d_y + 1.75 * baseY);
		this.createPlatformFromSizeAt(50, 2.5 * baseY, d_x, d_y);
		increaseDisplacement(-20, -baseY);
		this.createPlatformFromSizeAt(45, baseY, d_x - 25, d_y);
		increaseDisplacement(-10, -1.5 * baseY);
		this.createPlatformFromSizeAt(80, baseY, d_x - 20, d_y);
		let g = this.createEnemyOfTypeAt(Guard, d_x + 10, d_y);
		g.setPatrollCenter([d_x + 10, d_y, 0]);

		// this.createExit(); Spawn Exit
		increaseDisplacement(-70, 2.5 * baseY);

		// Platforms in air
		this.createPlatformFromSizeAt(2, 2, d_x + 70 + 16, d_y);
		this.createPlatformFromSizeAt(2, 2, d_x + 70 + 8, d_y);
		this.createPlatformFromSizeAt(2, 2, d_x + 70, d_y);
		this.createPlatformFromSizeAt(2, 2, d_x + 62, d_y);

		// Left side
		this.createPlatformFromSizeAt(50, 5 * baseY, d_x, d_y);
		this.createPlatformFromSizeAt(30, 200, d_x - 30, d_y + 120);

		// Spiral
		increaseDisplacement(10, 10);
		this.createPlatformFromSizeAt(1, 8, d_x, d_y);
		this.createPlatformFromSizeAt(1, 8, d_x + 7, d_y + 7);


		this.createPlatformFromSizeAt(1, 8, d_x + 7, d_y + 18);
		this.createPlatformFromSizeAt(1, 8, d_x, d_y + 13);

		this.createPlatformFromSizeAt(1, 8, d_x + 7, d_y + 29);
		this.createPlatformFromSizeAt(1, 8, d_x, d_y + 24);

		this.createEnemyOfTypeAt(Zombie, d_x - 4.5, d_y + 35);
		this.createPlatformFromSizeAt(5, 5, d_x - 7, d_y + 35);
		this.createPlatformFromSizeAt(1, 8, d_x + 7, d_y + 48);

		this.createPlatformFromSizeAt(1, 8, d_x, d_y + 55);
		this.createPlatformFromSizeAt(1, 8, d_x + 7, d_y + 60);
		this.createPlatformFromSizeAt(1, 8, d_x, d_y + 66);


		increaseDisplacement(10, 65);
		this.createPlatformFromSizeAt(8, 1, d_x, d_y);
		this.createEnemyOfTypeAt(ZombieFast, d_x + 7, d_y);

		this.createBouncyPlatform(15, 0.8, d_x + 8, d_y - 1);

		this.createEnemyOfTypeAt(Zombie, d_x + 23, d_y);
		this.createEnemyOfTypeAt(Zombie, d_x + 30, d_y);
		this.createPlatformFromSizeAt(8, 1, d_x + 23, d_y);

		this.createPlatformFromSizeAt(1, 8, d_x + 33, d_y - 3);
		this.createPlatformFromSizeAt(1, 8, d_x + 40, d_y - 7);

		this.createPlatformFromSizeAt(1, 8, d_x + 33, d_y - 15);
		this.createPlatformFromSizeAt(1, 8, d_x + 40, d_y - 19);

		this.createPlatformFromSizeAt(5, 1, d_x + 34, d_y - 30);
		this.createPlatformFromSizeAt(5, 1, d_x + 27, d_y - 30);

		this.createPlatformFromSizeAt(1, 8, d_x + 25, d_y - 20);

		this.createEnemyOfTypeAt(Dragon, d_x + 20, d_y - 12);
		// TODO: Add interactable here at post d_x + 12!!
		//this.createInteractable();
		this.createPlatformFromSizeAt(10, 4, d_x + 19, d_y - 12);

		this.createPlatformFromSizeAt(4, 0.8, d_x + 62, d_y - 14); // Hook Platform
		this.createHookAt(d_x + 63.5, d_y - 24);
	}


	createLavaAt(width, height, x, y) {
		let lava = gEntityManager.instantiateObjectWithTag("lava", Lava, width, height);
		lava.translate([lava.getWidth() / 2 + x, lava.getHeight() / 2 + y, 0]);
		this.scene.addChild(lava);
	}

	createHookAt(x, y) {
		let hook = gEntityManager.instantiateObjectWithTag("hook", Hook);
		hook.translate([hook.getWidth() / 2 + x, hook.getHeight() / 2 + y, 0]);
		this.scene.addChild(hook);
	}

	createTombAt(x, y) {
		let tomb = gEntityManager.instantiateObjectWithTag("tomb", Tomb);
		tomb.translate([tomb.getWidth() / 2 + x, tomb.getHeight() / 2 + y, 0]);
		this.scene.addChild(tomb);
	}

	createEnemyOfTypeAt(enemyType, x, y) {
		let enemy = gEntityManager.instantiateObjectWithTag("enemy", enemyType);
		enemy.translate([enemy.getWidth() / 2 + x, enemy.getHeight() / 2 + y, 0]);
		this.scene.addChild(enemy);
		return enemy;
	}

	createPlatformFromSizeAt(width, height, x, y) {
		let platform = gEntityManager.instantiateObjectWithTag("floor", Platform, width, height, true);
		platform.translate([x, y, 0]);
		this.scene.addChild(platform);
	}

	createBouncyPlatform(width, height, x, y) {
		let platform = gEntityManager.instantiateObjectWithTag("bouncy_floor", BouncyPlatform, width, height, true);
		platform.translate([x, y, 0]);
		this.scene.addChild(platform);
	}
}



ForestLevel.loadScene = () => {
	return new ForestLevel().build();
};
