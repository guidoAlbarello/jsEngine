class PlayerController {
    constructor(player) {
        this.player = player;

        this.velocity = [0,0];
        this.walkSpeed = 10;
        this.walkSpeedMax = 15;

        this.jumpSpeed = 2;
        this.jumping = false;
        this.maxHeightJump=this.jumpSpeed*7;
    }

    setPlayer(player) {
        this.player = player;
        this.lastMovement = [0,0];
    }

    getPlayer() {
        return this.player;
    }
    
    update() {
        let velocityX = 0;
        let actualVelocity = this.player.getVelocity();
        if (actualVelocity[1] == 0) this.jumping = false;

        if (gInputHandler.getInput("jump") && !this.jumping){
            if(actualVelocity[1]<this.maxHeightJump) this.player.jump(this.jumpSpeed);
            else this.jumping = true;
        } else this.jumping=true;
        if (gInputHandler.getInput("left")) velocityX = this.walk(-1);
        if (gInputHandler.getInput("right")) velocityX = this.walk(1);
        if (velocityX==0) velocityX = this.walk(0);
        
        this.velocity = actualVelocity;
        
        this.player.walk((this.jumping ? 1 : 0.6) * velocityX);
    }

    walk(direction){
        if(this.velocity[0] != 0 && (direction==0 || Math.sign(direction)!= Math.sign(this.velocity[0]))){
            //decelerate
            let decelerate = this.velocity[0]-Math.sign(this.velocity[0])*0.05*this.walkSpeedMax;
            if(Math.sign(decelerate)!=Math.sign(this.velocity[0])){
                return 0;
            }else{
                return decelerate;
            }
        }
        
        //accelerate
        return direction* Math.min(Math.max(Math.abs(this.velocity[0]), Math.abs(direction))+ (this.jumping ? 0.02 : 1) *this.walkSpeed, this.walkSpeedMax);
    }

}