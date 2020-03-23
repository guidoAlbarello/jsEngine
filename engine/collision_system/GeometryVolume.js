class GeometryVolume extends Object3d {
    constructor(width, height, depth) {
        super();
        this.setHitbox(new BoxHitbox(-width / 2, -height / 2, -depth, width / 2, height / 2, depth / 2));
        gDeveloperTools.drawHitbox(this);
        let collider = new Collider("walker");
        let surfaceDirection = [0, -1, 0];
        collider.setOnCollisionEnter((otherObject) => {
            if (otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2) {
                otherObject.physicsComponent.stopFalling();
                otherObject.physicsComponent.setIsOnSurface(true, surfaceDirection);
            }
        });

        collider.setOnCollisionExit((otherObject) => {
            otherObject.physicsComponent.setIsOnSurface(false, [0, 0, 0]);
        });

        this.addCollider(collider);
    }
}
