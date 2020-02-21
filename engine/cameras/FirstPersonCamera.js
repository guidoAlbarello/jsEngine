class FirstPersonCamera extends Camera {

    constructor(position, target) {
        super(position, target);
        
		this.alfa = Math.PI/4; //alfa and beta target
        this.beta = Math.PI/4;
        
        this.walkSpeed =  0.008;
        this.turnSpeed =  0.0001;
        this.rightVector = vec3.create();
        this.setRightVector();
    }
    
    updateController() {
        let delta = gInputHandler.getDelta();
        this.alfa += delta.x*this.turnSpeed * gDeltaTime;
        this.beta += delta.y*this.turnSpeed * gDeltaTime;
        this.turn();
        
        //walk
        if(gInputHandler.getInput("forward")) this.walkForward();
        if(gInputHandler.getInput("backwards")) this.walkBackwards();
        if(gInputHandler.getInput("right")) this.walkRight();
        if(gInputHandler.getInput("left")) this.walkLeft();
    	if(gInputHandler.getInput("up")) this.walkUp();
    	if(gInputHandler.getInput("down")) this.walkDown();
    }

    walkDown() {
        let move = vec3.create();
        vec3.scale(move, [0,-1,0], this.walkSpeed * gDeltaTime);

        vec3.add(this.position, this.position, move);
        vec3.add(this.target, this.target, move);
    }

    walkUp() {
        let move = vec3.create();
        vec3.scale(move, [0,1,0], this.walkSpeed * gDeltaTime);

        vec3.add(this.position, this.position, move);
        vec3.add(this.target, this.target, move);
    }
    
    walkForward(){
        let direc = vec3.create();
        let posAux = vec3.create();
        vec3.scale(posAux, this.position, -1)
        vec3.add(direc, this.target, posAux);

        let move = vec3.create();
        vec3.scale(move, direc, this.walkSpeed* gDeltaTime);

        vec3.add(this.position, this.position, move);
        vec3.add(this.target, this.target, move);
    }

    walkBackwards(){
        let direc = vec3.create();
        let posAux = vec3.create();
        vec3.scale(posAux, this.position, -1);
        vec3.add(direc, this.target, posAux);

        let move = vec3.create();
        vec3.scale(move, direc, this.walkSpeed* gDeltaTime);
        vec3.scale(move, move, -1);

        vec3.add(this.position, this.position, move);
        vec3.add(this.target, this.target, move);
    }

    walkRight(){
        this.setRightVector();
        let move = vec3.create();
        vec3.scale(move, this.rightVector, this.walkSpeed* gDeltaTime);

        vec3.add(this.position, this.position, move);
        vec3.add(this.target, this.target, move);
    }

    walkLeft(){
        this.setRightVector();
        let move = vec3.create();
        vec3.scale(move, this.rightVector, this.walkSpeed* gDeltaTime);
        vec3.scale(move, move, -1);

        vec3.add(this.position, this.position, move);
        vec3.add(this.target, this.target, move);
    }

    setRightVector(){
        //r = d x u ; u=UP ; d=t-p
        //d=t-p
        let dist = vec3.create();
        let posAux = vec3.create();
        vec3.scale(posAux, this.position, -1)
        vec3.add(dist, this.target, posAux);
        
        //r = d x u
        vec3.cross(this.rightVector, dist, this.UP);
	}

    turn(){
        this.target = [-Math.sin(this.alfa) * Math.sin(this.beta), Math.cos(this.beta) ,Math.cos(this.alfa) * Math.sin(this.beta)] //relative target position of [0,0,0]
        vec3.add(this.target, this.target, this.position); //relative target position of camera position
    }
}
