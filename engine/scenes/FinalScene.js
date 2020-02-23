class FinalScene {
	constructor() {
		this.scene = new Scene();
	}

	build() {
		this.scene.addCamera(
			new FirstPersonCamera([0.0, 2.8, 1.0], [0.0, 2.8, 0.0]),
			"default"
		);

		let moonlight = new DirectionalLight();
		moonlight.setDirection([0, 10, -1]);
		moonlight.intensity = [0.0, 0.51, 1.01];

		this.scene.addDirectionalLight(moonlight);

		this.scene.useCamera("default");
		return this.scene;
	}
}

FinalScene.loadScene = () => {
	return new FinalScene().build();
};
