class Weapon extends Object3d {
    projectileSpeed = 10.0;
    constructor () {
        super();
        let model = gSurfaceCreator.makeCube(0.3, 0.3, 3);
        this.addChild(model);
    }

    shoot() {
        let projectile = gSurfaceCreator.makeSphere(0.05, 4);
        let collider = new Collider('enemy');
        collider.setOnCollisionEnter((otherObject) => {
            otherObject.remove();
            projectile.remove();
            this.parent.playerStats.killCount += 1;
        });
        projectile.addCollider(collider);
        projectile.setHitbox(new SphericalHitbox(0.05));
        projectile.modelMatrix = mat4.create();
        mat4.copy(projectile.modelMatrix, this.parent.modelMatrix);
        projectile.modelMatrix[13] += 1;
        projectile.setPhysicsComponent(new PhysicsComponent());
        projectile.physicsComponent.setVelocity(vecMulScalar(this.modelMatrix.slice(8,11), -this.projectileSpeed));
        let parent = this.parent;
        while(parent.parent) {
            parent = parent.parent;
        }
        parent.addChild(projectile);
    }
}