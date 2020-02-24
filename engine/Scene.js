class Scene extends Object3d {
	controller;
	constructor() {
		super();
		this.cameras = [];
		this.pointLights = [];
		this.currentCamera = "";
		this.cameraNames = [];
		this.currentCameraIndex = 0;
	}

	addCamera(camera, cameraName, object) {
		object = object || this;
		if (this.cameras[cameraName] == undefined) {
			this.cameraNames.push(cameraName);
			this.cameras[cameraName] = camera;
			object.addChild(camera);
			object.setCamera(camera);
		}
	}

	getCamera() {
		return this.cameras[this.currentCamera];
	}

	useCamera(cameraName) {
		this.currentCamera = cameraName;
	}

	useNextCamera() {
		for (let i = 0; i < this.cameraNames.length; i++) {
			if (this.cameraNames[i] == this.currentCamera) {
				this.currentCamera = this.cameraNames[
					(i + 1) % this.cameraNames.length
				];
				break;
			}
		}
	}
	
	setController(controller) {
		this.controller = controller;
	}

	updateController() {
		if (this.controller)
			this.controller.update();
	}

	addDirectionalLight(light) {
		PBRMaterial.setLight(light);
	}

	// Refactor to keep lights as part of the scene.
	addPointLight(light, object) {
		object = object || this;
		this.pointLights.push(light);
		object.addChild(light);
	}

	drawScene() {
		PBRMaterial.setCameraPosition(this.getCamera().worldPosition);
		PBRMaterial.setPointLights(this.pointLights);

		this.draw();
	}
}
