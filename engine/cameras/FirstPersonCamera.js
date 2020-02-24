class FirstPersonCamera extends Camera {
	constructor(position, target) {
		super(position, target);

		this.alfa = Math.PI / 4; //alfa and beta target
		this.beta = Math.PI / 4;

		this.turnSpeed = 1.1;
	}

	updateController() {
		let delta = gInputHandler.getDelta();
		this.alfa += delta.x * this.turnSpeed * gDeltaTime;
		this.beta += delta.y * this.turnSpeed * gDeltaTime;
		this.turn();
	}

	turn() {
		this.target = [
			-Math.sin(this.alfa) * Math.sin(this.beta),
			Math.cos(this.beta),
			Math.cos(this.alfa) * Math.sin(this.beta)
		]; //relative target position of [0,0,0]
		vec3.add(this.target, this.target, this.position); //relative target position of camera position
	}
}
