class Platform extends Sprite {
    constructor(createCollisionVolume) {
        super();
        this.init(3,0.7,"egyptian_color", 1,1);
        if (createCollisionVolume) {
            this.addChild(new GeometryVolume(3, 0.7, 2));
        }
    }
}