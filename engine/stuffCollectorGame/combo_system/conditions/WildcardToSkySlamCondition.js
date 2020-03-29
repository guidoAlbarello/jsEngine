class WildcardToSkySlamCondition extends ActionCondition {
    constructor(object) {
        super();
        this.object = object;
    }

    setObject(object) {
        this.object = object;
    }

    evaluate() {
        return gInputHandler.getInput("heavy_attack") && gInputHandler.getInput("down") && (this.object.physicsComponent.velocity[1] < 0);
    }
}