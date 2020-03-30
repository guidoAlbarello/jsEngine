class SkySlamAction extends Action {
    constructor (object) {
        super(SkySlamAction.NAME, object);
        this.start_time = 0;
        this.end_time = 1.0;
        this.action_duration = 1.0; 
        this.slam_speed = 50;
    }

    animationReaction() {
        this.object.animationManager.setCurrentAnimation("sky_slam");
    }

    gameplayReaction() {
        this.object.physicsComponent.addImpulse([0, -this.slam_speed]);
        // Add damage
    }

    canSwitch() {
        // Attack command can't be cancelled inside time interval
        return !(this.timer >= this.start_time && this.timer <= this.end_time);
    }
}

SkySlamAction.NAME = "sky_slam";