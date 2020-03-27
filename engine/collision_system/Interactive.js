class Interactive extends Object3d {
    constructor(width, height, depth, interactFunction) {
        super();
        this.setHitbox(new BoxHitbox(-width / 2, -height / 2, -depth, width / 2, height / 2, depth / 2));
        gDeveloperTools.drawHitbox(this);


        let collider = new Collider("player");
        collider.setOnCollisionEnter((otherObject) => {
            if (gInputHandler.getInput("interact")) interactFunction();
        });
        collider.setOnCollisionStay((otherObject) => {
            if (gInputHandler.getInput("interact")) interactFunction();
        });

        this.addCollider(collider);
    }

}