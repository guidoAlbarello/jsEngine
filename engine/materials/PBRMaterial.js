class PBRMaterial extends Material {
	constructor() {
		super();
		this.setAlbedo("white");
		this.setRoughness("white");
		this.setMetallic("black");
		this.setAmbientOcclusion("white");
		this.setNormalMap("z_axis");
		this.setReflectionMap("white_cubemap");
		this.setReflectionIntensity(0.2);
	}

	Id() {
		return PBRMaterial.ID;
	}

	GlobalUniforms() {
		return PBRMaterial.GLOBAL_UNIFORMS;
	}

	setVertexPositions(positions) {
		this.addAttribute("aVertexPosition", positions, 3);
	}

	setVertexNormals(normals) {
		this.addAttribute("aVertexNormal", normals, 3);
	}

	setTextureCoordinates(texCoords) {
		this.addAttribute("aTexCoord", texCoords, 2);
	}

	setVertexTangents(tangents) {
		this.addAttribute("aVertexTangent", tangents, 3);
	}

	static setProjectionMatrix(projectionMatrix) {
		PBRMaterial.GLOBAL_UNIFORMS.push(
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

	setWorldMatrix(worldMatrix) {
		this.addUniform("uMMatrix", gRenderer.MAT4, worldMatrix);
	}

	static setLight(light) {
		PBRMaterial.GLOBAL_UNIFORMS.push(
			Material.makeUniform(
				"dirLight.direction",
				gRenderer.VEC3,
				light.direction
			)
		);
		PBRMaterial.GLOBAL_UNIFORMS.push(
			Material.makeUniform(
				"dirLight.intensity",
				gRenderer.VEC3,
				light.intensity
			)
		);
	}

	static setPointLights(lights) {
		for (let i = 0; i < lights.length; i++) {
			let light = lights[i];
			PBRMaterial.GLOBAL_UNIFORMS.push(
				Material.makeUniform(
					"pointLights[" + i + "].position",
					gRenderer.VEC3,
					light.position()
				)
			);
			PBRMaterial.GLOBAL_UNIFORMS.push(
				Material.makeUniform(
					"pointLights[" + i + "].intensity",
					gRenderer.VEC3,
					light.intensity
				)
			);
		}
	}

	static setCameraPosition(cameraPosition) {
		PBRMaterial.GLOBAL_UNIFORMS.push(
			Material.makeUniform("cameraPos", gRenderer.VEC3, cameraPosition)
		);
	}

	setAlbedo(texture) {
		this.setFirstAlbedo(texture);
		this.setSecondAlbedo(texture);
	}

	setFirstAlbedo(texture) {
		this.addSampler("params.albedo", gTextureManager.getTexture(texture));
	}

	// Mixed with first albedo with perlin noise
	setSecondAlbedo(texture) {
		this.addSampler(
			"params.second_albedo",
			gTextureManager.getTexture(texture)
		);
	}

	setRoughness(texture) {
		this.addSampler(
			"params.roughness",
			gTextureManager.getTexture(texture)
		);
	}

	setMetallic(texture) {
		this.addSampler("params.metallic", gTextureManager.getTexture(texture));
	}

	setAmbientOcclusion(texture) {
		this.addSampler(
			"params.ambient_occlusion",
			gTextureManager.getTexture(texture)
		);
	}

	setNormalMap(texture) {
		this.addSampler(
			"params.normal_map",
			gTextureManager.getTexture(texture)
		);
	}

	setReflectionMap(texture) {
		this.addSampler(
			"params.reflection_map",
			gTextureManager.getTexture(texture)
		);
	}

	setReflectionIntensity(intensity) {
		this.addUniform(
			"params.reflection_intensity",
			gRenderer.FLOAT,
			intensity
		);
	}
}

PBRMaterial.resetGlobals = () => {
	PBRMaterial.GLOBAL_UNIFORMS = [];
};

PBRMaterial.resetGlobals();
