class LevelScene {
    constructor() {
        this.scene = new Scene();
    }

    build() {        
        this.scene.addCamera(new OrtographicCamera([0,0,100]), "ortho");
        this.scene.useCamera("ortho");

        return this.scene;
    }
}

LevelScene.loadScene = () => {
    return new LevelScene().build();
};