class Player extends Sprite {
  constructor() {
    super(1, 1, "violet", 1, 1);

    this.hp = 100;
    this.organsCollected = new Map();
    this.setPhysicsComponent(new PhysicsComponent2d());
  }

  getHP() {
    return this.hp;
  }

  getInventory() {
    return this.organsCollected;
  }

  walk(movementDirection) {
    this.physicsComponent.setVelocity(movementDirection);
  }
}
