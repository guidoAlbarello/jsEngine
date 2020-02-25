class Player extends Object3d {
    JUMP_FORCE = 4;
    WALK_SPEED = 3;
    weapon;
    
    constructor() {
        super();
        this.setHitbox(new SphericalHitbox(1));
        this.addPhysicsCollider();

        let physicsComponent = new PhysicsComponent();
        physicsComponent.setGravity(1)
        this.setPhysicsComponent(physicsComponent);
        physicsComponent.setMass(5);
        
        gCollisionDetection.registerCollidable(this, 'player');

        this.playerStats = new PlayerStats();

        this.weapon = new Weapon();
        this.weapon.translate([0,1, 0])
        this.behaviour.setUpdate(() => {
            let viewDirection = this.camera.getViewDirection();
            let rightVector = vec3.create();
            let position = this.weapon.getPosition();
            vec3.cross(rightVector, viewDirection, this.camera.UP);

            this.weapon.modelMatrix = mat4.fromValues(
                this.camera.UP[0],
                this.camera.UP[1],
                this.camera.UP[2],
                0.0,
                rightVector[0],
                rightVector[1],
                rightVector[2],
                0.0,
                viewDirection[0],
                viewDirection[1],
                viewDirection[2],
                0,
                position[0],
                position[1],
                position[2],
                1.0
            );
        });
        this.addChild(this.weapon);
    }

    jump() {
        if (this.physicsComponent.velocity[1] >= 0) {
            this.physicsComponent.addImpulse([0, this.JUMP_FORCE, 0]);
        }
    }

    shoot() {
        if (!undefined)
            this.weapon.shoot();
    }

    regulate() {

    }

    walk(movementAngle) {
        let viewDirection = this.camera.getViewDirection();
        
        let movementDirection = vec3.create();
        // We can rotate on y axis because we know the first person camera up is pointing upwards.
        vec3.rotateY(movementDirection, viewDirection, this.camera.getPosition(), -movementAngle);
        vec3.scale(movementDirection, movementDirection, this.WALK_SPEED);
        movementDirection[1] = 0;
        this.physicsComponent.setVelocity(movementDirection);
    }
}