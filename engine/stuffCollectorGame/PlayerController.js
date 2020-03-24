class PlayerController {
    constructor(player) {
        this.player = player;

        this.velocity = [0, 0];
        this.walkSpeed = 4;
        this.walkSpeedMax = 13;

        this.jumpSpeed = 3;
        this.jumping = false;
        this.maxHeightJump = this.jumpSpeed * 4.5;

        this.timeShoot = 0;
        this.direction = [1,0];
    }

    setPlayer(player) {
        this.player = player;
        this.lastMovement = [0, 0];
    }

    getPlayer() {
        return this.player;
    }

    update() {
        if(this.player.isDead()) this.player.remove();

        let velocityX = 0;
        let actualVelocity = this.player.getVelocity();

        if (gInputHandler.getInput("shoot")){
            if (this.timeShoot > 0){
                this.timeShoot -= gDeltaTime;
                return;
            }
            this.timeShoot = gDeltaTime*10;
            
            let shot = new Shot([this.direction[0],this.direction[1]],this.walkSpeedMax+2);
            shot.translate(this.player.getWorldPosition());
            this.player.addOrphanChild(shot);
            //this.player.addChild(shot);
        }

        if (gInputHandler.getInput("sword")){
            let sword = new Sword([this.direction[0],this.direction[1]],this.walkSpeedMax+2);
            sword.translate([this.direction[0]*(this.player.getWidth()/2+0.3*sword.getWidth()),0,0]);
            //+
            this.player.addChild(sword);
        }

        
        if (actualVelocity[1] == 0) this.jumping = false;

        
        if (gInputHandler.getInput("jump") && !this.jumping){
            if(actualVelocity[1]<this.maxHeightJump) this.player.jump(this.jumpSpeed);
            else this.jumping = true;
        } else this.jumping=true;
        

        if (gInputHandler.getInput("left")) velocityX = this.walk(-1);
        if (gInputHandler.getInput("right")) velocityX = this.walk(1);

        if (velocityX == 0) velocityX = this.walk(0);

        this.velocity = actualVelocity;

        this.player.walk(velocityX);

        this.calculateDirection();
    }

    walk(direction) {
        if (this.velocity[0] != 0 && (direction == 0 || Math.sign(direction) != Math.sign(this.velocity[0]))) {
            //decelerate
            let decelerate = this.velocity[0] - Math.sign(this.velocity[0]) * 0.05 * this.walkSpeedMax;
            if (Math.sign(decelerate) != Math.sign(this.velocity[0])) {
                return 0;
            } else {
                return decelerate;
            }
        }
        
        if (direction != 0 && this.player.wallJumpDirection[0] == direction) {
            this.player.physicsComponent.addImpulse([1000 * this.player.wallJumpDirection[0], 1000]);
        }

        //accelerate
        return direction * Math.min(Math.max(Math.abs(this.velocity[0]), Math.abs(direction)) + (this.jumping ? 0.02 : 1) * this.walkSpeed, this.walkSpeedMax);
    }


    calculateDirection(){
        if (this.velocity[0]>0) this.direction[0]=1;
        if (this.velocity[0]<0) this.direction[0]=-1;
    }
}