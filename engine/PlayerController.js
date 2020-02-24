class PlayerController {
    constructor(player) {
        this.player = player;
    }

    setPlayer(player) {
        this.player = player;
    }

    update() {
        if (gInputHandler.getInput("jump")) this.player.jump();
        if (gInputHandler.getInput("shoot")) this.player.shoot();
        if (gInputHandler.getInput("regulate")) this.player.regulate();
    }
}