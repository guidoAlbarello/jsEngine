class Interactive extends Object3d {
    constructor(width, height, depth, interactFunction = function(){}) {
        super();
        this.setHitbox(new BoxHitbox(-width / 2, -height / 2, -depth, width / 2, height / 2, depth / 2));
        gDeveloperTools.drawHitbox(this);

        this.interact = interactFunction;


        let collider = new Collider("player");
        collider.setOnCollisionEnter((otherObject) => {
            if (gInputHandler.getInput("interact")) this.interact();
        });
        collider.setOnCollisionStay((otherObject) => {
            if (gInputHandler.getInput("interact")) this.interact();
        });

        this.addCollider(collider);
    }

    setInteractFunction(interactFunction){
        this.interact = interactFunction;
    }

    setObject(object){
        this.object = object;
    }

}