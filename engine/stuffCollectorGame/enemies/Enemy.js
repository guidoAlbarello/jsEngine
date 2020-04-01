class Enemy extends Sprite {
	constructor(enemyHP=10,enemyDamage=10) {
		super();

		//gCollisionDetection.registerCollidable( this, "walker");
		gCollisionDetection.registerCollidable(this, "enemy");

		this.setPhysicsComponent( new PhysicsComponent2d() );
		this.physicsComponent.setGravity( 0 );
		this.hp = new HealthPoints( enemyHP );
		this.hp.translate([ 0, this.getHeight() / 2 + 0.3 * this.getHeight(), 0 ]);
		this.addChild( this.hp );
		this.dead = false;

		let collider = new Collider("player");
		collider.setOnCollisionStay( (otherObject) => {
			if ( !this.isDead() ) otherObject.takeDamage( enemyDamage );
		});
		collider.setOnCollisionEnter( (otherObject) => {
			if ( this.isDead() ) return;
			let otherObjectPosition = otherObject.getWorldPosition();
			let myPosition = this.getWorldPosition();
			if ( otherObjectPosition[ 0 ] < myPosition[ 0 ] ) otherObject.physicsComponent.addImpulse([ -otherObject.getWidth() * 15, 0 ]);
			else otherObject.physicsComponent.addImpulse([ otherObject.getWidth() * 15, 0 ]);
			otherObject.takeDamage( enemyDamage );
		});
		this.addCollider( collider );
	}

	getHP() {
		return this.hp.getHP();
	}

	setHP(newHP) {
		this.hp.setHP( newHP );
	}

	takeDamage(damage = 1) {
		this.hp.subtract( damage );
		if ( this.hp.getHP() <= 0 ) {
			this.dead = true;
            gEntityManager.destroyObject(this.getId());
		}
	}

	isDead() {
		return this.dead;
	}
}
