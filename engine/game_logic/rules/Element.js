class Element extends Object3d {
    constructor() {
        super();
        let model = gSurfaceCreator.makeCube(2, 0.1, 3, 1,1);
        let material = new PBRMaterial();
        material.setAlbedo("blue");

        model.setMaterial(material);
        model.id = this.id;

        this.setHitbox(new BoxHitbox(-1, -0.05, -1, 1, 0.05, 1));
        gCollisionDetection.registerCollidable(this, 'element');

        this.addChild(model );
    }

    getType() {
        return 'mud';
    }
}