class FinalScene {
	constructor() {
		this.scene = new Scene();
		this.objective = new Map([
			[ "liver", 1 ],
			[ "brain", 1 ],
			[ "heart", 1 ]
		]);
	}

	build() {
		this.scene.addCamera(
			new FirstPersonCamera([ 0.0, 2.8, 1.0 ], [ 0.0, 2.8, 0.0 ]),
			"default"
		);

		let moonlight = new DirectionalLight();
		moonlight.setDirection([ 0, 10, -1 ]);
		moonlight.intensity = [ 0.0, 0.51, 1.01 ];

		this.scene.addDirectionalLight( moonlight );

		this.scene.useCamera("default");


		let gameManager = new GameManager( this.scene, this.objective );
		gameManager.init();
		this.scene.addChild( gameManager );

		return this.scene;
	}
}

FinalScene.loadScene = () => {
	return new FinalScene().build();
};
