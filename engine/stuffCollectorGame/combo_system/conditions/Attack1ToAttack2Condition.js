class Attack1ToAttack2Condition extends ActionCondition {
    constructor() {
        super();
    }

    evaluate() {
        return gInputHandler.getInput("light_attack");
    }
}