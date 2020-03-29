class Lava extends Sprite {
    constructor(width, height) {
        super();
        this.init(width || 3, height || 0.7,"lava_color", 1,1);
        this.translate([width/2, -height/2, 0]);
        let material = new LavaMaterial("lava_color");
        this.setMaterial(material);
    }
}