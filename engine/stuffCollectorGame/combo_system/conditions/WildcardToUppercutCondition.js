class WildcardToUppercutCondition extends ActionCondition {
    constructor() {
        super();
    }

    evaluate() {
        return gInputHandler.getInput("heavy_attack") && gInputHandler.getInput("up");
    }
}