class Player extends Object3d {
    JUMP_FORCE = 10;
    weapon;
    constructor() {
        super();
        let model = gModelMaker.makeCylindre(1.8, 0.8, 50, 1,1);
        this.addChild(gSurfaceCreator.makeSphere(1, 50));
		this.setHitbox(new SphericalHitbox(1));
		this.addPhysicsCollider();

		let material = new PBRMaterial();
		model.setMaterial(material);

		let physicsComponent = new PhysicsComponent();
        physicsComponent.setGravity(1)
        this.setPhysicsComponent(physicsComponent);
        physicsComponent.setMass(5);
		this.addChild(model);
    }

    jump() {
        this.physicsComponent.addImpulse([0, this.JUMP_FORCE, 0]);
    }

    shoot() {
        // TODO: Implement weapon
        if (!undefined)
            this.weapon.shoot();
    }

    regulate() {
        
    }
}