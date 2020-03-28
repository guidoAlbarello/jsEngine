class Attack2Action extends Action {
    constructor (object) {
        super(Attack2Action.NAME, object);
        this.start_time = 0;
        this.end_time = 1.0;
        this.action_duration = 1.0; 
    }

    animationReaction() {
        this.object.animationManager.setCurrentAnimation("attack2");
    }

    gameplayReaction() {
        // Add code to damage here.
    }

    canSwitch() {
        // Attack command can't be cancelled inside time interval
        return !(this.timer >= this.start_time && this.timer <= this.end_time);
    }
}

Attack2Action.NAME = "attack2";