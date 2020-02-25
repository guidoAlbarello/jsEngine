class GraphicApplication {
	scene;
	DEVELOPER_MODE = "DEVELOPER_MODE";
	GAME_MODE = "GAME_MODE";
	modes = [this.DEVELOPER_MODE, this.GAME_MODE];
	gui;

	constructor(mode) {
		this.currentMode = mode == this.DEVELOPER_MODE ? 0 : 1;
		this.developerTools = { commands: {} };
	}

	update(timeStamp) {
		gDeltaTime = (timeStamp - this.previousTimeStamp)/1000;
		this.previousTimeStamp = timeStamp;

		this.handleInput();

		let activeCamera = this.scene.getCamera();
		activeCamera.updateController();

		this.scene.update(IDENTITY);

		gCollisionDetection.update();

		// Refactor so that the if is not checked every cycle.?
		// Also be ware of recursive call. For now is fine.
		this.scene.drawScene();
		if (this.modes[this.currentMode] == this.DEVELOPER_MODE) {
			if (!this.developerTools.commands.hideAxis) {
				this.drawAxis(
					this.scene.nodes,
					this.scene.worldModelMatrix,
					activeCamera.id
				);
			}
			this.developerTools.grid.draw();
		}

		gRenderer.setProjectionMatrix(activeCamera.projectionMatrix);
		gRenderer.setViewMatrix(activeCamera.viewMatrix);
		gRenderer.drawScene();

		requestAnimationFrame(step => this.update(step));
	}

	init(canvas) {
		gInputHandler.init(canvas);
		gRenderer.init(canvas);
		let loadMaterialsPromise = gMaterialManager.loadMaterials();

		loadMaterialsPromise.then(() => {
			gTextureManager.loadDefaultArrayTextures();
			gRenderer.initMaterials();
			this.scene = new LoadingScene(this, LevelScene).build();

			this.initDeveloperStuff();

			requestAnimationFrame(step => {
				this.previousTimeStamp = step;
				this.update(step);
			});
		});
	}

	drawAxis(nodes, fatherTransform, activeCameraId) {
		this.developerTools.axis.drawAt(fatherTransform);
		if (nodes.length <= 0) return;
		for (let i = 0; i < nodes.length; i++) {
			// Don't draw an axis in the active camera.
			if (nodes[i].id != activeCameraId) {
				let transform = mat4.create();
				mat4.multiply(transform, fatherTransform, nodes[i].modelMatrix);
				this.drawAxis(
					nodes[i].nodes,
					nodes[i].worldModelMatrix,
					activeCameraId
				);
			}
		}
	}

	handleInput() {
		if (gInputHandler.getInput("change_camera")) this.scene.useNextCamera();

		if (gInputHandler.getInput("change_mode")) {
			this.currentMode = (this.currentMode + 1) % this.modes.length;
			if (this.modes[this.currentMode] == this.DEVELOPER_MODE)
				gDeveloperTools.addDeveloperModels(this.scene);
			else gDeveloperTools.removeDeveloperModels(this.scene);
		}

		if (gInputHandler.getInput("hide_axis"))
			this.developerTools.commands.hideAxis = !this.developerTools
				.commands.hideAxis;
		this.scene.updateController();
	}

	initDeveloperStuff() {
		this.developerTools.grid = gDeveloperTools.makeGrid(1000, 1000);
		this.developerTools.axis = gDeveloperTools.makeTranslationAxisTern();
		this.developerTools.commands.hideAxis = false;

		if (this.modes[this.currentMode] == this.DEVELOPER_MODE)
			gDeveloperTools.addDeveloperModels(this.scene);
	}
}
