class RangeEnemy extends Object3d {
    MIN_RPOJECTILE_SPEED = 10;
    MAX_PROJECTILE_SPEED = 40;
    size = 0.5;

    constructor() {
        super();
        this.projectileSpeed = this.MIN_RPOJECTILE_SPEED + Math.random() * this.MAX_PROJECTILE_SPEED;
        let sphere = gSurfaceCreator.makeSphere(this.size, 40);
        let material = new PBRMaterial();
        material.setAlbedo("red");
        sphere.setMaterial(material);
        sphere.id = this.id;
        
        this.setHitbox(new SphericalHitbox(this.size));
        gCollisionDetection.registerCollidable(this, 'enemy');

        this.addChild(sphere);
        this.translate([0,this.size, 0]);
    }

    shoot(direction) {
        let projectile = gSurfaceCreator.makeSphere(0.05, 4);
        let collider = new Collider('player');
        collider.setOnCollisionEnter((otherObject) => {
            alert("Game over. Enemies killed: " + otherObject.playerStats.killCount);
            otherObject.remove();
            projectile.remove();
        });
        projectile.addCollider(collider);
        projectile.behaviour.setUpdate(() => {
            if (this.getPosition()[1] <= 0) {
                this.remove();
            }
        });
        projectile.setHitbox(new SphericalHitbox(0.05));
        projectile.modelMatrix = mat4.create();
        mat4.copy(projectile.modelMatrix, this.modelMatrix);
        projectile.modelMatrix[13] = 3 * this.size;
        projectile.setPhysicsComponent(new PhysicsComponent());
        projectile.physicsComponent.setGravity(0.3);
        projectile.physicsComponent.setVelocity(vecMulScalar(direction, this.projectileSpeed));
        let parent = this.parent;
        while(parent.parent) {
            parent = parent.parent;
        }
        parent.addChild(projectile);
    }
}