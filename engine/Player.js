class Player extends Sprite {
    constructor() {
        super(1,1, "entity", 64/256, 64/256);
        this.setPhysicsComponent(new PhysicsComponent2d());
    }

    walk(movementDirection) {
        this.physicsComponent.setVelocity(movementDirection);
    }
}