class Player extends Sprite {
  constructor() {
    // Init player sprite.
    super(3, 2.22, 'player', 50/512, 37/1024);

    this.setPhysicsComponent(new PhysicsComponent2d());
    this.physicsComponent.setGravity(1);

    this.hp = new HealthPoints(gConfiguration.playerHP);
    this.hp.translate([0, this.getHeight()/2+0.3*this.getHeight(), 0]);
    this.addChild(this.hp);

    this.wallJumpDirection = [0,0];

    this.setAnimationManager(this.createAnimations(this));

    this.inventory = new Map();

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
    return this.inventory;
  }

  getVelocity() {
    return this.physicsComponent.getVelocity();
  }

  createAnimations(object) {
    let animationManager = new AnimationManager();

    animationManager.addAnimation("idle", Animation2d.fromRow(0, 0, 4, 1/6));
    animationManager.addAnimation("left", Animation2d.fromRow(1, 1, 6, 1/12, /*flip=*/ true));
    animationManager.addAnimation("right", Animation2d.fromRow(1, 1, 6, 1/12));
    animationManager.addAnimation("death", Animation2d.fromRow(9, 0, 6, 1/3));

    let conditionIdle = new AnimationTransitionCondition(object);
    conditionIdle.setEvaluate((condition) => {
      return condition.object.physicsComponent.velocity[0] == 0;
    });

    let conditionLeft = new AnimationTransitionCondition(object);
    conditionLeft.setEvaluate((condition) => {
      return condition.object.physicsComponent.velocity[0] < 0;
    });

    let conditionRight = new AnimationTransitionCondition(object);
    conditionRight.setEvaluate((condition) => {
      return condition.object.physicsComponent.velocity[0] > 0;
    });

    let conditionDeath = new AnimationTransitionCondition(object);
    conditionDeath.setEvaluate((condition) => {
      return condition.object.isDead();
    });

    animationManager.addTransitionToEveryAnimation("idle", conditionIdle);
    animationManager.addTransitionToEveryAnimation("left", conditionLeft);
    animationManager.addTransitionToEveryAnimation("right", conditionRight);
    animationManager.addTransitionToEveryAnimation("death", conditionDeath);

    animationManager.setCurrentAnimation("idle");

    return animationManager;
  }

  addToInventory(object) {
    if(this.inventory.has(object)) {
      this.inventory.set(object,this.inventory.get(object)+1);
    } else{
      this.inventory.set(object,1);
    }
  }
}
