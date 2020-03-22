class Player extends Sprite {
    constructor() {
        super(1,1, "violet", 1, 1);
        this.setPhysicsComponent(new PhysicsComponent2d());
    }

    walk(movementDirection) {
        this.physicsComponent.setVelocity(movementDirection);
        /*let aceleration = 2;
        let impulse = movementDirection.map(function(val){return val*aceleration});
        //console.log(movementDirection)
        this.physicsComponent.addImpulse(impulse);*/
    }
}