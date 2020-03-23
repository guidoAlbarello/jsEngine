class Enemy extends Sprite {
    constructor() {
        super();
        gCollisionDetection.registerCollidable(this, "walker");
        this.setPhysicsComponent(new PhysicsComponent2d());
        this.hp = new HealthPoints(gConfiguration.enemyHP);
    	this.hp.translate([0, this.getHeight()/2+0.3*this.getHeight(), 0]);
    	this.idDead = false;
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