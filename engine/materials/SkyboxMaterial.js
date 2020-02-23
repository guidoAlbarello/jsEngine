class SkyboxMaterial extends Material {
	constructor(texture) {
		super();
		if (texture) this.setSkybox(texture);
	}

	Id() {
		return SkyboxMaterial.ID;
	}

	GlobalUniforms() {
		return SkyboxMaterial.GLOBAL_UNIFORMS;
	}

	setVertexPositions(positions) {
		this.addAttribute("aVertexPosition", positions, 3);
	}

	static setProjectionMatrix(projectionMatrix) {
		SkyboxMaterial.GLOBAL_UNIFORMS.push(
			Material.makeUniform("uPMatrix", gRenderer.MAT4, projectionMatrix)
		);
	}

	// Maybe refactor this to optimize changes in the same property.
	setModelViewMatrix(modelViewMatrix) {
		this.addUniform("uMVMatrix", gRenderer.MAT4, modelViewMatrix);
	}

	setNormalMatrix(normalMatrix) {
		// do nothing.
	}

	setWorldMatrix(worldMatrix) {}

	setSkybox(texture) {
		this.addSampler("skybox", gTextureManager.getTexture(texture));
	}
}

SkyboxMaterial.resetGlobals = () => {
	SkyboxMaterial.GLOBAL_UNIFORMS = [];
};

SkyboxMaterial.resetGlobals();
