class Player extends Sprite {
    constructor() {
        super(1,1.5, "lime_color", 1, 1);
        this.setPhysicsComponent(new PhysicsComponent2d());
    }

    walk(velocity) {
        this.physicsComponent.setVelocity(velocity);
    }
}