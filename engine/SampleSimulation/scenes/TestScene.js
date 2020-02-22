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

	let curve = new BSplineCurve([[0.0,0.0,0.0], [0.2, 0.0, -2.0], [3.0,0.0,-2.0], [4.0, 0.0, 0.0], [4.0,0.0,0.0], [7.0, 0.0, -2.0], [10.0,0.0,-4.0], [16.0, 0.0, 2.0]]);
	let form = {
	    "positions" :  [
		[0.0, 0.0, 0.5],    
		[0.0, 0.5, 0.0],
		[0.0, -0.5,0.0]
	    ],
	    "normals" : [
		[1.0, 0.0, 0.0],    
		[0.0, 0.5, 0.0],
		[0.0, 1.0,0.5]
	    ],
	    "amountOfVertices" : 3
	}
	let surface = gSurfaceCreator.makeSurfaceFromFormAndCurve(form, curve, 60);
	surface.setMaterial(new DefaultMaterial([1.0, 1.0, 0.0]));
	//let surface = gSurfaceCreator.makeRevolutionSurface(1,160.0, 40);
	this.scene.addChild(surface);
	this.scene.addChild(plane);

	let curve2 = new BezierCurve([
		[0.0,-2.38,4.99],
		[0.0,-3.53,4.99],
		[0.0,-4.4,4.11],
		[0.0,-4.38,2.99],
	
		[0.0,-4.38,2.99],
		[0.0,-4.38,2.57],
		[0.0,-4.38,2.32],
		[0.0,-4.38,1.99],
		
		[0.0,-4.38,1.99],
		[0.0,-4.4,0.89],
		[0.0,-3.5,0.0],
		[0.0,-2.38,0.0],
	
		[0.0,-2.38,0.0],
		[0.0,-1.56,0.0],
		[0.0,-0.76,0.0],
		[0.0,0.0,0.0],
		
	
		[0.0,0.0,0.0],
		[0.0,0.76,0.0],
		[0.0,1.56,0.0],
		[0.0,2.38,0.0],
	
		[0.0,2.38,0.0],
		[0.0,3.5,0.0],
		[0.0,4.4,0.89],
		[0.0,4.38,1.99],
		
		[0.0,4.38,1.99],
		[0.0,4.38,2.32],
		[0.0,4.38,2.57],
		[0.0,4.38,2.99],
	
		[0.0,4.38,2.99],
		[0.0,4.4,4.11],
		[0.0,3.53,4.99],
		[0.0,2.38,4.99]
	]);
	let surface2 = gSurfaceCreator.makeSurfaceFromFormAndCurve(form, curve2, 100);
	surface2.setMaterial(new DefaultMaterial([1.0, 0.554545454455, 0.3]));
	surface.translate([-1.5, 1.5, -10.0]);
	this.scene.addChild(surface2);
	let sphere = gSurfaceCreator.makeSphere(0.2, 50);
	sphere.setMaterial(new DefaultMaterial([0.3, 0.01, 0.5]));
	sphere.translate([-1.0, 0.0, 2.0]);
	sphere.scale([4.0,4.0,4.0]);
	this.scene.addChild(sphere);  // Test curve with an unisotropic element to see how the directions are handled. 
	let lantern = gModelMaker.makeLantern();
	lantern.translate([-2.0, 0.0, -1.0]);
	this.scene.addChild(lantern);

	let  cube = new Object3d();
	cube.loadModel('models/triangle.json').then( () => {
	    cube.setMaterial(new DefaultMaterial([1.0, 0.0, 0.3]));
	    this.scene.addChild(cube);
	});
	
	let sphereMaterial = gSurfaceCreator.makeSphere(2, 40);
	sphereMaterial.material.addAlbedoTexture("lava");
	this.scene.addChild(sphereMaterial);

	
	let arc = gSurfaceCreator.makeSurfaceFromFormAndCurve(gSurfaceCreator.makeQuad(42, 1),new BezierCurve([[0,0,0], [10, -0.1, 0], [10,-6,0], [0,-6,0]]), 30);
	//arc.modelMatrix = mainPath[0];
	let displacement = vec3.create();
	//vec3.scale(displacement, mainPath[0].slice(8,11), 2*pathWidth);
	//arc.translate(displacement);	
	arc.rotate(Math.PI/2, [0,0,1]);
	
	this.scene.addChild(arc);

	return this.scene;
    }
}
