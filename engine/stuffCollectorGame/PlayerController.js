class PlayerController {
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
        let movingDirection = [0, 0];
        if (gInputHandler.getInput("forward")) movingDirection[1] = 1;
        if (gInputHandler.getInput("backwards")) movingDirection[1] = -1;
        if (gInputHandler.getInput("left")) movingDirection[0] = -1;
        if (gInputHandler.getInput("right")) movingDirection[0] = 1;

        this.player.walk(movingDirection);
    }
}