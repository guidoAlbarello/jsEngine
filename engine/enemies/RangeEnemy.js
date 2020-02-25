
function pos2Vec(p){
    return [p.x,p.y,p.z];
}
function distance(p1, p2){
    return Math.sqrt(
	(p1.x-p2.x)**2
	    +(p1.y + p2.y)**2
	    + (p1.z + p2.z)**2);
}
function dotProduct(p1, p2){
    return p1.x*p2.x + p1.y*p2.y + p1.z*p2.z;
}
function scalarProduct(p1,k){
    return {"x":p1.x*k, "y":p1.y*k, "z":p1.z*k};
}
function add(p1, p2){
    return {"x":p1.x+p2.x, "y":p1.y+p2.y, "z":p1.z+p2.z};
}
function angle(p1,p2){
    return Math.acos(dotProduct(p1, p2)
	    /(dotProduct(p1,p2)*dotProduct(p1,p2)));
}
function normalize(v){
    return scalarProduct(v,1/Math.sqrt(dotProduct(v,v)));
}
class RangeEnemy extends Behaviour {
    life = 100;
    speed = 1;
    damage = 10;
    range = 100;
    pos = {"x":0, "y":0, "z":0};
    view = {"x":1, "y":0, "z":0};
    lastEnemyPos = undefined;
    timeSinceEnemyDetected = 0;
    stance = "chill";
    constructor(attackCallback){
	super();
	//	this.attackCallback = attackCallback;
	this.update = () => {this.react()};
    }

    inSight(playerPos){
	let inRange = (distance(playerPos, this.pos) < this.range);
	let angl =  angle(playerPos - this.pos, this.view);
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
//	let angleRotation = angle(playerPos-this.pos,this.view);
//	this.rotate(angleRotation);
	let newDirection =
	    pos2Vec(scalarProduct(normalize(add(playerPos,scalarProduct(this.pos,-1))),0.001));
	this.object.physicsComponent.setVelocity(newDirection);
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
	let playerPos = {"x":10, "y":10, "z":10};
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
