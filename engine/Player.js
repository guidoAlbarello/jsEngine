class Player extends Object3d {
    JUMP_FORCE = 6;
    WALK_SPEED = 7;
    weapon;
    
    constructor() {
        super();
        this.setHitbox(new BoxHitbox(-0.05, 0, -0.01, 0.05, 1.8, 0.01));
        this.addPhysicsCollider();

        let physicsComponent = new PhysicsComponent();
        physicsComponent.setGravity(1)
        this.setPhysicsComponent(physicsComponent);
        physicsComponent.setMass(5);
        
        gCollisionDetection.registerCollidable(this, 'player');
        let elementCollider = new Collider("element");
        elementCollider.setOnCollisionEnter((element) => {
            let mudSlowdown = 0.4;
            if (element.getType() == 'mud') {
                this.physicsComponent.movility[0] = mudSlowdown;
                this.physicsComponent.movility[2] = mudSlowdown;
            }
        });
        elementCollider.setOnCollisionExit(() => {
            this.physicsComponent.movility[0] = 1;
            this.physicsComponent.movility[2] = 1;
        })
        this.addCollider(elementCollider);
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
        if (this.physicsComponent.velocity[1] == 0) {
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
        movementDirection[1] = this.physicsComponent.velocity[1];
        this.physicsComponent.setVelocity(movementDirection);
    }
}