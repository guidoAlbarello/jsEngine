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


		// Create Enemy
		let enemy = gSurfaceCreator.makeSphere(2, 70);
		enemy.translate([10,0,0]);
		enemy.setHitbox(new SphericalHitbox(2));
		gCollisionDetection.registerCollidable(enemy, "enemy");

		this.scene.addChild(enemy);

		// Create sphere
		let sphere = gSurfaceCreator.makeSphere(1, 70);
		sphere.setHitbox(new SphericalHitbox(1));

		let collider = new Collider("enemy");
		collider.onCollisionEnter = (otherObject) => {
			console.log('Collide with another sphere ');
		}
		sphere.addCollider(collider);		
		sphere.addPhysicsCollider();

		let sphereMaterial = new PBRMaterial();
		sphere.setMaterial(sphereMaterial);

		let physicsComponent = new PhysicsComponent();
		sphere.setPhysicsComponent(physicsComponent);
		physicsComponent.setVelocity([0.001,0,0])
		this.scene.addChild(sphere);

		// Create bouncing sphere
		let bounce = gSurfaceCreator.makeSphere(2, 70);
		bounce.setPhysicsComponent(new PhysicsComponent());
		bounce.translate([15, 0,0])
		bounce.setHitbox(new SphericalHitbox(2));
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
