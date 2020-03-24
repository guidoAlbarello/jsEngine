class GeometryVolume extends Object3d {
    constructor(width, height, depth) {
        super();
        this.setHitbox(new BoxHitbox(-width / 2, -height / 2, -depth, width / 2, height / 2, depth / 2));
        gDeveloperTools.drawHitbox(this);
        let collider = new Collider("walker");

        collider.setOnCollisionEnter((otherObject) => {
            let enemyCameFromAbove = (otherObject.getWorldPosition()[1] > this.getWorldPosition()[1]) && (otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.5 >= this.getWorldPosition()[1] + height / 2);
            let enemyCameFromBelow = (otherObject.getWorldPosition()[1] < this.getWorldPosition()[1]) && (otherObject.getWorldPosition()[1] + otherObject.getHeight() / 2 >= this.getWorldPosition()[1] - height / 2);
            let enemyCameFromTheRightSide = (otherObject.getWorldPosition()[0] > this.getWorldPosition()[0]) && (otherObject.getWorldPosition()[0] - otherObject.getWidth() / 2 < this.getWorldPosition()[0] + width / 2);
            let enemyCameFromTheLeftSide = (otherObject.getWorldPosition()[0] < this.getWorldPosition()[0]) && (otherObject.getWorldPosition()[0] + otherObject.getWidth() / 2 >= this.getWorldPosition()[0] - width / 2);

            if (enemyCameFromAbove) {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
                if (otherObject.physicsComponent.velocity[1] < 0) {
                    otherObject.physicsComponent.velocity[1] = 0;
                }
            } else {
                if (enemyCameFromBelow) {
                    otherObject.physicsComponent.addImpulse([0, -otherObject.physicsComponent.velocity[1]]);
                }
            }
            if (!((otherObject.getWorldPosition()[0] >= this.getWorldPosition()[0] - width / 2) && (otherObject.getWorldPosition()[0] <= this.getWorldPosition()[0] + width / 2))) {

                if (enemyCameFromTheRightSide) {
                    otherObject.setWorldPosition([this.getWorldPosition()[0] + width / 2 + otherObject.getWidth() / 2, otherObject.getWorldPosition()[1], otherObject.getWorldPosition()[2]]);
                } else {
                    if (enemyCameFromTheLeftSide) {
                        otherObject.setWorldPosition([this.getWorldPosition()[0] - width / 2 - otherObject.getWidth() / 2, otherObject.getWorldPosition()[1], otherObject.getWorldPosition()[2]]);
                    }
                }
            }
        });
        collider.setOnCollisionStay((otherObject) => {
            let enemyCameFromAbove = (otherObject.getWorldPosition()[1] > this.getWorldPosition()[1]) && (otherObject.getWorldPosition()[1] - otherObject.getHeight() / 2 + 0.5 >= this.getWorldPosition()[1] + height / 2);
            let enemyCameFromTheRightSide = (otherObject.getWorldPosition()[0] > this.getWorldPosition()[0]) && (otherObject.getWorldPosition()[0] - otherObject.getWidth() / 2 < this.getWorldPosition()[0] + width / 2);
            let enemyCameFromTheLeftSide = (otherObject.getWorldPosition()[0] < this.getWorldPosition()[0]) && (otherObject.getWorldPosition()[0] + otherObject.getWidth() / 2 >= this.getWorldPosition()[0] - width / 2);

            if (enemyCameFromAbove) {
                otherObject.setWorldPosition([otherObject.getWorldPosition()[0], this.getWorldPosition()[1] + height / 2 + otherObject.getHeight() / 2, otherObject.getWorldPosition()[2]]);
                if (otherObject.physicsComponent.velocity[1] < 0) {
                    otherObject.physicsComponent.velocity[1] = 0;
                }
            }

            if (!((otherObject.getWorldPosition()[0] >= this.getWorldPosition()[0] - width / 2) && (otherObject.getWorldPosition()[0] <= this.getWorldPosition()[0] + width / 2))) {
                if (enemyCameFromTheRightSide) {
                    otherObject.setWorldPosition([this.getWorldPosition()[0] + width / 2 + otherObject.getWidth() / 2, otherObject.getWorldPosition()[1], otherObject.getWorldPosition()[2]]);
                    // Check if the collider object is the player, if so, allow wall jump in left direction.
                    if (gQuerySystem.objectHasTag("player", otherObject)) {
                        otherObject.allowWallJump([1, 0]);
                        if (otherObject.physicsComponent.velocity[1] < 0) {
                            otherObject.physicsComponent.velocity[1] *= 0.7;
                        }
                    }
                } else {
                    if (enemyCameFromTheLeftSide) {
                        otherObject.setWorldPosition([this.getWorldPosition()[0] - width / 2 - otherObject.getWidth() / 2, otherObject.getWorldPosition()[1], otherObject.getWorldPosition()[2]]);
                        // Check if the collider object is the player, if so, allow wall jump in right direction.
                        if (gQuerySystem.objectHasTag("player", otherObject)) {
                            otherObject.allowWallJump([-1, 0]);
                            if (otherObject.physicsComponent.velocity[1] < 0) {
                                otherObject.physicsComponent.velocity[1] *= 0.7;
                            }
                        }
                    }
                }
            }
        });
        
        collider.setOnCollisionExit((otherObject) => {
            if (gQuerySystem.objectHasTag("player", otherObject)) {
                otherObject.allowWallJump([0,0]);
            }
        });

        this.addCollider(collider);
    }
}
