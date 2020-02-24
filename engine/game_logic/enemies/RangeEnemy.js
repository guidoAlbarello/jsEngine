class RangeEnemy extends Object3d {
    constructor() {
        super();
        let sphere = gSurfaceCreator.makeSphere(0.5, 40);
        let material = new PBRMaterial();
        material.setAlbedo("red");
        sphere.setMaterial(material);

        this.addChild(sphere);
    }
}