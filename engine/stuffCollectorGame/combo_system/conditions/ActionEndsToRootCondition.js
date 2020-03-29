class ActionEndsToRootCondition extends ActionCondition {
    constructor() {
        super();
        this.action = undefined;
    }

    setAction(action) {
        this.action = action;
    }

    evaluate() {
        return this.action.getTimer() >= this.action.getActionDuration();
    }
}