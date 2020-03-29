class BouncyPlatform extends Sprite {
    constructor(width, height, createCollisionVolume) {
        super();
        let BOUNCYNESS = 30;
        this.init(width || 3, height || 0.7,"blue_color", 1,1);
        this.translate([width/2, -height/2, 0]);
        
        let bouncyCollider = new Collider("entity");
        bouncyCollider.setOnCollisionEnter((otherObject) => {
            otherObject.physicsComponent.addImpulse([0, BOUNCYNESS]);
        });

        this.addCollider(bouncyCollider);

        if (createCollisionVolume) {
            this.addChild(new GeometryVolume(width || 3, height || 0.7, 2));
        }
    }
}