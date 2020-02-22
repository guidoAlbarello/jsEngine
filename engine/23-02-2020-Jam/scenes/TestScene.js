class TestScene {
    constructor () {
	this.scene = new Scene();
    }
    
    build() {
	this.scene.addCamera(new OrbitalCamera(20, [0.0,0.0,0.0]), "orbital");
	this.scene.useCamera("orbital");

	// Keep point light here for now. Maybe later move it as something of dev view. 
	let pointLight = new PointLight([-0.5,3.0,-2.0], [1.9,0.2,0]);
	this.scene.addPointLight(pointLight);

	// Create sphere
	let sphere = gSurfaceCreator.makeSphere(1, 70);

	let sphereMaterial = new PBRMaterial();
	sphere.setMaterial(sphereMaterial);

	let physicsComponent = new PhysicsComponent();
	sphere.setPhysicsComponent(physicsComponent);

	this.scene.addChild(sphere);

	// Create walls
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
	
	this.scene.addChild(structure);
	return this.scene;
    }
}

TestScene.loadScene = () => {
    return new TestScene().build();
}
