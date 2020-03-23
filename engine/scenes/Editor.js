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
        let entity = gEntityManager.instantiateObjectWithTag("player", Player);
        entity.translate([0,5,0]);

        let playerController = new PlayerController(entity);
        this.scene.setController(playerController);

        // Create controller of the editor and add it to the scene
        //let editorController = new EditorController(entity);
        //this.scene.setController(editorController);
        entity.translate([0, entity.getHeight()/2, 0]);
        this.scene.addChild(entity);

        // Create support plane
        let plane = gSurfaceCreator.makeCube(5, 0.2, 5, 1, 1);
        plane.translate([0, 2, 0]);
        plane.setHitbox(new BoxHitbox(-2.5, -0.1, -2.5, 2.5, 0.1, 2.5));
        plane.setPhysicsComponent(new PhysicsComponent());
        plane.addPhysicsCollider();
        plane.physicsComponent.setIsKinematic(true);
        plane.physicsComponent.setMass(1000);
        plane.physicsComponent.setMovility([0, 0, 0]);
        this.scene.addChild(plane);

        let plane2 = gSurfaceCreator.makeCube(5, 0.2, 5, 1, 1);
        plane2.translate([-3, -1, 0]);
        plane2.setHitbox(new BoxHitbox(-2.5, -0.1, -2.5, 2.5, 0.1, 2.5));
        plane2.setPhysicsComponent(new PhysicsComponent());
        plane2.addPhysicsCollider();
        plane2.physicsComponent.setIsKinematic(true);
        plane2.physicsComponent.setMass(1000);
        plane2.physicsComponent.setMovility([0, 0, 0]);
        this.scene.addChild(plane2);

        return this.scene;
    }
}

Editor.loadScene = () => {
    return new Editor().build();
};