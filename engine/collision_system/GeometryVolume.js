class GeometryVolume extends Object3d {
    constructor(width, height, depth) {
        super();
        this.setHitbox(new BoxHitbox(-width / 2, -height / 2, -depth, width / 2, height / 2, depth / 2));
        gDeveloperTools.drawHitbox(this);
        let collider = new Collider("walker");

        collider.setOnCollisionEnter((otherObject) => {
            let enemyCameFromAbove = otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2;
            let enemyCameFromTheRightSide = otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2;
            let enemyCameFromTheLeftSide = otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2;

            if (enemyCameFromAbove) {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
                if (otherObject.physicsComponent.velocity[1] < 0) {
                    otherObject.physicsComponent.velocity[1] = 0;
                }
            } else {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] - height / 2 - otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
            }
            
            /*if (enemyCameFromTheRightSide) {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
                if (otherObject.physicsComponent.velocity[1] < 0) {
                    otherObject.physicsComponent.velocity[1] = 0;
                }
            } else {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
            }*/
        });
        collider.setOnCollisionStay((otherObject) => {
            let enemyCameFromAbove = otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2;
            let enemyCameFromTheRightSide = otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2;
            let enemyCameFromTheLeftSide = otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.2 >= this.getWorldPosition()[1] + height / 2;

            if (enemyCameFromAbove) {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
                if (otherObject.physicsComponent.velocity[1] < 0) {
                    otherObject.physicsComponent.velocity[1] = 0;
                }
            } else {
                if (otherObject.getWorldPosition()[0] + otherObject.getWidth()/2)
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] - height / 2 - otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
            }
        });
        
        this.addCollider(collider);
    }
}
