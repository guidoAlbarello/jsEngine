class KillVolume extends Object3d {
    constructor(width, height, depth) {
        super();
        let KILL_DAMAGE_PER_SECOND = 200; 
        this.setHitbox(new BoxHitbox(-width / 2, -height / 2, -depth, width / 2, height / 2, depth / 2));
        let collider = new Collider("player");

        collider.setOnCollisionStay((otherObject) => {
            otherObject.takeDamage(KILL_DAMAGE_PER_SECOND * gDeltaTime);
        });
       
        this.addCollider(collider);
    }
}
