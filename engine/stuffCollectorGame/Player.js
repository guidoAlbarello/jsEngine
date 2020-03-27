class Player extends Sprite {
  constructor() {
    super(1, 1.8, 'lime_color', 1, 1);
    this.setPhysicsComponent(new PhysicsComponent2d());
    this.physicsComponent.setGravity(1);

    this.hp = new HealthPoints(gConfiguration.playerHP);
    this.hp.translate([0, this.getHeight()/2+0.3*this.getHeight(), 0]);
    this.addChild(this.hp);

    this.wallJumpDirection = [0,0];
    this.organsCollected = new Map();
    //gDeveloperTools.drawHitbox(this);
    gCollisionDetection.registerCollidable(this, 'walker');
    gCollisionDetection.registerCollidable(this, 'player');
    gCollisionDetection.registerCollidable(this, "entity");
    this.dead = false;
  }

  walk(velocityX) {
    this.physicsComponent.setVelocityX(velocityX);
  }

  jump(height) {
    this.physicsComponent.addImpulse([-this.physicsComponent.gravity[0] * height, -this.physicsComponent.gravity[1] * height]);
  }

  allowWallJump(direction) {
      this.wallJumpDirection = direction;
  }

  getHP() {
    return this.hp.getHP();
  }

  setHP(newHP){
    this.hp.setHP(newHP);
  }

  takeDamage(damage=1){
      this.hp.subtract(damage);
      if (this.hp.getHP() <= 0){
        this.dead = true;
      }
  }

  isDead(){
    return this.dead;
  }

  getInventory() {
    return this.organsCollected;
  }

  getVelocity() {
    return this.physicsComponent.getVelocity();
  }
}
