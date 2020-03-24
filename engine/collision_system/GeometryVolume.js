class GeometryVolume extends Object3d {
    constructor(width, height, depth) {
        super();
        this.setHitbox(new BoxHitbox(-width / 2, -height / 2, -depth, width / 2, height / 2, depth / 2));
        gDeveloperTools.drawHitbox(this);
        let collider = new Collider("walker");

        collider.setOnCollisionEnter((otherObject) => {
            if (otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2) {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
                if (otherObject.physicsComponent.velocity[1] < 0) {
                    otherObject.physicsComponent.velocity[1] = 0;
                }
            }
        });
        collider.setOnCollisionStay((otherObject) => {
            if (otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2) {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
                if (otherObject.physicsComponent.velocity[1] < 0) {
                    otherObject.physicsComponent.velocity[1] = 0;
                }
            }
        });
        collider.setOnCollisionExit((otherObject) => {
            //console.log("Exit");
        });
        this.addCollider(collider);
    }
}
