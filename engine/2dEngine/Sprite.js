class Sprite extends Object3d {
    constructor(...args) {
        super();
        this.offsetX = 0;
        this.offsetY = 0;
        if (args.length == 5) {
            this.init(...args);
        }
    }

    init(width, height, textureAtlas, scaleX, scaleY) {
        this.height = height;
        this.width = width;
        this.scaleX = scaleX || 1;
        this.scaleY = scaleY || 1;
        this.setHitbox(new BoxHitbox2d(-width/2, -height/2, width/2, height/2));
        this.setModel(gSurfaceCreator.makeQuad(width, height, this.scaleX, this.scaleY));
        this.setMaterial(new DefaultSpriteMaterial(textureAtlas));
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }
    
    setTextureOffset(x,y) {
        this.offsetX = x;
        this.offsetY = y;
        this.material.setTextureOffset(this.offsetX * this.scaleX, this.offsetY * this.scaleY);
    }

    setTextureScale(scaleX, scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }

    setAnimationManager(animationManager) {
        this.animationManager = animationManager;
        let animationBehaviour = new Behaviour(this);
        animationBehaviour.setUpdate(() => {
            this.animationManager.update();
            let frame = this.animationManager.getCurrentAnimation().getCurrentFrame();
            this.setTextureOffset(frame.offsetX, frame.offsetY);
        });
        this.behaviours.push(animationBehaviour);
    }
}











