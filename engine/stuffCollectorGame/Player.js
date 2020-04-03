class Player extends Sprite {
	constructor(playerHP, playerDamages) {
		// Init player sprite.
		super(3, 2.22, 'player', 50 / 512, 37 / 1024);
		this.playerDamages = playerDamages;
		this.organsCollected = new Map();
		this.setPhysicsComponent(new PhysicsComponent2d());
		this.physicsComponent.setGravity(1);

		this.hp = new HealthPoints(playerHP);
		this.hp.translate([0, this.getHeight() / 2 + 0.3 * this.getHeight(), 0]);
		this.addChild(this.hp);

		this.organs_ui = new Sprite(1, 0.3, 'white', 1, 1);
		this.organs_ui.setMaterial(new OrgansMaterial("white"));
		this.organs_ui.translate([0, this.getHeight() / 2 - 0.4 + 0.3 * this.getHeight(), 0]);
		this.addChild(this.organs_ui);

		this.wallJumpDirection = [0, 0];

		this.setAnimationManager(this.createAnimations(this));

		this.inventory = new Map();

		//gDeveloperTools.drawHitbox(this);
		gCollisionDetection.registerCollidable(this, 'walker');
		gCollisionDetection.registerCollidable(this, 'player');
		gCollisionDetection.registerCollidable(this, "entity");
		this.dead = false;

		let updateHpBar = new Behaviour(this);
		updateHpBar.setUpdate(() => {
			this.hp.material.setLife(this.hp.getHP());
			this.hp.material.setTotalLife(this.hp.hpMax);
		});
		this.addBehaviour(updateHpBar);
		this.onEndPlatform = false;
	}

	walk(velocityX) {
		this.physicsComponent.setVelocityX(velocityX);
	}

	jump(height) {
		this.physicsComponent.addImpulse([-this.physicsComponent.gravity[0] * height, -this.physicsComponent.gravity[1] * height]);
	}

	allowWallJump(direction) {
		this.wallJumpDirection = direction;
	}

	getHP() {
		return this.hp.getHP();
	}

	setHP(newHP) {
		this.hp.setHP(newHP);
	}

	takeDamage(damage = 1) {
		this.hp.subtract(damage);
		if (this.hp.getHP() <= 0) {
			this.dead = true;
		}
	}

	isDead() {
		return this.dead;
	}

	getInventory() {
		return this.inventory;
	}

	getVelocity() {
		return this.physicsComponent.getVelocity();
	}

	createAnimations(object) {
		let animationManager = new AnimationManager();

		animationManager.addAnimation("idle", Animation2d.fromRow(0, 0, 4, 1 / 6));
		animationManager.addAnimation("left", Animation2d.fromRow(1, 1, 6, 1 / 12, /*flip=*/ true));
		animationManager.addAnimation("right", Animation2d.fromRow(1, 1, 6, 1 / 12));
		animationManager.addAnimation("death", Animation2d.fromRow(9, 0, 6, 1 / 3));

		let conditionIdle = new AnimationTransitionCondition(object);
		conditionIdle.setEvaluate((condition) => {
			return condition.object.physicsComponent.velocity[0] == 0;
		});

		let conditionLeft = new AnimationTransitionCondition(object);
		conditionLeft.setEvaluate((condition) => {
			return condition.object.physicsComponent.velocity[0] < 0;
		});

		let conditionRight = new AnimationTransitionCondition(object);
		conditionRight.setEvaluate((condition) => {
			return condition.object.physicsComponent.velocity[0] > 0;
		});

		let conditionDeath = new AnimationTransitionCondition(object);
		conditionDeath.setEvaluate((condition) => {
			return condition.object.isDead();
		});

		animationManager.addTransitionToEveryAnimation("idle", conditionIdle);
		animationManager.addTransitionToEveryAnimation("left", conditionLeft);
		animationManager.addTransitionToEveryAnimation("right", conditionRight);
		animationManager.addTransitionToEveryAnimation("death", conditionDeath);

		animationManager.setCurrentAnimation("idle");

		return animationManager;
	}

	addToInventory(object) {
		if (this.inventory.has(object)) {
			this.inventory.set(object, this.inventory.get(object) + 1);
		} else {
			this.inventory.set(object, 1);
		}
		switch (object) {
			case "liver":
				this.organs_ui.material.setHasLiver();
				break;
			case "brain":
				this.organs_ui.material.setHasBrain();
				break;
			case "heart":
				this.organs_ui.material.setHasHeart();
				break;
		}
	}

	getDamages() {
		return this.playerDamages;
	}
}
