class MeleeEnemy extends Object3d {
    constructor() {
        super();
        let sphere = gSurfaceCreator.makeSphere(1.5, 40);
        let material = new PBRMaterial();
        material.setAlbedo("blue");
        sphere.setMaterial(material);
        sphere.id = this.id;
        
        this.setHitbox(new SphericalHitbox(0.5));
        gCollisionDetection.registerCollidable(this, 'enemy');
        
        this.addChild(sphere);
    }
}