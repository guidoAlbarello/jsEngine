class PlatformMaterial extends Material {
	constructor(texture) {
        super();
        this.setTextureAtlas(texture || "white");
		this.setVertexNormals([0,1,0]);
		this.setTextureOffset(0,0);
	}

	Id() {
		return PlatformMaterial.ID;
	}

	GlobalUniforms() {
		return PlatformMaterial.GLOBAL_UNIFORMS;
	}

	setVertexPositions(positions) {
		this.addAttribute("aVertexPosition", positions, 3);
	}

	setVertexNormal(normals) {
		this.addAttribute("aVertexNormal", normals, 3);
    }
    
    setTextureCoordinates(texCoords) {
		this.addAttribute("aTexCoord", texCoords, 2);
	}

	static setProjectionMatrix(projectionMatrix) {
		PlatformMaterial.GLOBAL_UNIFORMS.push(
			Material.makeUniform("uPMatrix", gRenderer.MAT4, projectionMatrix)
		);
	}

	// Maybe refactor this to optimize changes in the same property.
	setModelViewMatrix(modelViewMatrix) {
		this.addUniform("uMVMatrix", gRenderer.MAT4, modelViewMatrix);
	}

	setNormalMatrix(normalMatrix) {
		this.addUniform("uNormalMatrix", gRenderer.MAT4, normalMatrix);
	}

    setTextureAtlas(texture) {
        this.addSampler("textureAtlas", gTextureManager.getTexture(texture));
    }

	setWorldMatrix(matrix) {}

	setTextureOffset(offsetX, offsetY) {
		this.addUniform("offset", gRenderer.VEC3, [offsetX, offsetY, 0]);
    }
    
    setHeight(height) {
        this.addUniform("uHeight", gRenderer.FLOAT, height);
    }
    
    setWidth(width) {
        this.addUniform("uWidth", gRenderer.FLOAT, width);
    }

    setScale(scaleX, scaleY) {
        this.addUniform("uScale", gRenderer.VEC3, [scaleX, scaleY, 0]);
    }
}

PlatformMaterial.resetGlobals = () => {
	PlatformMaterial.GLOBAL_UNIFORMS = [];
};

PlatformMaterial.resetGlobals();
