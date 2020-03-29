class DashSlashAction extends Action {
    constructor (object) {
        super(DashSlashAction.NAME, object);
        this.start_time = 0;
        this.end_time = 1;
        this.action_duration = 1;
        this.dash_speed = 30;
        this.direction = [0,0];
    }

    init(data) {
        this.direction = data.direction;
    }

    animationReaction() {
        // Use attack1 animation maybe ? 
        this.object.animationManager.setCurrentAnimation("dash_slash");
    }

    gameplayReaction() {
        // TODO: Rotate player in direction.
        this.object.physicsComponent.addImpulse([this.dash_speed * this.direction[0], this.dash_speed * this.direction[1]]);
        // Add code to damage here.
    }

    canSwitch() {
        // Attack command can't be cancelled inside time interval
        return !(this.timer >= this.start_time && this.timer <= this.end_time);
    }
}

DashSlashAction.NAME = "dash_slash";