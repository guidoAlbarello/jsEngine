class Enemy extends Sprite {
  constructor() {
    super();
    this.setPhysicsComponent(new PhysicsComponent2d());
    this.physicsComponent.setGravity(1);
    gDeveloperTools.drawHitbox(this);
    gCollisionDetection.registerCollidable(this, 'walker');
  }
}
