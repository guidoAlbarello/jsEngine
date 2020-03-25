class BouncyPlatform extends Sprite {
    constructor(width, height, createCollisionVolume) {
        super();
        this.init(width || 3, height || 0.7,"blue_color", 1,1);
        this.translate([width/2, -height/2, 0]);
        if (createCollisionVolume) {
            this.addChild(new GeometryVolume(width || 3, height || 0.7, 2));
        }
    }
}