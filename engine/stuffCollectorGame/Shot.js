class Shot extends Sprite {
  constructor(direction=[1,0], speed=5) {
    super(0.33, 0.25, 'red', 1, 1);
    this.setPhysicsComponent(new PhysicsComponent2d());
    this.addBehaviour(this.createPatrolBehaviour(this));
    this.direction = direction;
    this.duration = 5;
    this.speed = speed;


    let collider = new Collider("enemy");
    collider.setOnCollisionStay((otherObject) => {
      this.remove();
    });
    collider.setOnCollisionEnter((otherObject) => {
      otherObject.takeDamage(gConfiguration.shotDamage);
    });
    this.addCollider(collider);
  }

  createPatrolBehaviour(object){
    let patrolBehaviour = new Behaviour(object);

    patrolBehaviour.setUpdate(() => {
        if(patrolBehaviour.object.duration<=0) patrolBehaviour.object.remove();
        
        patrolBehaviour.object.physicsComponent.setVelocity([patrolBehaviour.object.direction[0]*patrolBehaviour.object.speed, patrolBehaviour.object.direction[1]**patrolBehaviour.object.speed]);
        patrolBehaviour.object.duration-=gDeltaTime;
    });

    return patrolBehaviour;
  }

}
