class Editor {
    constructor() {
        this.scene = new Scene();
    }

    build() {
        // Set up cameras
        this.scene.addCamera(new OrtographicCamera([0,0,20], [0,0,0], [0,1,0], 27, 48), "ortho");
        this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
        this.scene.useCamera("ortho");

        // Create playground
        let platformFactory = new PlatformFactory();
        let platform = platformFactory.create(PlatformType.NORMAL);
        platform.translate([0,4,0]);
        this.scene.addChild(platform);
        
        let platform2 = platformFactory.create(PlatformType.NORMAL);
        platform2.translate([0,8,0]);
        this.scene.addChild(platform2);

        let platform3 = platformFactory.create(PlatformType.NORMAL);
        platform3.translate([3,11,0]);
        this.scene.addChild(platform3);

        // Create entity to edit
        let entity = gEntityManager.instantiateObjectWithTag("player", Player);
       // entity.translate([4, 3, 0]);
        
        let playerController = new PlayerController(entity);
        this.scene.setController(playerController);

        // Create controller of the editor and add it to the scene
        //let editorController = new EditorController(entity);
        //this.scene.setController(editorController);
        entity.translate([0, entity.getHeight()/2, 0]);
        this.scene.addChild(entity);

        let plane2 = gSurfaceCreator.makeCube(0.2, 5, 5, 1, 1);
        plane2.translate([5,0,0]);
        plane2.setHitbox(new BoxHitbox(-0.1, -2.5, -2.5, 0.1, 2.5, 2.5));
        let geometryVolume = new GeometryVolume(0.2, 5, 5);
        plane2.addChild(geometryVolume);

        this.scene.addChild(plane2);

        return this.scene;
    }
}

Editor.loadScene = () => {
    return new Editor().build();
};