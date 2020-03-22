class GraveyardLevel {
    constructor() {
        this.scene = new Scene();
    }

    build() {
      
        return this.scene;
    }
}

GraveyardLevel.loadScene = () => {
    return new GraveyardLevel().build();
};