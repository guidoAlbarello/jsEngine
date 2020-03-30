class Attack1Action extends Action {
    constructor (object) {
        super(Attack1Action.NAME, object);
        this.start_time = 0;
        this.end_time = 0.7;
        let attack2_input_window = 0.2;
        this.action_duration = 0.7 + attack2_input_window; 
    }

    animationReaction() {
        this.object.animationManager.setCurrentAnimation("attack1");
    }

    gameplayReaction() {
        // Add code to damage here.
    }

    canSwitch() {
        // Attack command can't be cancelled inside time interval
        return !(this.timer >= this.start_time && this.timer <= this.end_time);
    }
}

Attack1Action.NAME = "attack1";