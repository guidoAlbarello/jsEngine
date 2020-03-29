class LavaMaterial extends Material {
	constructor(texture) {
        super();
        this.setTextureAtlas(texture || "white");
		this.setVertexNormals([0,1,0]);
		this.setTextureOffset(0,0);
	}

	Id() {
		return LavaMaterial.ID;
	}

	GlobalUniforms() {
		return LavaMaterial.GLOBAL_UNIFORMS;
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
		LavaMaterial.GLOBAL_UNIFORMS.push(
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
}

LavaMaterial.resetGlobals = () => {
	LavaMaterial.GLOBAL_UNIFORMS = [];
};

LavaMaterial.resetGlobals();
