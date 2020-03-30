class DashSlashAction extends Action {
    constructor (object) {
        super(DashSlashAction.NAME, object);
        this.start_time = 0;
        this.end_time = 0.5;
        this.action_duration = 0.5;
        this.dash_speed = 10;
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
        this.object.translate(vecMulScalar([this.dash_speed * this.direction[0], this.dash_speed * this.direction[1], 0], 1));
        // Add code to damage here.
    }

    canSwitch() {
        // Attack command can't be cancelled inside time interval
        return !(this.timer >= this.start_time && this.timer <= this.end_time);
    }
}

DashSlashAction.NAME = "dash_slash";