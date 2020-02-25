class PhysicsComponent {
	velocity;
	object;

	constructor(object) {
		this.object = object;
		this.velocity = [0, 0, 0];
	}
    

	update() {
		this.object.translate(vecMulScalar(this.velocity, gDeltaTime));
	}

	setVelocity(velocity) {
		this.velocity = velocity;
	}

	setObject(object) {
		this.object = object;
	}
}
