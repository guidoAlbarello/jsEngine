class Organ extends Sprite {
    constructor() {
        super();
        this.init(1,1,"space_color", 1,1);
        this.type = gOrgansType[Math.floor(Math.random() * gOrgansType.length)];

        let collider = new Collider("player");
        collider.setOnCollisionEnter((otherObject) => {
            otherObject.addToInventory(this.type);
            this.remove();
        });

        this.addCollider(collider);
    }
}