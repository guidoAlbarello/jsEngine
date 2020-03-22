class Overview {
    constructor() {
        this.scene = new Scene();
    }

    build() {
        
        this.setupCameras();
        this.setupPlayer();
        //this.setupEnemy();
        this.setupPlatform();

        // Create support plane
        let plane = gSurfaceCreator.makeCube(30, 0.2, 5, 1, 1);

        // Set skybox
        let skybox = gSurfaceCreator.makeSphere(100, 70);
        skybox.setMaterial(new SkyboxMaterial("skybox"));
        this.scene.addChild(skybox);

        this.scene.addChild(plane);
        return this.scene;
    }

    setupCameras() {
        // Set up cameras
        this.scene.addCamera(new OrtographicCamera([0, 0, 20], [0, 0, 0], [0, 1, 0], 30, 30), "ortho");
        this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
        this.scene.useCamera("ortho");
    }

    setupPlayer() {
        // Create the player
        let player = gEntityManager.instantiateObjectWithTag("player", Player);
        player.translate([0,1 + player.getHeight() / 2,0]);
        
        // Create a player controller and set the player to it. 
        // This way we can control the player with input.
        let playerController = new PlayerController(player);
        this.scene.setController(playerController);

        // Add animation maanger for player
        //player.setAnimationManager(this.createAnimations(player));


        // Added player to the scene
        this.scene.addChild(player);
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

    setupEnemy() {
        let enemyFactory = new EnemyFactory();
        
        // Create entities to showcase
        let zombie = enemyFactory.create(EnemyType.ZOMBIE);
        let dragon = enemyFactory.create(EnemyType.DRAGON);
        let wolf = enemyFactory.create(EnemyType.WOLF);
        let guard = enemyFactory.create(EnemyType.GUARD);
        
        zombie.translate([0, 1 + zombie.getHeight() / 2, 0])
        dragon.translate([-3, 1 + dragon.getHeight() / 2, 0])
        wolf.translate([-6, 1 + wolf.getHeight() / 2, 0])
        guard.translate([-9, 1 + guard.getHeight() / 2, 0])
        
        this.scene.addChild(zombie);
        this.scene.addChild(dragon);
        this.scene.addChild(wolf);
        this.scene.addChild(guard);
        
        // Create controller
        let editorController = new EditorController(zombie);
        this.scene.setController(editorController);
    }

    setupPlatform(){
        let platformFactory = new PlatformFactory();

        let platform = platformFactory.create(PlatformType.NORMAL);
        let tomb = platformFactory.create(PlatformType.TOMB);
        let bouncyPlatform = platformFactory.create(PlatformType.BOUNCY);
        let destroyablePlatform = platformFactory.create(PlatformType.DESTROYABLE);

        platform.translate([3, 1 + platform.getHeight() / 2, 0])
        tomb.translate([6, 1 + tomb.getHeight() / 2, 0])
        bouncyPlatform.translate([9, 1 + bouncyPlatform.getHeight() / 2, 0])
        destroyablePlatform.translate([12, 1 + destroyablePlatform.getHeight() / 2, 0])

        this.scene.addChild(platform);
        this.scene.addChild(tomb);
        this.scene.addChild(bouncyPlatform);
        this.scene.addChild(destroyablePlatform);
    }

}


Overview.loadScene = () => {
    return new Overview().build();
};