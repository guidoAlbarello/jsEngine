class ExampleScene2d {
    constructor() {
        this.scene = new Scene();
    }

    build() {
        this.setupCameras();
        this.setupTileMap();
        this.setupPlayer();
        this.setupEnemy();

        return this.scene;
    }

    setupCameras() {
        this.scene.addCamera(new OrtographicCamera(), "ortho");
        this.scene.useCamera("ortho");
    }

    setupTileMap() {
        let tileMap = TileMap.newBuilder()
            .setWidth(32)
            .setHeight(32)
            .setScaleTileInX(1)
            .setScaleTileInY(1)
            .setTileSize(32)
            .setTextureSize(1024)
            .setTexture("tilemap")
            .build();

        tileMap.translate([-16, -16, 0]);

        tileMap.addTag("dirt", 4, 6);
        tileMap.addTag("water", 3, 21);

        tileMap.fillWith("dirt");

        tileMap.addTile("water", 4, 4);
        tileMap.addTile("water", 4, 5);
        tileMap.addTile("water", 5, 4);
        tileMap.addTile("water", 5, 5);

        this.scene.addChild(tileMap);
    }

    setupPlayer() {
        // Create the player
        let player = new Player();
        player.translate([0,2,0]);
        
        // Create a player controller and set the player to it. 
        // This way we can control the player with input.
        let playerController = new PlayerController(player);
        this.scene.setController(playerController);

        // Add animation maanger for player
        player.setAnimationManager(this.createAnimations(player));

        // Add a trigger for when the player collides with an object tagged "enemy"
        // When the player collides, the callback passed to setOnCollisionEnter is executed.
        let collider = new Collider("enemy");
        collider.setOnCollisionEnter((enemy) => {
            alert("GAME OVER. You've made contact with object  " + enemy.getId())
        });
        player.addCollider(collider);

        // Added player to the scene
        this.scene.addChild(player);
    }

    setupEnemy() {
        let enemy = new Sprite(1, 1, "entity", 64 / 256, 64 / 256);

        // Add animation manager for enemy
        enemy.setAnimationManager(this.createAnimations(enemy));

        // Add a physics component to the enemy so it can move
        enemy.setPhysicsComponent(new PhysicsComponent2d());

        // Add a patrol behaviour to the enemy.

        // Modify behaivour signature to avoid closing over object.
        let patrolBehaviour = new Behaviour(enemy);
        patrolBehaviour.setInit(() => {
            patrolBehaviour.object.timer = 0;
            patrolBehaviour.object.direction = 1;
        });

        patrolBehaviour.setUpdate(() => {
            patrolBehaviour.object.timer += gDeltaTime;
            if (patrolBehaviour.object.timer >= 3) {
                patrolBehaviour.object.timer = 0;
                patrolBehaviour.object.direction *= -1;
            }
            patrolBehaviour.object.physicsComponent.setVelocity([patrolBehaviour.object.direction, 0]);
        });
        enemy.addBehaviour(patrolBehaviour);

        // Register the enemy as an entity that can be collided with with the tag "enemy"
        gCollisionDetection.registerCollidable(enemy, "enemy");

        this.scene.addChild(enemy);
    }

    createAnimations(object) {
        let animationManager = new AnimationManager();

        // Create animation's frames and add them to animation manager
        let forwardAnimation = new Animation2d();
        forwardAnimation.addFrame(0, 0, 0.2);
        forwardAnimation.addFrame(1, 0, 0.2);
        forwardAnimation.addFrame(2, 0, 0.2);
        forwardAnimation.addFrame(3, 0, 0.2);
        animationManager.addAnimation("forward", forwardAnimation);

        let backwardsAnimation = new Animation2d();
        backwardsAnimation.addFrame(0, 3, 0.2);
        backwardsAnimation.addFrame(1, 3, 0.2);
        backwardsAnimation.addFrame(2, 3, 0.2);
        backwardsAnimation.addFrame(3, 3, 0.2);
        animationManager.addAnimation("backwards", backwardsAnimation);

        let leftAnimation = new Animation2d();
        leftAnimation.addFrame(0, 1, 0.2);
        leftAnimation.addFrame(1, 1, 0.2);
        leftAnimation.addFrame(2, 1, 0.2);
        leftAnimation.addFrame(3, 1, 0.2);
        animationManager.addAnimation("left", leftAnimation);

        let rightAnimation = new Animation2d();
        rightAnimation.addFrame(0, 2, 0.2);
        rightAnimation.addFrame(1, 2, 0.2);
        rightAnimation.addFrame(2, 2, 0.2);
        rightAnimation.addFrame(3, 2, 0.2);
        animationManager.addAnimation("right", rightAnimation);

        // Create transition conditions for the animations.
        let conditionLeft = new AnimationTransitionCondition(object);
         conditionLeft.setEvaluate((condition) => {
            return condition.object.physicsComponent.velocity[0] <= 0;
        });
        let conditionRight= new AnimationTransitionCondition(object);
        conditionRight.setEvaluate((condition) => {
            return condition.object.physicsComponent.velocity[0] > 0;
        });
        let conditionForward= new AnimationTransitionCondition(object);
        conditionForward.setEvaluate((condition) => {
            return condition.object.physicsComponent.velocity[1] > 0;
        });
        let conditionBackwards = new AnimationTransitionCondition(object);
        conditionBackwards.setEvaluate((condition) => {
            return condition.object.physicsComponent.velocity[1] < 0;
        });
        animationManager.addTransitionToEveryAnimation("forward", conditionForward);
        animationManager.addTransitionToEveryAnimation("backwards", conditionBackwards);
        animationManager.addTransitionToEveryAnimation("left", conditionLeft);
        animationManager.addTransitionToEveryAnimation("right", conditionRight);

        animationManager.setCurrentAnimation("backwards");

        return animationManager;
    }
}

ExampleScene2d.loadScene = () => {
    return new ExampleScene2d().build();
};