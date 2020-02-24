class Chaser extends Object3d {
    constructor() {
        super();
        let sphere = gSurfaceCreator.makeSphere(0.5, 40);
        this.translate([0,10,0])
        let material = new PBRMaterial();
        this.setHitbox(new SphericalHitbox(0.5));
        material.setAlbedo("violet");
        sphere.setMaterial(material);
        sphere.id = this.id;
        gCollisionDetection.registerCollidable(this, 'enemy');

        this.addChild(sphere);
    }
}