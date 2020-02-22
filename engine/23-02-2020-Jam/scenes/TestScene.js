class TestScene {
    constructor () {
	this.scene = new Scene();
    }
    
    build() {
	this.scene.addCamera(new Camera([0.0,2.0,5.0], [0.0,0.0,0.0]), "default");
	this.scene.addCamera(new Camera([-2.0, 4.0, 10.0], [0.0,0.0,0.0]), "test");
	this.scene.addCamera(new OrbitalCamera([10.0,4.0,10.0], [0.0,0.0,0.0]), "orbital");
	this.scene.useCamera("default");
	
	let plane = gSurfaceCreator.makePlane(5, 5, 1);
	plane.translate([4.0,0.0,0.0]);
	this.scene.addChild(plane);

	let sphere = gSurfaceCreator.makeSphere(0.2, 50);
	sphere.translate([-1.0, 0.0, 2.0]);
	sphere.scale([4.0,4.0,4.0]);
	this.scene.addChild(sphere); 
	
	return this.scene;
    }
}

TestScene.loadScene = () => {
    return new TestScene().build();
}
