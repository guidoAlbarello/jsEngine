class Organ extends Sprite {
    constructor(organType) {
        super();
        this.init(1,1,"green", 1,1);
        this.type = organType;//gOrgansType[Math.floor(Math.random() * gOrgansType.length)];

        let collider = new Collider("player");
        collider.setOnCollisionEnter((otherObject) => {
            otherObject.addToInventory(this.type);
            this.remove();
        });

        this.addCollider(collider);
    }
}