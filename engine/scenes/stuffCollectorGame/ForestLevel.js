class ForestLevel {
    constructor() {
        this.scene = new Scene();
    }

    build() {

        return this.scene;
    }
}

ForestLevel.loadScene = () => {
    return new ForestLevel().build();
};