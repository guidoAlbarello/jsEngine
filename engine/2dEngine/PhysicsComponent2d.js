class PhysicsComponent2d extends PhysicsComponent {
    constructor(object) {
        super(object);
    }

    setVelocity(velocity) {
        if (velocity[1] > 0)
            this.gravityMultiplier = this.gravityInteraction;
        else if (velocity[1] == 0)
            this.gravityMultiplier = 0;

        this.velocity = [velocity[0], velocity[1], 0];
    }

    setVelocityX(velocityX){
        this.velocity[0] = velocityX;
    }

	addImpulse(impulse) {
		this.setVelocity([this.velocity[0] + impulse[0], this.velocity[1] + impulse[1]]); 
	}
}