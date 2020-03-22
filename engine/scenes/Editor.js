class Editor {
    constructor() {
        this.scene = new Scene();
    }

    build() {
        // Set up cameras
        this.scene.addCamera(new OrtographicCamera([0,0,20], [0,0,0], [0,1,0], 15, 15), "ortho");
        this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
        this.scene.useCamera("ortho");

        // Create entity to edit
        let entity = gEntityManager.instantiateObjectWithTag("zombie", Zombie);
        
        // Create controller of the editor and add it to the scene
        let editorController = new EditorController(entity);
        this.scene.setController(editorController);
        entity.translate([0, entity.getHeight()/2, 0]);
        this.scene.addChild(entity);

        // Create support plane
        let plane = gSurfaceCreator.makeCube(5, 0.2, 5, 1, 1);
        
        this.scene.addChild(plane);
        return this.scene;
    }
}

Editor.loadScene = () => {
    return new Editor().build();
};