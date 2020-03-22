class PhysicsComponent2d extends PhysicsComponent {
    constructor(object) {
        super(object);
    }

    setVelocity(movementDirection) {
        if (movementDirection[1] > 0)
            this.gravityMultiplier = this.gravityInteraction;
        else if (movementDirection[1] == 0)
            this.gravityMultiplier = 0;
    
        //if there was velocity but now movementDirection=[0,0], decelerate:
        let walkSpeed = 0.8;
        let walkSpeedMax = 4;

        //con velocidad y nada de movimiento
        //con velocidad y (velocidad y movimiento con opuestas direcciones)
        if(this.velocity[0] != 0 && (movementDirection[0]==0 || Math.sign(movementDirection[0])!= Math.sign(this.velocity[0]))){
            let decelerate = this.velocity[0]-Math.sign(this.velocity[0])*walkSpeedMax * gDeltaTime;
            if(Math.sign(decelerate)!=Math.sign(this.velocity[0])){
                movementDirection[0]=0;
            }else{
                movementDirection[0]=decelerate;
            }
        }else{
            //acelerate
            movementDirection[0] = Math.sign(movementDirection[0])* Math.min(Math.max(Math.abs(this.velocity[0]), Math.abs(movementDirection[0]))+ walkSpeed * gDeltaTime, walkSpeedMax);
        }

        this.velocity = [movementDirection[0], movementDirection[1], 0];

        
    }

	addImpulse(impulse) {
		this.setVelocity([this.velocity[0] + impulse[0], this.velocity[1] + impulse[1]]); 
	}
}