class Player extends Sprite {
  constructor() {
    super(1, 1.8, 'lime_color', 1, 1);
    this.setPhysicsComponent(new PhysicsComponent2d());
    this.physicsComponent.setGravity(1);

    this.hp = new HealthPoints(gConfiguration.playerHP);
    this.hp.translate([0, this.getHeight()/2+0.3*this.getHeight(), 0]);
    this.addChild(this.hp);

    this.organsCollected = new Map();
    //gDeveloperTools.drawHitbox(this);
    gCollisionDetection.registerCollidable(this, 'walker');
    gCollisionDetection.registerCollidable(this, 'player');
    this.dead = false;


    let collider = new Collider("enemy");
    collider.setOnCollisionStay((otherObject) => {
      otherObject.takeDamage(gConfiguration.playerDamage);
      });
      collider.setOnCollisionEnter((otherObject) => {
        let otherObjectPosition = otherObject.getWorldPosition();
        let myPosition = this.getWorldPosition();
        if(otherObjectPosition[0]<myPosition[0]) otherObject.physicsComponent.addImpulse([-otherObject.getWidth()*10,0]);
        else otherObject.physicsComponent.addImpulse([otherObject.getWidth()*10,0]);
        otherObject.takeDamage(gConfiguration.playerDamage);
      });
    this.addCollider(collider);
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
