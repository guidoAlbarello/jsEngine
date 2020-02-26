class PhysicsComponent {
	velocity;
	object;
	gravityInteraction = 0;
	GRAVITY = 9.8;
	isKinematic = false;
	movility = [1,1,1];
	dontFall = false;

	constructor(object) {
		this.object = object;
		this.velocity = [0, 0, 0];
		this.mass = 1;
		this.gravityMultiplier = this.gravityInteraction;
	}

	update() {
		this.velocity[1] -= gDeltaTime * this.GRAVITY * this.gravityMultiplier;
		vec3.mul(this.velocity, this.velocity, this.movility);
		this.move();
	}

	move() {
		if (!this.isKinematic) {
			if (this.dontFall) 
				this.velocity[1] = 0;
			this.object.translate(vecMulScalar(this.velocity, gDeltaTime));			
		}
	}

	setDontFall(dontFall) {
		this.dontFall = dontFall;
	}

	setVelocity(velocity) {
		if (velocity[1] > 0)
			this.gravityMultiplier = this.gravityInteraction;
		else if (velocity[1] == 0)
			this.gravityMultiplier = 0;
		this.velocity = velocity;
	}

	setMass(mass) {
		this.mass = mass;
	}

	setIsKinematic(isKinematic) {
		this.isKinematic = isKinematic;
	}

	setMovility(movility) {
		this.movility = movility;
	}

	setObject(object) {
		this.object = object;
	}

	getVelocity() {
		return this.velocity;
	}

	setGravity(gravityInteraction) {
		this.gravityInteraction = gravityInteraction;
		this.gravityMultiplier = this.gravityInteraction;
	}

	addImpulse(impulse) {
		let velocity = vec3.create();
		vec3.add(velocity, this.velocity, impulse);
		this.setVelocity(velocity); 
	}
}
