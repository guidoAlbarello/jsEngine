class ActionGraph {
    constructor() {
        this.currentAction = "";
        this.actions = [];
        this.transitions = [];
        this.transitions["*"] = [];

        // Added to cache this condition, to avoid searching for it every time a new action is selected.
        // Need to do this to set the action this condition is refering to. 
        this.defaultConditionToRoot = undefined;
        this.addAction(new RootAction(this.player));

        this.addDefaultRootTransition();
        this.currentAction = RootAction.NAME;
        this.defaultConditionToRoot.setAction(this.actions[this.currentAction]);
    }

    addAction(action) {
        this.actions[action.getName()] = action;
        if (!this.transitions[action.getName()]) this.transitions[action.getName()] = [];
    }

    // Deprecated
    addDefaultRootTransition() {
        this.defaultConditionToRoot = new ActionEndsToRootCondition();
        this.addTransition("*", RootAction.NAME, this.defaultConditionToRoot);
    }

    addTransition(src_action, dst_action, condition, name) {
        let transition = {
            "actionTo": dst_action,
            "condition": condition,
            "name": name
        };

        this.transitions[src_action].push(transition);
        condition.init();
    }

    setContext() { }

    checkTransition(possibleTransition) {
        possibleTransition.condition.update();
        if (possibleTransition.condition.evaluate()) {
            this.currentAction = possibleTransition.actionTo;
            this.defaultConditionToRoot.setAction(this.actions[this.currentAction]);
            this.actions[this.currentAction].execute(possibleTransition.condition.data());
            possibleTransition.condition.reset();
            return true;
        }

        return false;
    }
    update() {
        if (this.actions[this.currentAction].canSwitch()) {
            let transitionTaken = false;
            for (let i = 0; i < this.transitions[this.currentAction].length; i++) {
                transitionTaken = this.checkTransition(this.transitions[this.currentAction][i])
                if (transitionTaken) {
                    break;
                }
            }
            if (!transitionTaken) {
                for (let i = 0; i < this.transitions["*"].length; i++) {
                    if (this.checkTransition(this.transitions["*"][i])) {
                        break;
                    }
                }
            }
        }
        this.actions[this.currentAction].update();
    }
}

