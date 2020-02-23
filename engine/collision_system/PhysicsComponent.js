class PhysicsComponent {
	velocity;
	object;
	gravityInteraction = 0;
	GRAVITY = 9.8;

	constructor(object) {
		this.object = object;
		this.velocity = [0, 0, 0];
		this.mass = 1;
	}

	update() {
		this.velocity[1] -= gDeltaTime * this.GRAVITY * this.gravityInteraction; 
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

	setGravity(gravityInteraction) {
		this.gravityInteraction = gravityInteraction;
	}
}
