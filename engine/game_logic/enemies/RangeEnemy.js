function distance(p1, p2){
    return Math.sqrt(
	(p1[0]-p2[0])**2
	    +(p1[1] + p2[1])**2
	    + (p1[2] + p2[2])**2);
}

function dotProduct(p1, p2){
    return p1[0]*p2[0] + p1[1]*p2[1] + p1[2]*p2[2];
}

function scalarProduct(p1,k){
    return [p1[0]*k, p1[1]*k, p1[0]*k];
}

function add(p1, p2){
    return [p1[0]+p2[0], p1[1]+p2[1], p1[2]+p2[2]];
}
function angle(p1,p2){
    return Math.acos(dotProduct(p1, p2)
	    /(dotProduct(p1,p2)*dotProduct(p1,p2)));
}
function normalize(v){
    return scalarProduct(v,1/Math.sqrt(dotProduct(v,v)));
}
class RangeEnemyBehaviour extends Behaviour{
    life = 100;
    speed = 1;
    damage = 10;
    range = 100;
    view = [1,0,0];
    lastEnemyPos = undefined;
    timeSinceEnemyDetected = 0;
    stance = "chill";
    constructor(actor){
	super();
	//	this.attackCallback = attackCallback;
	this.actor = actor;
	this.update = () => {this.react()};
    }

    inSight(playerPos){
	let inRange = (distance(playerPos, this.actor.getPosition()) < this.range);
	let angl =  angle(playerPos - this.actor.getPosition(), this.view);
	let inViewDirection =  true;
	return inRange && inViewDirection;
    }
    terrainInTheWay(pos){
	return false;
    }
    scanForTargets(playerPos, terrainElements){
	if(!this.inSight(playerPos) || this.terrainInTheWay(playerPos)){
	    return undefined;
	}
	this.lastEnemyPos = playerPos;
	this.stance = "no chill";
	return playerPos;
    }
    rotate(angle){
	return;
    }
    moveTowards(playerPos){
//	let angleRotation = angle(playerPos-this.actor.getPosition(),this.view);
	//	this.rotate(angleRotation);
//	console.log(playerPos);
//	console.log(this.actor.getPosition());
	let newDirection =
	    scalarProduct(normalize(add(playerPos,scalarProduct(this.actor.getPosition(),-1))),0.1);
//	console.log(newDirection);
	this.actor.physicsComponent.setVelocity(newDirection);
    }
    
    increaseTimeSinceEnemyDetected(){
	if(this.timeSinceEnemyDetected > 30){
	    return;
	}
	this.timeSinceEnemyDetected +=1;
    }
    relocate(targetPos){
	if(targetPos!=undefined){
	    this.moveTowards(targetPos);
	    this.increaseTimeSinceEnemyDetected();
	    return;
	}
	if(this.timeSinceEnemyDetected > 0){
	    this.moveTowards(this.lastEnemyPos);
	    return;
	}
	else {
	    //random patroll mvmnt
	    return;
	}
	    
    }

    attack(targetPos){
	if(targetPos == undefined){
	    return;
	}
//	this.attackCallback(targetPos,this.damage,this.range);
    }
    react(){
//	console.log("react");
	let playerPos = [10,0,0];
	let terrainElements = [];
	let targetPos = this.scanForTargets(playerPos, terrainElements);
	this.relocate(targetPos);
//	this.attack(targetPos);
    }

    takeDamage(dmg, dmgSrc){
	this.life -= dmg;
	this.turnArround(dmgSrc);
    }
}

class RangeEnemy extends Object3d {
    constructor() {
        super();
        let sphere = gSurfaceCreator.makeSphere(0.5, 40);
        let material = new PBRMaterial();
        material.setAlbedo("red");
        sphere.setMaterial(material);
        sphere.id = this.id;
        
        this.setHitbox(new SphericalHitbox(0.5));
        gCollisionDetection.registerCollidable(this, 'enemy');

	this.setPhysicsComponent(new PhysicsComponent());
        this.addChild(sphere);
	this.setBehaviour(new RangeEnemyBehaviour(this));
    }
}
