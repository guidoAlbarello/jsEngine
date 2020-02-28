class TestScene {
	constructor() {
		this.scene = new Scene();
	}

	build() {
		this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
		this.scene.useCamera("orbital");

	

		// Keep point light here for now. Maybe later move it as something of dev view.
		let pointLight = new PointLight([-0.5, 3.0, -2.0], [1.9, 0.2, 0]);
		this.scene.addPointLight(pointLight);

		let light = new DirectionalLight();
		light.setDirection([0, 0, 1]);
		light.intensity = [2, 2, 2];
		this.scene.addDirectionalLight(light);

		// Create bouncing sphere
		let bounce = gSurfaceCreator.makeSphere(2, 70);
		bounce.setPhysicsComponent(new PhysicsComponent());
		bounce.setHitbox(new SphericalHitbox(2));
		bounce.physicsComponent.setGravity(1);
		bounce.addPhysicsCollider();
		this.scene.addChild(bounce);

		// Create walls
		let structure = new Object3d();
		let length = 10;
		let width = 0.3;
		let wall = gSurfaceCreator.makeCube(width, length, length);
		wall.translate([-length / 2, 0.0, 0]);
		let floor = gSurfaceCreator.makeCube(length, width, length);
		floor.translate([0, -length / 2, 0]);
		floor.setPhysicsComponent(new PhysicsComponent());
		floor.addPhysicsCollider();
		floor.setHitbox(new BoxHitbox(-5, -0.15, -5, 5, 0.15, 5));
		floor.physicsComponent.setIsKinematic(true);	
		floor.physicsComponent.setMass(1000);
		floor.physicsComponent.setMovility([0,0,0]);
		let wall2 = gSurfaceCreator.makeCube(length, length, width);
		wall2.translate([0, 0, -length / 2]);

		structure.addChild(wall);
		structure.addChild(wall2);
		structure.addChild(floor);

		let mat = new PBRMaterial();
		wall.setMaterial(mat);

		let mat2 = new PBRMaterial();
		wall2.setMaterial(mat2);

		let mat3 = new PBRMaterial();
		floor.setMaterial(mat3);

		this.scene.addChild(structure);
		return this.scene;
	}
}

TestScene.loadScene = () => {
	return new TestScene().build();
};
