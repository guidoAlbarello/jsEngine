class UppercutAction extends Action {
    constructor (object) {
        super(UppercutAction.NAME, object);
        this.start_time = 0;
        this.end_time = 1.0;
        this.action_duration = 1.0; 
        this.uppercut_speed = 20;
    }

    animationReaction() {
        this.object.animationManager.setCurrentAnimation("uppercut");
    }

    gameplayReaction() {
        this.object.physicsComponent.addImpulse([0, this.uppercut_speed]);
        // Add code to damage here.
        // Add logic if an enemy is reached by this attack, it will also get in the air. 
        // Pseudocode maybe:
        //   If attack.collidesWith(enemy) { addImpulseToENemy() or translate enemy to player + delta in x direction}
    }

    canSwitch() {
        // Attack command can't be cancelled inside time interval
        return !(this.timer >= this.start_time && this.timer <= this.end_time);
    }
}

UppercutAction.NAME = "uppercut";