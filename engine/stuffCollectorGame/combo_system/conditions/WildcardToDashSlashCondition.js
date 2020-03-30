class WildcardToDashSlashCondition extends ActionCondition {
    constructor() {
        super();
        this.direction = [0,0];
    }

    update() {
        if (gInputHandler.getInput("right")) {
            this.direction[0] = 1;
        } else if (gInputHandler.getInput("left")) {
            this.direction[0] = -1;
        } else {
            this.direction[0] = 0;
        }

        if (gInputHandler.getInput("up")) {
            this.direction[1] = 1;
        } else if (gInputHandler.getInput("down")) {
            this.direction[1] = -1;
        } else {
            this.direction[1] = 0;
        }
    }

    evaluate() {
        return gInputHandler.getInput("dash_attack") && (this.direction[0] != 0 || this.direction[1] != 0);
    }

    data() {
        return {
           direction: this.direction
        };
    }

    reset() {
        this.direction = [0,0];
    }
}