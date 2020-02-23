class PhysicsComponent {
	velocity;
	object;

	constructor(object) {
		this.object = object;
		this.velocity = [0, 0, 0];
		this.mass = 1;
	}

	update() {
		this.object.translate(vecMulScalar(this.velocity, gDeltaTime));
	}

	setVelocity(velocity) {
		this.velocity = velocity;
	}

	setMass(mass) {
		this.mass = mass;
	}

	setObject(object) {
		this.object = object;
	}

	getVelocity() {
		return this.velocity;
	}
}
