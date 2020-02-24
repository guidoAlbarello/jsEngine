class MeleeEnemy extends Object3d {
    constructor() {
        super();
        let sphere = gSurfaceCreator.makeSphere(0.5, 40);
        let material = new PBRMaterial();
        material.setAlbedo("blue");
        sphere.setMaterial(material);

        this.addChild(sphere);
    }
}