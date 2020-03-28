class WildcardToAttack1Condition extends ActionCondition {
    constructor() {
        super();
    }

    evaluate() {
        return gInputHandler.getInput("light_attack");
    }
}