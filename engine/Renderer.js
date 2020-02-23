class Renderer {
	gl;

	viewMatrix;
	projectionMatrix;
	usedProgram;

	MAT4 = "mat4";
	VEC3 = "vec3";
	FLOAT = "float";

	constructor() {
		this.elementsToDraw = [];
		this.currentSampler = 0;
	}

	init(canvas) {
		this.canvas = canvas;
		try {
			this.gl =
				canvas.getContext("webgl") ||
				canvas.getContext("experimental-webgl");
		} catch (e) {
			console.log(e);
		}

		if (this.gl) {
			gShaderManager.setContext(this.gl);
			gAssetManager.setContext(this.gl);
			gTextureManager.setContext(this.gl);
			this.setupWebGL();
		} else {
			alert("Problem initializing webgl");
		}
	}

	initMaterials() {
		for (let i = 0; i < gMaterialManager.materials.length; i++) {
			let materialProgram = gMaterialManager.materials[i];
			this.elementsToDraw[materialProgram.material.ID] = [];
			materialProgram.material.resetGlobals();
		}
	}

	setProjectionMatrix(projectionMatrix) {
		this.projectionMatrix = projectionMatrix;
	}

	setViewMatrix(viewMatrix) {
		this.viewMatrix = viewMatrix;
	}

	setupWebGL() {
		//set the clear color
		//        this.gl.clearColor(0.32, 0.41, 0.46, 1.0);
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPxTH_BUFFER_BIT);

		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

		// Support 32 bits long elements in the index buffer.x
		if (!this.gl.getExtension("OES_element_index_uint"))
			alert("Browser does not support uint for indexBuffer length");
	}

	getTextureSampler(samplerNumber) {
		if (
			samplerNumber >
			this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS)
		)
			alert("Amount of texture units not supported");

		switch (samplerNumber) {
			case 0:
				return this.gl.TEXTURE0;
			case 1:
				return this.gl.TEXTURE1;
			case 2:
				return this.gl.TEXTURE2;
			case 3:
				return this.gl.TEXTURE3;
			case 4:
				return this.gl.TEXTURE4;
			case 5:
				return this.gl.TEXTURE5;
			case 6:
				return this.gl.TEXTURE6;
			case 7:
				return this.gl.TEXTURE7;
			case 8:
				return this.gl.TEXTURE8;
			case 9:
				return this.gl.TEXTURE9;
			case 10:
				return this.gl.TEXTURE10;
			case 11:
				return this.gl.TEXTURE11;
			case 12:
				return this.gl.TEXTURE12;
			case 13:
				return this.gl.TEXTURE13;
			case 14:
				return this.gl.TEXTURE14;
			case 15:
				return this.gl.TEXTURE15;
			case 16:
				return this.gl.TEXTURE16;
			case 17:
				return this.gl.TEXTURE17;
			case 18:
				return this.gl.TEXTURE18;
			case 19:
				return this.gl.TEXTURE19;
			case 20:
				return this.gl.TEXTURE20;
			case 21:
				return this.gl.TEXTURE21;
			case 22:
				return this.gl.TEXTURE22;
			case 23:
				return this.gl.TEXTURE23;
			case 24:
				return this.gl.TEXTURE24;
			case 25:
				return this.gl.TEXTURE25;
			case 26:
				return this.gl.TEXTURE26;
			case 27:
				return this.gl.TEXTURE27;
			case 28:
				return this.gl.TEXTURE28;
			case 29:
				return this.gl.TEXTURE29;
			case 30:
				return this.gl.TEXTURE30;
			case 31:
				return this.gl.TEXTURE31;
		}
	}

	bindBuffer(valuesPerVertex, bufferLocation, shaderLocation, shaderProgram) {
		let attribute = this.gl.getAttribLocation(
			shaderProgram,
			shaderLocation
		);
		if (attribute != -1) {
			this.gl.enableVertexAttribArray(attribute);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferLocation);
			// TODO: See if it's useful to make this parameters dynamic.
			this.gl.vertexAttribPointer(
				attribute,
				valuesPerVertex,
				this.gl.FLOAT,
				false,
				0,
				0
			);
		}
	}

	bindUniform(name, type, data, shaderProgram) {
		let location = this.gl.getUniformLocation(shaderProgram, name);
		if (location != -1) {
			switch (type) {
				case this.MAT4:
					this.gl.uniformMatrix4fv(location, false, data);
					break;
				case this.VEC3:
					this.gl.uniform3fv(location, data);
					break;
				case this.FLOAT:
					this.gl.uniform1f(location, data);
					break;
				default:
					throw "Unspecified uniform";
			}
		}
	}

	bindTexture(samplerName, textureData, shaderProgram, textureType) {
		let sampler = this.gl.getUniformLocation(shaderProgram, samplerName);
		this.gl.activeTexture(this.getTextureSampler(this.currentSampler));
		this.gl.bindTexture(textureType, textureData);
		// Need to check if currentSampler > max amount of samplers in browser.
		this.gl.uniform1i(sampler, this.currentSampler++);
	}

	draw(mesh, material, modelMatrix) {
		// Maybe mesh isn't needed anymore
		this.elementsToDraw[material.Id()].push(
			new RenderData(mesh, material, modelMatrix)
		);
	}

	makeShader(shaderSrc, shaderType) {
		let shader = this.gl.createShader(shaderType);
		this.gl.shaderSource(shader, shaderSrc);
		this.gl.compileShader(shader);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			alert(
				"An error occurred compiling the shaders: " +
					this.gl.getShaderInfoLog(shader)
			);
			return null;
		}
		return shader;
	}

	drawScene() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		for (let i = 0; i < this.elementsToDraw.length; i++) {
			// Operations per shader
			// This can be refactored to avoid iterating through the whole array of materials.
			// If materials are eliminated a lot, it may be cool to rebuild the array.
			if (
				this.elementsToDraw[i] == undefined ||
				this.elementsToDraw[i].length == 0
			)
				continue;
			let materialProgram = gMaterialManager.getMaterial(i);
			if (this.usedProgram != i) {
				this.gl.useProgram(materialProgram.program);
				this.usedProgram = i;
			}

			materialProgram.material.setProjectionMatrix(this.projectionMatrix);
			// Load global uniforms
			for (
				let i = 0;
				i < materialProgram.material.GLOBAL_UNIFORMS.length;
				i++
			) {
				let globalUniform = materialProgram.material.GLOBAL_UNIFORMS[i];
				this.bindUniform(
					globalUniform.name,
					globalUniform.type,
					globalUniform.data,
					materialProgram.program
				);
			}

			for (let j = 0; j < this.elementsToDraw[i].length; j++) {
				// Operations per object
				let renderData = this.elementsToDraw[i][j];
				let material = renderData.material;

				// Load matrix into material. This can be done in the draw face. If we do that, we can't instantiate multiple objects with the same mesh. Need to see if it's worth.
				let modelViewMatrix = mat4.create();
				let normalMatrix = mat4.create();

				mat4.multiply(
					modelViewMatrix,
					this.viewMatrix,
					renderData.modelMatrix
				);
				mat4.invert(normalMatrix, renderData.modelMatrix);
				mat4.transpose(normalMatrix, normalMatrix);

				material.setModelViewMatrix(modelViewMatrix);
				material.setNormalMatrix(normalMatrix);
				material.setWorldMatrix(renderData.modelMatrix);

				// Load per object uniforms
				for (let k = 0; k < material.uniforms.length; k++) {
					let uniform = material.uniforms[k];
					this.bindUniform(
						uniform.name,
						uniform.type,
						uniform.data,
						materialProgram.program
					);
				}

				// Load per object attributes
				for (let k = 0; k < material.attributes.length; k++) {
					let attribute = material.attributes[k];
					this.bindBuffer(
						attribute.valuesPerVertex,
						attribute.location,
						attribute.name,
						materialProgram.program
					);
				}

				// Load per object textures
				for (let k = 0; k < material.textures.length; k++) {
					let texture = material.textures[k];
					this.bindTexture(
						texture.name,
						texture.data,
						materialProgram.program,
						texture.type
					);
				}

				this.gl.bindBuffer(
					this.gl.ELEMENT_ARRAY_BUFFER,
					renderData.mesh.indexBufferLocation
				);
				this.gl.drawElements(
					renderData.drawingMethod(),
					renderData.indexBufferLength(),
					this.gl.UNSIGNED_INT,
					0
				);
				// Unbind texture samplers to avoid unwanted side effects.
				for (let k = 0; k < this.currentSampler; k++) {
					this.gl.activeTexture(this.getTextureSampler(k));
					this.gl.bindTexture(this.gl.TEXTURE_2D, null);
					// We should distinguish between texture and cubemap to free
					this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);
				}
				// Maybe we can group objects in some way that they share textures so the texture samples don't need to get remapped. Seems too farfetched.
				this.currentSampler = 0;
			}
		}
		this.initMaterials();
	}
}
