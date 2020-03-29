class RootAction extends Action {
    constructor(object) {
        super(RootAction.NAME, object);
        this.action_duration = 10000000; // INIFINITY. Hardcoded hard limit to mitigate cycle.
    }
}

RootAction.NAME = "root";