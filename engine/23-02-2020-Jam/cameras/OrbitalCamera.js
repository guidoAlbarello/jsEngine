class OrbitalCamera extends Camera {
	MAX_RADIUS = 100;
	MIN_RADIUS = 1;

	constructor(radius, target) {
		super(sphericalToXYZ(radius, Math.PI / 4, Math.PI / 4), target);
		this.alfa = Math.PI / 4;
		this.beta = Math.PI / 4;
		this.speed = 0.0001;
		this.zoomSpeed = 0.00025;
		this.radius = radius; // This should be calculated from the targe
	}

	// This can be refactored into a controller class. 
	updateController() {
		let delta = gInputHandler.getAxisInput();

		let zoomValue = gInputHandler.getZoom();
		this.zoom(zoomValue);
		gInputHandler.setZoom(0);

		this.alfa += delta.x * this.speed * gDeltaTime;
		this.beta += delta.y * this.speed * gDeltaTime;
		if (this.beta <= 0) this.beta = 0.0001;
		if (this.beta >= Math.PI) this.beta = Math.PI;

		this.position = sphericalToXYZ(this.radius, this.alfa, this.beta);
		vec3.add(this.position, this.position, this.target); //relative position of target point
	}

	zoom(value) {
		this.radius += value * this.zoomSpeed * gDeltaTime;
		if (this.radius < this.MIN_RADIUS) this.radius = this.MIN_RADIUS;
		if (this.radius > this.MAX_RADIUS) this.radius = this.MAX_RADIUS;
	}
}
