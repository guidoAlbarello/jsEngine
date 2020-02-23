class PhysicsCollider extends Collider {
	constructor() {
        super();
        this.setOnCollisionEnter((otherObject) => { 
            let velocityAfterCollision = vec3.create();

            this.object.physicsComponent.setVelocity([0,0.002,0]);
        });
	}
}