class ExampleScene2d {
    constructor() {
        this.scene = new Scene();
    }

    build() {        
        this.scene.addCamera(new OrtographicCamera(), "ortho",);
        this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");

        this.scene.useCamera("ortho");
        
        // Load tilemap from file
        //let tileMap = TileMap.fromFile("tilemap.tm");

        // Create tilemap
        let tileMap = TileMap.newBuilder()
                             .setWidth(32)
                             .setHeight(32)
                             .setScaleTileInX(1)
                             .setScaleTileInY(1)
                             .setTileSize(32)
                             .setTextureSize(1024)
                             .setTexture("tilemap")
                             .build();

        tileMap.addTag("dirt", 4, 6);
        tileMap.addTag("water", 3, 21);

        tileMap.fillWith("dirt");

        tileMap.addTile("water", 4,4);
        tileMap.addTile("water", 4,5);
        tileMap.addTile("water", 5,4);
        tileMap.addTile("water", 5,5);

        // Create the player
        //let player = new Player();
        //let playerController = new PlayerController(player);
        //this.scene.setController(playerController);

        // Create an enemy with 2 animations. Each animation is loaded in a single texture atlas.
        // Assuming only one hitbox that changes size dependenging the animation.
       /* let enemy = new Sprite(1, 1, "enemy");

        // Inside sprite.update() 
        //     animationManager.update();
        //          if there's a trnasition from current state to another and the condition is true, change state. 
        let animationManager = new AnimationManager();
        
        let params = AnimationManager.makeAnimationParams();
        params.speed = 1;
        params.height = 1;
        params.width = 1;
        params.offset = 0;

        animationManager.addAnimation("idle", params);
        animationManager.addAnimation("moving_left", params);
        animationManager.addAnimation("moving_right", params);
        animationManager.addAnimation("moving_down", params);
        animationManager.addAnimation("moving_up", params);

        let condition = () => {
            return this.velocity[0] > 0;
        };
        animationManager.addTransition("idle", "moving_left", condition);

        animationManager.setInitialState("idle");
        
        enemy.setAnimationManager(animationManager);
        enemy.setPhysicsComponent(new PhysicsComponent2d());

        // Add elements to the scene.
        this.scene.addChild(player);*/
        this.scene.addChild(tileMap);
        //this.scene.addChild(enemy);

        return this.scene;
    }
}

ExampleScene2d.loadScene = () => {
    return new ExampleScene2d().build();
};