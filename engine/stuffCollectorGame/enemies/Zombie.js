class Zombie extends Enemy {
    constructor() {
        super();
        this.init(2,2.5,"zombie",64/1024,64/1024);
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.setAnimationManager(this.createAnimations(this));
        this.addBehaviour(this.createPatrolBehaviour(this));
        gCollisionDetection.registerCollidable(this, "zombie");
        this.durationDeath = 1;
    }

    createPatrolBehaviour(object){

        let patrolBehaviour = new Behaviour(object);
        patrolBehaviour.setInit(() => {
            patrolBehaviour.object.timer = 0;
            patrolBehaviour.object.direction = 0;
        });

        patrolBehaviour.setUpdate(() => {
            if(patrolBehaviour.object.isDead()){
                if(this.durationDeath <= 0) this.remove();
                this.durationDeath-=1*gDeltaTime;
            }
            patrolBehaviour.object.timer += gDeltaTime;
            if (patrolBehaviour.object.timer >= 8) {
                patrolBehaviour.object.direction = 0;
                patrolBehaviour.object.timer = 0;
            } else if (patrolBehaviour.object.timer >= 6) {
                patrolBehaviour.object.direction = -5;
            } else if (patrolBehaviour.object.timer >= 4) {
                patrolBehaviour.object.direction = 0;
            } else if (patrolBehaviour.object.timer >= 2) {
                patrolBehaviour.object.direction = 5;
            } else if (patrolBehaviour.object.timer >= 0) {
                patrolBehaviour.object.direction = 0;
            }
            patrolBehaviour.object.physicsComponent.setVelocity([patrolBehaviour.object.direction, 0]);
        });

        return patrolBehaviour;
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
            return condition.object.isDead();
        });
        
        animationManager.addTransitionToEveryAnimation("idle", conditionIdle);
        animationManager.addTransitionToEveryAnimation("left", conditionLeft);
        animationManager.addTransitionToEveryAnimation("right", conditionRight);
        animationManager.addTransitionToEveryAnimation("death", conditionDeath);

        animationManager.setCurrentAnimation("idle");

        return animationManager;
    }
}