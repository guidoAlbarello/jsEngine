class Enemy extends Sprite {
    constructor() {
        super();
        gCollisionDetection.registerCollidable(this, "walker");
        //gCollisionDetection.registerCollidable(this, "enemy");
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.hp = new HealthPoints(gConfiguration.enemyHP);
    	this.hp.translate([0, this.getHeight()/2+0.3*this.getHeight(), 0]);
    	this.idDead = false;

    	let collider = new Collider("player");
    	collider.setOnCollisionStay((otherObject) => {
    		otherObject.takeDamage(gConfiguration.enemyDamage);
        });
        collider.setOnCollisionEnter((otherObject) => {
        	let otherObjectPosition = otherObject.getWorldPosition();
        	let myPosition = this.getWorldPosition();
        	if(otherObjectPosition[0]<myPosition[0]){
        		otherObject.physicsComponent.addImpulse([-otherObject.getWidth()*2,0]);
        	}else{
        		otherObject.physicsComponent.addImpulse([otherObject.getWidth()*2,0]);
        	}
        });
    	this.addCollider(collider);
    }

    getHP() {
    	return this.hp.getHP();
  	}

    setHP(newHP){
    	this.hp.setHP(newHP);
    }

    takeDamage(damage=1){
    	this.hp.subtract(damage);
    	if (this.hp.getHP() <= 0){
    		this.isDead = true;
    	}
	}
}