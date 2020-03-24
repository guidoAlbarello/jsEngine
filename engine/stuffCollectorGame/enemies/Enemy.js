class Enemy extends Sprite {
    constructor() {
        super();
        gCollisionDetection.registerCollidable(this, "walker");
        gCollisionDetection.registerCollidable(this, "enemy");
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.hp = new HealthPoints(gConfiguration.enemyHP);
    	this.hp.translate([0, this.getHeight()/2+0.3*this.getHeight(), 0]);
    	this.dead = false;


    	let collider = new Collider("player");
    	collider.setOnCollisionStay((otherObject) => {
    		if(!this.isDead()) otherObject.takeDamage(gConfiguration.enemyDamage);
        });
        collider.setOnCollisionEnter((otherObject) => {
        	if(this.isDead()) return;
        	let otherObjectPosition = otherObject.getWorldPosition();
        	let myPosition = this.getWorldPosition();
        	if(otherObjectPosition[0]<myPosition[0]) otherObject.physicsComponent.addImpulse([-otherObject.getWidth()*15,0]);
        	else otherObject.physicsComponent.addImpulse([otherObject.getWidth()*15,0]);
        	otherObject.takeDamage(gConfiguration.enemyDamage);
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
    		this.dead = true;
    	}
	}

	isDead(){
		return this.dead;
	}
}