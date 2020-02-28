class LevelScene {
    constructor() {
        this.scene = new Scene();
    }

    build() {        
        
    }
}

LevelScene.loadScene = () => {
    return new LevelScene().build();
};