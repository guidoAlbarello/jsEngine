class OrgansMaterial extends Material {
	constructor(texture) {
        super();
        this.setTextureAtlas(texture || "white");
		this.setVertexNormals([0,1,0]);
		this.setTextureOffset(0,0);
	}

	Id() {
		return OrgansMaterial.ID;
	}

	GlobalUniforms() {
		return OrgansMaterial.GLOBAL_UNIFORMS;
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
		OrgansMaterial.GLOBAL_UNIFORMS.push(
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

    setHasHeart(hasHeart) {
        this.addUniform("has_heart", gRenderer.BOOL, hasHeart);
    }

    setHasLiver(hasLiver) {
        this.addUniform("has_liver", gRenderer.BOOL, hasLiver);
    }
  
    setHasBrain(hasBrain) {
        this.addUniform("has_brain", gRenderer.BOOL, hasBrain);
    }
}

OrgansMaterial.resetGlobals = () => {
	OrgansMaterial.GLOBAL_UNIFORMS = [];
};

OrgansMaterial.resetGlobals();
