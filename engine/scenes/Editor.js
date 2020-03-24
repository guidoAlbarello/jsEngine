class Editor {
    constructor() {
        this.scene = new Scene();
    }

    build() {
        // Set up cameras
        this.scene.addCamera(new OrtographicCamera([0,0,20], [0,0,0], [0,1,0], 45, 80), "ortho");
        this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
        this.scene.useCamera("ortho");

        // Create playground
        let platformFactory = new PlatformFactory();
        let platform = platformFactory.create(PlatformType.NORMAL);
        platform.translate([4,4,0]);
        this.scene.addChild(platform);
        
        let platform2 = platformFactory.create(PlatformType.NORMAL);
        platform2.translate([8,8,0]);
        this.scene.addChild(platform2);

        let platform3 = platformFactory.create(PlatformType.NORMAL);
        platform3.translate([12,11,0]);
        this.scene.addChild(platform3);

        let platform4 = platformFactory.create(PlatformType.NORMAL);
        platform4.translate([17,4,0]);
        this.scene.addChild(platform4);
        
        let platform5 = platformFactory.create(PlatformType.NORMAL);
        platform5.translate([16,18,0]);
        this.scene.addChild(platform5);

        let platform6 = platformFactory.create(PlatformType.NORMAL);
        platform6.translate([6,16,0]);
        this.scene.addChild(platform6);

        // Create entity to edit
        let entity = gEntityManager.instantiateObjectWithTag("player", Player);
        entity.translate([0, 3, 0]);

        let zombie = gEntityManager.instantiateObjectWithTag("zombie", Zombie);
        zombie.translate([10, 1, 0]);
        
        let zombieF = gEntityManager.instantiateObjectWithTag("zombieF", ZombieFast);
        zombieF.translate([-11, 1, 0]);

        let playerController = new PlayerController(entity);
        this.scene.setController(playerController);

        // Create controller of the editor and add it to the scene
        //let editorController = new EditorController(entity);
        //this.scene.setController(editorController);
        entity.translate([0, entity.getHeight()/2, 0]);
        this.scene.addChild(entity);
        this.scene.addChild(zombie);
        this.scene.addChild(zombieF);

        let plane2 = gSurfaceCreator.makeCube(55, 0.2, 5, 1, 1);
        plane2.setHitbox(new BoxHitbox(-22.5, -0.1, -2.5, 22.5, 0.1, 2.5));
        let geometryVolume = new GeometryVolume(50, 0.2, 25);
        plane2.addChild(geometryVolume);

        this.scene.addChild(plane2);

        return this.scene;
    }
}

Editor.loadScene = () => {
    return new Editor().build();
};