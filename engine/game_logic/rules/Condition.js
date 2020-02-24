class Condition {
    player;
    constructor() {
        this.init = () => {};
        this.completed = () => {return true};
    }

    setInit(init) {
        this.init = init;    
    }
    setCompletedCondition(completed) {
        this.completed = completed;
    }
}