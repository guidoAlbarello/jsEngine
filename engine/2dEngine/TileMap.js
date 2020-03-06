class TileMap extends Object3d{
    // Tilemap should have squared dimensions. So..
    // width * scaleX and height * scaleY must be a power of 2 
    // (2^n = width * scaleX = height *  scaleY with n natural)
    constructor(width, height, scaleX, scaleY, tileSize, textureSize, texture) {
        super();
        this.texture = texture;
        this.tags = [];
        this.tiles = new Array(width);
        for (let i = 0; i < width; i++) {
            this.tiles[i] = new Array(height);
        } 

        this.tileSize = tileSize/textureSize;

        for (let i = 0; i < this.tiles.length; i++) {
            for (let j = 0; j < this.tiles[i].length; j++) {
                // Check later if it's necessary to pass to tile scaleX and scaleY
                this.tiles[i][j] = new Tile(texture, j * scaleX, i * scaleY, scaleX, scaleY, this.tileSize, this.tileSize);
                this.addChild(this.tiles[i][j]);
            }
        }
    }

    addTag(tag, textureOffsetX, textureOffsetY) {
        this.tags[tag] = [textureOffsetX, textureOffsetY];
    }

    fillWith(tagKey) {
        if (this.tags[tagKey]) {
            let currentTag;
            for (let i = 0; i < this.tiles.length; i++) {
                for(let j = 0; j < this.tiles[i].length; j++) {
                    currentTag = this.tags[tagKey];
                    this.tiles[i][j].setTextureOffset(currentTag[0], currentTag[1]);
                }
            }
        } else {
            console.log("There's no tile with that tag");
        }
    }

    // This can be more complex than just changing the texture. 
    // Like changing the type or something else, if there's more need in the logic.
    addTile(tagKey, x, y) {
        if (this.tags[tagKey]) {
            let newTag = this.tags[tagKey];
            this.tiles[y][x].setTextureOffset(newTag[0], newTag[1]);
        } else {
            console.log("There's no tile with that tag");
        }
    }
}

class TileMapBuilder {
    setHeight(height) {
        this.height = height;
        return this;
    }

    setWidth(width) {
        this.width = width;
        return this;
    }

    setScaleTileInX(scaleX) {
        this.scaleX = scaleX;
        return this;
    }

    setScaleTileInY(scaleY) {
        this.scaleY = scaleY;
        return this;
    }

    setTileSize(tileSize) {
        this.tileSize = tileSize;
        return this;
    }

    setTextureSize(textureSize) {
        this.textureSize = textureSize;
        return this;
    }
    
    setTexture(texture) {
        this.texture = texture;
        return this;
    }

    build() {
        if (this.width && this.height && this.scaleX && this.scaleY && this.tileSize && this.textureSize && this.texture) {
            return new TileMap(this.width, this.height, this.scaleX, this.scaleY, this.tileSize, this.textureSize, this.texture);
        } else {
            console.log("Error building tilemap. Missing attributes.");
            return undefined;
        }
    }
}

TileMap.newBuilder = () => {
    return new TileMapBuilder();
};