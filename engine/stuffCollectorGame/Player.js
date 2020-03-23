class Player extends Sprite {
    constructor() {
        super(1,1.8, "lime_color", 1, 1);
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.physicsComponent.setGravity(1);
        gDeveloperTools.drawHitbox(this);
        gCollisionDetection.registerCollidable(this, "walker");
    }

    walk(velocityX) {
        this.physicsComponent.setVelocityX(velocityX);
    }

    jump(height){
    	this.physicsComponent.addImpulse([this.physicsComponent.gravity[0] * height, this.physicsComponent.gravity[1] * height]);
    }

    getVelocity(){
    	return this.physicsComponent.getVelocity();
    }
}