class Player extends Sprite {
    constructor() {
        super(1,1, "violet", 1, 1);
        this.setPhysicsComponent(new PhysicsComponent2d());
    }

    walk(velocity) {
        this.physicsComponent.setVelocity(velocity);
    }
}