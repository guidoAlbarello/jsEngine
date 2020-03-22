class PlayerController {
    constructor(player) {
        this.player = player;

        this.velocity = [0,0];
        this.walkSpeed = 0.8;
        this.walkSpeedMax = 4;
        this.jumpSpeed = 5;
    }

    setPlayer(player) {
        this.player = player;
        this.lastMovement = [0,0];
    }

    getPlayer() {
        return this.player;
    }
    
    update() {
        let velocity = [0, 0];

        if (gInputHandler.getInput("jump")) velocity[1] = 1;
        if (gInputHandler.getInput("left")) velocity[0] = this.walk(-1);
        if (gInputHandler.getInput("right")) velocity[0] = this.walk(1);
        if (velocity[0]==0) velocity[0] = this.walk(0);
        
        this.velocity = velocity;
        
        this.player.walk(velocity);
        this.player.jump(this.jumpSpeed*velocity[1]);
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