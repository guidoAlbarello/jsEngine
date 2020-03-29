class Sword extends Sprite {
  constructor(direction=[1,0], speed=5) {
    super(0.75, 0.25, 'violet', 1, 1);
    this.setPhysicsComponent(new PhysicsComponent2d());
    this.addBehaviour(this.createBehaviour(this));
    this.direction = direction;
    this.duration = 2*gDeltaTime;


    let collider = new Collider("enemy");
    collider.setOnCollisionStay((otherObject) => {
      otherObject.takeDamage(gConfiguration.swordDamage);
    });
    collider.setOnCollisionEnter((otherObject) => {
      otherObject.takeDamage(gConfiguration.swordDamage);
    });
    this.addCollider(collider);
  }

  createBehaviour(object){
    let behaviour = new Behaviour(object);

    behaviour.setUpdate(() => {
        if(behaviour.object.duration<=0) behaviour.object.remove();
        behaviour.object.duration-=gDeltaTime;
    });

    return behaviour;
  }
}
