class ZombieFast extends Enemy {
    constructor() {
        super();
        this.init(1,1.5,"zombie",64/1024,64/1024);
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.setAnimationManager(this.createAnimations(this));
        this.addBehaviour(this.createAssaultBehaviour(this));
        gCollisionDetection.registerCollidable(this, "zombie");
    }

    isDeath(object) {
        //TODO Condition
        return false;
    }

    createAssaultBehaviour(object) {
        let assaultBehaviour = new Behaviour(object);
        assaultBehaviour.setInit(() => {
            assaultBehaviour.object.timer = 0;
            assaultBehaviour.object.direction = 0;
        });

        assaultBehaviour.setUpdate(() => {
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

    createAnimations(object) {
        let animationManager = new AnimationManager();

        let idleAnimation = new Animation2d();
        idleAnimation.addFrame(0, 0, 0.2);
        idleAnimation.addFrame(1, 0, 0.2);
        idleAnimation.addFrame(2, 0, 0.2);
        idleAnimation.addFrame(3, 0, 0.2);
        animationManager.addAnimation("idle", idleAnimation);

        let leftAnimation = new Animation2d();
        leftAnimation.addFrame(7, 9, 0.2);
        leftAnimation.addFrame(6, 9, 0.2);
        leftAnimation.addFrame(5, 9, 0.2);
        leftAnimation.addFrame(4, 9, 0.2);
        animationManager.addAnimation("left", leftAnimation);

        let rightAnimation = new Animation2d();
        rightAnimation.addFrame(0, 1, 0.2);
        rightAnimation.addFrame(1, 1, 0.2);
        rightAnimation.addFrame(2, 1, 0.2);
        rightAnimation.addFrame(3, 1, 0.2);
        animationManager.addAnimation("right", rightAnimation);

        let deathAnimation = new Animation2d();
        deathAnimation.addFrame(0, 3, 0.1);
        deathAnimation.addFrame(1, 3, 0.1);
        deathAnimation.addFrame(2, 3, 0.1);
        deathAnimation.addFrame(3, 3, 0.1);
        deathAnimation.addFrame(4, 3, 0.1);
        deathAnimation.addFrame(5, 3, 0.1);
        deathAnimation.addFrame(6, 3, 0.1);
        deathAnimation.addFrame(7, 3, 0.1);
        animationManager.addAnimation("death", deathAnimation);

        let conditionIdle= new AnimationTransitionCondition(object);
        conditionIdle.setEvaluate((condition) => {
            return condition.object.physicsComponent.velocity[0] == 0;
        });
        let conditionLeft = new AnimationTransitionCondition(object);
         conditionLeft.setEvaluate((condition) => {
            return condition.object.physicsComponent.velocity[0] < 0;
        });
        let conditionRight= new AnimationTransitionCondition(object);
        conditionRight.setEvaluate((condition) => {
            return condition.object.physicsComponent.velocity[0] > 0;
        });
        let conditionDeath= new AnimationTransitionCondition(object);
        conditionDeath.setEvaluate((condition) => {
            // isDeath()
            return false;
        });
        
        animationManager.addTransitionToEveryAnimation("idle", conditionIdle);
        animationManager.addTransitionToEveryAnimation("left", conditionLeft);
        animationManager.addTransitionToEveryAnimation("right", conditionRight);
        animationManager.addTransitionToEveryAnimation("death", conditionDeath);

        animationManager.setCurrentAnimation("idle");

        return animationManager;
    }
}