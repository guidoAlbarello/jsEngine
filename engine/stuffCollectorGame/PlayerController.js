class PlayerController {
    constructor(player) {
        this.player = player;

        this.velocity = [0,0];
        this.walkSpeed = 0.8;
        this.walkSpeedMax = 4;
    }

    setPlayer(player) {
        this.player = player;
        this.lastMovement = [0,0];
    }

    getPlayer() {
        return this.player;
    }
    
    update() {
        let movingDirection = [0, 0];
        if (gInputHandler.getInput("forward")) movingDirection[1] = 1;
        if (gInputHandler.getInput("backwards")) movingDirection[1] = -1;
        if (gInputHandler.getInput("left")) movingDirection[0] = this.walk(-1);
        if (gInputHandler.getInput("right")) movingDirection[0] = this.walk(1);
        if (movingDirection[0]==0) movingDirection[0] = this.walk(0);
        
        this.velocity = movingDirection;
        this.player.walk(movingDirection);
    }

    walk(direction){
        if(this.velocity[0] != 0 && (direction==0 || Math.sign(direction)!= Math.sign(this.velocity[0]))){
            //decelerate
            let decelerate = this.velocity[0]-Math.sign(this.velocity[0])*this.walkSpeedMax * gDeltaTime;
            if(Math.sign(decelerate)!=Math.sign(this.velocity[0])){
                return 0;
            }else{
                return decelerate;
            }
        }
        
        //accelerate
        return direction* Math.min(Math.max(Math.abs(this.velocity[0]), Math.abs(direction))+ this.walkSpeed * gDeltaTime, this.walkSpeedMax);
    }

}