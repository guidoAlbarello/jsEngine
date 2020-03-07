class AnimationTransitionCondition { 
    constructor(object) {
        this.object = object;
        this.init = () => {};
        this.update = () => {};
        this.evaluate = () => {};
        this.reset = () => {};
    }

    setObject(object) {
        this.object = object;
    }
    
    setInit(init) {
        this.init = () => {init(this)};
    }

    setUpdate(update) {
        this.update = () => {update(this)};
    }

    setEvaluate(evaluate) {
        this.evaluate = () => {return evaluate(this)};
    }

    setReset(reset) {
        this.reset = () => {reset(this)};
    }
}