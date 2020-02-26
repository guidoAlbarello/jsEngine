class PlayerController {
    FORWARD = Math.PI;
    BACKWARDS = 0;
    LEFT = Math.PI/2;
    RIGHT = -Math.PI/2;

    constructor(player) {
        this.player = player;
    }

    setPlayer(player) {
        this.player = player;
    }

    getPlayer() {
        return this.player;
    }
    
    update() {
        if (gInputHandler.getInput("forward")) this.player.walk(this.FORWARD);
        if (gInputHandler.getInput("backwards")) this.player.walk(this.BACKWARDS);
        if (gInputHandler.getInput("left")) this.player.walk(this.LEFT);
        if (gInputHandler.getInput("right")) this.player.walk(this.RIGHT);

        if (gInputHandler.getInput("jump")) this.player.jump();
        if (gInputHandler.getInput("shoot")) this.player.shoot();
        if (gInputHandler.getInput("regulate")) this.player.regulate();
    }
}