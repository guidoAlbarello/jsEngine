class Shot extends Sprite {
  constructor(direction=[1,0], speed=5, shotDamage=2) {
    super(0.33, 0.25, 'red', 1, 1);
    this.setPhysicsComponent(new PhysicsComponent2d());
    this.addBehaviour(this.createBehaviour(this));
    this.direction = direction;
    this.duration = 1;
    this.speed = speed;


    let collider = new Collider("enemy");
    collider.setOnCollisionStay((otherObject) => {
      this.remove();
    });
    collider.setOnCollisionEnter((otherObject) => {
      otherObject.takeDamage(shotDamage);
    });
    this.addCollider(collider);
  }

  createBehaviour(object){
    let behaviour = new Behaviour(object);

    behaviour.setUpdate(() => {
        if(behaviour.object.duration<=0) behaviour.object.remove();
        
        behaviour.object.physicsComponent.setVelocity([behaviour.object.direction[0]*behaviour.object.speed, behaviour.object.direction[1]*behaviour.object.speed]);
        behaviour.object.duration-=gDeltaTime;
    });

    return behaviour;
  }

}
