class ZombieFast extends Zombie {
    constructor() {
        super();
        this.init(2,2.5,"zombie",64/1024,64/1024);
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.setAnimationManager(this.createAnimations(this));
        this.addBehaviour(this.createAssaultBehaviour(this));
        gCollisionDetection.registerCollidable(this, "zombie");
    }

    createAssaultBehaviour(object) {
        let assaultBehaviour = new Behaviour(object);
        assaultBehaviour.setInit(() => {
            assaultBehaviour.object.timer = 0;
            assaultBehaviour.object.direction = 0;
        });

        assaultBehaviour.setUpdate(() => {
            if(assaultBehaviour.object.isDead()){
                if(this.durationDeath <= 0) this.remove();
                this.durationDeath-=1*gDeltaTime;
            }

            let player = gQuerySystem.getPlayer();
            let distance = vec3.create();
            let moveTo = 0;

            vec3.scaleAndAdd(distance, object.getWorldPosition(), player.getWorldPosition(), -1);
            if (vec3.length(distance) < 10) {
                
                if(distance[0] < 0) {
                    moveTo = 1;
                } else if (distance[0] > 0) {
                    moveTo = -1;
                } else {
                    moveTo = 0;
                }
                assaultBehaviour.object.direction = 5 * moveTo;

            } else {
                assaultBehaviour.object.direction = 0;
            }

            assaultBehaviour.object.physicsComponent.setVelocity([assaultBehaviour.object.direction, 0]);
            });

        return assaultBehaviour;
    }

}