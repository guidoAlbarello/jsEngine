class AnimationManager {
    constructor() {
        this.currentAnimation = "";
        this.animations = [];
        this.transitions = [];
        this.animationNames = [];
    }


    addAnimation(animationName, animation) {
        this.animations[animationName] = animation;
        this.animationNames.push(animationName);
        if (!this.transitions[animationName])
            this.transitions[animationName] = [];
    }

    addTransition(animationFrom, animationTo, condition) {
        let transition = {
            "animationTo": animationTo,
            "condition": condition
        };

        this.transitions[animationFrom].push(transition);
        condition.init();
    }

    setCurrentAnimation(animationName) {
        this.currentAnimation = animationName;
    }

    getCurrentAnimation() {
        return this.animations[this.currentAnimation];
    }

    update() {
        for (let i = 0; i < this.transitions[this.currentAnimation].length; i++) {
            let possibleTransition = this.transitions[this.currentAnimation][i];
            possibleTransition.condition.update();
            if (possibleTransition.condition.evaluate()) {
                possibleTransition.condition.reset();
                this.currentAnimation = possibleTransition.animationTo;
                break;
            }
        }

        this.animations[this.currentAnimation].update();
    }

    addTransitionToEveryAnimation(animationTo, condition) {
        for (let i = 0; i < this.animationNames.length; i++) {
            if (this.animationNames[i] != animationTo) {
                // I know that the condition is not copied here, and every animation will share it
                // but no time to implement it another way. Also it works,
                // cause conditions are reset in each successful transition.
                this.addTransition(this.animationNames[i],animationTo, condition);
            }
        }
    }

    freeze(secondsToFreeze) {
         this.animations[this.currentAnimation].freeze(secondsToFreeze);
    }
}