class PhysicsComponent {
	velocity;
	object;
	gravityInteraction = 0;
	GRAVITY = 9.8;
	isKinematic = false;

	constructor(object) {
		this.object = object;
		this.velocity = [0, 0, 0];
		this.mass = 1;
	}

	update() {
		this.velocity[1] -= gDeltaTime * this.GRAVITY * this.gravityInteraction;
		if (!this.isKinematic) 
			this.object.translate(vecMulScalar(this.velocity, gDeltaTime));
	}

	setVelocity(velocity) {
		this.velocity = velocity;
	}

	setMass(mass) {
		this.mass = mass;
	}

	setIsKinematic(isKinematic) {
		this.isKinematic = isKinematic;
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

	addImpulse(impulse) {
		vec3.add(this.velocity, this.velocity, impulse); 
	}
}
