class LSystemScene {
    constructor() {
        this.scene = new Scene();
    }

    build() {        
        this.scene.addCamera(new OrtographicCamera([0,0,100]), "ortho");
        this.scene.addCamera(new OrbitalCamera(20, [0.0, 0.0, 0.0]), "orbital");
        this.scene.useCamera("ortho");
        
        let productionRules = {
            "X" : "F+[[X]-X]-F[-FX]+X",
            "F" : "FF"
        }

        let lSystem = new LSystem("X", productionRules);
        this.scene.addChild(new FractalPlantInterpreter().traduce(lSystem.produce(8)));

        return this.scene;
    }
}

LSystemScene.loadScene = () => {
    return new LSystemScene().build();
};