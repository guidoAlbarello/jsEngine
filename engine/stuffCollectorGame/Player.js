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
    this.jumping = false;

    let updateHpBar = new Behaviour(this);
    updateHpBar.setUpdate(() => {
      this.hp.material.setLife(this.hp.getHP());
      this.hp.material.setTotalLife(this.hp.hpMax);
      console.log(this.hp.hpMax + ", " + this.hp.hp);
    });
    this.addBehaviour(updateHpBar);
  }

  walk(velocityX) {
    this.physicsComponent.setVelocityX(velocityX);
  }

  jump(height) {
    this.physicsComponent.addImpulse([-this.physicsComponent.gravity[0] * height, -this.physicsComponent.gravity[1] * height]);
    this.jumping = true;
  }

  finishJump() {
    this.jumping = false;
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

  isDead() {
    return this.dead;
  }

  isJumping() {
    return this.jumping;
  }

  getInventory() {
    return this.inventory;
  }

  getVelocity() {
    return this.physicsComponent.getVelocity();
  }

  isGoingLeft() {
    return this.physicsComponent.getVelocity()[0] < 0;
  }

  isGoingRight() {
    return this.physicsComponent.getVelocity()[0] > 0;
  }

  isIdle() {
    return this.physicsComponent.getVelocity()[0] == 0;
  }

  createAnimations(object) {
    let animationManager = new AnimationManager();

    animationManager.addAnimation("idle", Animation2d.fromRow(0, 0, 4, 1/6));
    animationManager.addAnimation("left", Animation2d.fromRow(1, 1, 6, 1/12, /*flip=*/ true));
    animationManager.addAnimation("jumpRight",
        Animation2d.fromRow(2, 0, 7, 1/12).addAnimation(
        Animation2d.fromRow(3, 0, 3, 1/12)));
    animationManager.addAnimation("jumpLeft",
        Animation2d.fromRow(2, 0, 7, 1/12, /*flip=*/ true).addAnimation(
        Animation2d.fromRow(3, 0, 3, 1/12, /*flip=*/ true)));
    animationManager.addAnimation("right", Animation2d.fromRow(1, 1, 6, 1/12));
    animationManager.addAnimation("death", Animation2d.fromRow(9, 0, 6, 1/3));

    let conditionIdle = new AnimationTransitionCondition(object);
    conditionIdle.setEvaluate((condition) => {
      return condition.object.isIdle() && !condition.object.isJumping();
    });

    let conditionLeft = new AnimationTransitionCondition(object);
    conditionLeft.setEvaluate((condition) => {
      return condition.object.isGoingLeft() && !condition.object.isJumping();
    });

    let conditionRight = new AnimationTransitionCondition(object);
    conditionRight.setEvaluate((condition) => {
      return condition.object.isGoingRight() && !condition.object.isJumping();
    });

    let conditionDeath = new AnimationTransitionCondition(object);
    conditionDeath.setEvaluate((condition) => {
      return condition.object.isDead();
    });

    let conditionJumpLeft = new AnimationTransitionCondition(object);
    conditionJumpLeft.setEvaluate((condition) => {
      return condition.object.isGoingLeft() && condition.object.isJumping();
    });

    let conditionJumpRight = new AnimationTransitionCondition(object);
    conditionJumpRight.setEvaluate((condition) => {
      return condition.object.isGoingRight() && condition.object.isJumping();
    });



    animationManager.addTransitionToEveryAnimation("idle", conditionIdle);
    animationManager.addTransitionToEveryAnimation("left", conditionLeft);
    animationManager.addTransitionToEveryAnimation("right", conditionRight);
    animationManager.addTransitionToEveryAnimation("jumpRight", conditionJumpRight);
    animationManager.addTransitionToEveryAnimation("jumpLeft", conditionJumpLeft);
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
