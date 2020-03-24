class Player extends Sprite {
  constructor() {
    super(1, 1.8, 'lime_color', 1, 1);
    this.setPhysicsComponent(new PhysicsComponent2d());
    this.physicsComponent.setGravity(1);
    this.hp = new HealthPoints(gConfiguration.playerHP);
    this.hp.translate([0, this.getHeight()/2+0.3*this.getHeight(), 0]);
    this.addChild(this.hp);
    this.organsCollected = new Map();
    gDeveloperTools.drawHitbox(this);
    gCollisionDetection.registerCollidable(this, 'walker');
    gCollisionDetection.registerCollidable(this, 'player');
  }

  walk(velocityX) {
    this.physicsComponent.setVelocityX(velocityX);
  }

  jump(height) {
    this.physicsComponent.addImpulse([-this.physicsComponent.gravity[0] * height, -this.physicsComponent.gravity[1] * height]);
  }

  getHP() {
    return this.hp.getHP();
  }

  setHP(newHP){
    this.hp.setHP(newHP);
  }

  takeDamage(damage=1){
    this.hp.subtract(damage);
  }

  getInventory() {
    return this.organsCollected;
  }

  getVelocity() {
    return this.physicsComponent.getVelocity();
  }
}
