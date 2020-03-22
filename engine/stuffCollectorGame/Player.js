class Player extends Sprite {
    constructor() {
        super(1,1.8, "lime_color", 1, 1);
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.addPhysicsCollider();
        this.physicsComponent.setGravity(1);
    }

    walk(movementDirection) {
        this.physicsComponent.setVelocity(movementDirection);
    }
}