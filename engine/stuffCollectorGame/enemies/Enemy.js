class Enemy extends Sprite {
    constructor() {
        super();
        //gCollisionDetection.registerCollidable(this, "walker");
        this.setPhysicsComponent(new PhysicsComponent2d());
    }
}