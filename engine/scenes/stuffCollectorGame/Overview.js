class Overview {
    constructor() {
        this.scene = new Scene();
    }

    build() {
        // Set up cameras
        this.scene.addCamera(new OrtographicCamera([0, 0, 20], [0, 0, 0], [0, 1, 0], 27, 48), "ortho");
        this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
        this.scene.useCamera("ortho");

        let enemyFactory = new EnemyFactory();
        let platformFactory = new PlatformFactory();

        // Create entities to showcase
        let zombie = enemyFactory.create(EnemyType.ZOMBIE);
        let dragon = enemyFactory.create(EnemyType.DRAGON);
        let wolf = enemyFactory.create(EnemyType.WOLF);
        let guard = enemyFactory.create(EnemyType.GUARD);
        let platform = platformFactory.create(PlatformType.NORMAL);
        let tomb = platformFactory.create(PlatformType.TOMB);
        let bouncyPlatform = platformFactory.create(PlatformType.BOUNCY);
        let destroyablePlatform = platformFactory.create(PlatformType.DESTROYABLE);
        let player = gEntityManager.instantiateObject(Player);

        player.translate([0, 1 + player.getHeight()/2, 0]);
        zombie.translate([-4, 1 + zombie.getHeight() / 2, 0])
        dragon.translate([-8, 1 + dragon.getHeight() / 2, 0])
        wolf.translate([-12, 1 + wolf.getHeight() / 2, 0])
        guard.translate([-16, 1 + guard.getHeight() / 2, 0])
        platform.translate([4, 1 + platform.getHeight() / 2, 0])
        tomb.translate([8, 1 + tomb.getHeight() / 2, 0])
        bouncyPlatform.translate([12, 1 + bouncyPlatform.getHeight() / 2, 0])
        destroyablePlatform.translate([16, 1 + destroyablePlatform.getHeight() / 2, 0])

        this.scene.addChild(player);
        this.scene.addChild(zombie);
        this.scene.addChild(dragon);
        this.scene.addChild(wolf);
        this.scene.addChild(guard);
        this.scene.addChild(platform);
        this.scene.addChild(tomb);
        this.scene.addChild(bouncyPlatform);
        this.scene.addChild(destroyablePlatform);

        // Create controller
        let editorController = new EditorController(zombie);
        this.scene.setController(editorController);

        // Create support plane
        let plane = gSurfaceCreator.makeCube(40, 0.2, 5, 1, 1);

        // Set skybox
        let skybox = gSurfaceCreator.makeSphere(100, 70);
        skybox.setMaterial(new SkyboxMaterial("skybox"));
        this.scene.addChild(skybox);

        this.scene.addChild(plane);
        return this.scene;
    }
}

Overview.loadScene = () => {
    return new Overview().build();
};