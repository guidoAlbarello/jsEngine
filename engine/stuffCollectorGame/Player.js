class Player extends Sprite {
    constructor() {
        super(1,1.5, "lime_color", 1, 1);
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.physicsComponent.setGravity(9.8);
    }

    walk(velocity) {
        this.physicsComponent.setVelocity(velocity);
    }

    jump(heigth){
    	this.physicsComponent.addImpulse([0,heigth]);
    }
}