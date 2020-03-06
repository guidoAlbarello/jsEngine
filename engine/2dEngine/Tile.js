class Tile extends Sprite {
    constructor(textureAtlas, posX, posY, width, height, scaleX, scaleY, collisionTag) {
        super(width, height, textureAtlas,scaleX, scaleY);
        this.translate([posX, posY, 0]);
        if (collisionTag)
            gCollisionDetection.registerCollidable(this, collisionTag);
    }
}