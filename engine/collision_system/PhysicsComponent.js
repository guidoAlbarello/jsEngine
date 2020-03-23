class PhysicsComponent {
	velocity;
	object;
	gravityInteraction = 0;
	gravity = [0, -1];
	GRAVITY_VALUE = 2.2 * 9.8
	isKinematic = false;
	movility = [1, 1, 1];
	dontFall = false;
	isFalling = false;
	isOnSurface = false;
	surfaceDirection = [0, 0, 0];

	constructor(object) {
		this.object = object;
		this.velocity = [0, 0, 0];
		this.mass = 1;
		this.gravityMultiplier = this.gravityInteraction;
	}

	update() {
		this.velocity[0] += gDeltaTime * this.GRAVITY_VALUE * this.gravity[0] * this.gravityMultiplier;
		this.velocity[1] += gDeltaTime * this.GRAVITY_VALUE * this.gravity[1] * this.gravityMultiplier;

		vec3.mul(this.velocity, this.velocity, this.movility);
		this.move();
	}

	move() {
		if (!this.isKinematic) {
			this.checkMovementConstraints("x_axis");
			this.checkMovementConstraints("y_axis");
			//this.checkMovementConstraints("z_axis");

			this.object.translate(vecMulScalar(this.velocity, gDeltaTime));
		}
	}

	// Check if it's falling. Can fall in x or y axis.
	// First check in which axis the gravity is active, then check if gravity and speed share same direction.
	// If they share the same direction, then the object is falling.
	// Check if the object can't fall and the gravity direction. Set the velocity to zero if the object can't fall.
	// Or also if the object hit a surface in the direction of the gravity. For this, we check if the direction
	// and the velocity share the same direction.
	checkMovementConstraints(axis) {
		let i = axis == "x_axis" ? 0 : 1;
		if (this.gravity[i] != 0) {
			if (this.dontFall || (this.isFalling && this.velocity[i] * this.surfaceDirection[i] > 0))
				this.velocity[i] = 0;
			if ((this.velocity[i] * this.gravity[i] > 0))
				this.isFalling = true;
		}
	}
	stopFalling() {
		this.isFalling = false;
	}

	setIsOnSurface(isOnSurface, surfaceDirection) {
		this.surfaceDirection = surfaceDirection;
		this.isOnSurface = isOnSurface;
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
