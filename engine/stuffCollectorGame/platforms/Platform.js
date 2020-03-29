class Platform extends Sprite {
    constructor(width, height, createCollisionVolume) {
        super();
        this.init(width || 3, height || 0.7,"forest_tileset", width, height);
        this.scaleX = 32/512;
        this.scaleY = 32/512;
        this.translate([width/2, -height/2, 0]);
        if (createCollisionVolume) {
            this.addChild(new GeometryVolume(width || 3, height || 0.7, 2));
        }
        let material = new PlatformMaterial("forest_tileset");
        material.setHeight(this.height);
        material.setWidth(this.width);
        material.setScale(this.scaleX, this.scaleY);

        this.setMaterial(material);
    }
}