class PhysicsCollider extends Collider {
	constructor() {
        super();
        this.setOnCollisionEnter((otherCollider) => { 
            let distanceBetweenObjects = vec3.create();
            vec3.scaleAndAdd(distanceBetweenObjects, this.object.getPosition(), otherCollider.object.getPosition(), -1);
            vec3.normalize(distanceBetweenObjects, distanceBetweenObjects);
            
            let a1 = vec3.dot(distanceBetweenObjects, this.object.physicsComponent.getVelocity());
            let a2 = vec3.dot(distanceBetweenObjects, otherCollider.object.physicsComponent.getVelocity());    
            
            let optimizedP = 2.0 * (a1-a2) / (this.object.physicsComponent.mass + otherCollider.object.physicsComponent.mass);
            
            let velocityAfterCollision = vec3.create();
            vec3.scaleAndAdd(velocityAfterCollision, this.object.physicsComponent.getVelocity(), distanceBetweenObjects, -optimizedP * otherCollider.object.physicsComponent.mass)
			vec3.mul(velocityAfterCollision, velocityAfterCollision, otherCollider.object.physicsComponent.movility);
            this.object.physicsComponent.setVelocity(velocityAfterCollision);
            this.object.physicsComponent.move();

            let velocityAfterCollision2 = vec3.create();
            vec3.scaleAndAdd(velocityAfterCollision2, otherCollider.object.physicsComponent.getVelocity(), distanceBetweenObjects, optimizedP * this.object.physicsComponent.mass);
            vec3.mul(velocityAfterCollision2, velocityAfterCollision2, this.object.physicsComponent.movility);
            otherCollider.object.physicsComponent.setVelocity(velocityAfterCollision2);
            otherCollider.object.physicsComponent.move();
        });
	}
}