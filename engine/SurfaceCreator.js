class SurfaceCreator {
	approximateNormals() {
		// TODO: Maybe implement this. Calculate normals by traversing the index buffer.
	}

	generateIndexBuffer(rows, cols) {
		let indexBuffer = [];
		for (let i = 0; i < rows - 1; i++) {
			for (let j = 0; j < cols; j++) {
				let node = i % 2 == 0 ? j : cols - j - 1;

				indexBuffer.push(node + cols * i);
				indexBuffer.push(node + cols * (i + 1));
			}
		}
		return indexBuffer;
	}

	makeHeightMap(
		rows,
		cols,
		tileWidth,
		height,
		repeatTextureX,
		repeatTextureY
	) {
		let positions = [];
		let normals = [];
		let texture_coordinates = [];

		for (let i = 0.0; i < rows; i++) {
			for (let j = 0.0; j < cols; j++) {
				positions.push(tileWidth * (i - (rows - 1.0) / 2.0)); // x
				positions.push(height[i][j]); // y
				positions.push(tileWidth * (j - (rows - 1) / 2.0)); // z

				normals.push(Math.random() * height[i][j]); // x
				normals.push(1.0); // y
				normals.push(Math.random() * height[i][j]); // z

				texture_coordinates.push((i * repeatTextureX) / rows); // s
				texture_coordinates.push((j * repeatTextureY) / cols); //t
			}
		}

		let plane = new Object3d();
		let params = gAssetManager.makeModelParams();
		params.positions = positions;
		params.normals = normals;
		params.textureCoordinates = texture_coordinates;
		plane.setModel(
			gAssetManager.makeModelData(
				params,
				this.generateIndexBuffer(rows, cols),
				"TRIANGLE_STRIP"
			)
		);
		return plane;
	}

	makePlane(rows, cols, tileWidth) {
		let positions = [];
		let normals = [];
		for (let i = 0.0; i < rows; i++) {
			for (let j = 0.0; j < cols; j++) {
				positions.push(tileWidth * (i - (rows - 1.0) / 2.0)); // x
				positions.push(0.0); // y
				positions.push(tileWidth * (j - (rows - 1) / 2.0)); // z

				normals.push(0.0); // x
				normals.push(1.0); // y
				normals.push(0.0); // z
			}
		}

		let plane = new Object3d();
		let params = gAssetManager.makeModelParams();
		params.positions = positions;
		params.normals = normals;
		plane.setModel(
			gAssetManager.makeModelData(
				params,
				this.generateIndexBuffer(rows, cols),
				"TRIANGLE_STRIP"
			)
		);
		return plane;
	}

	// Should we use GL_TRIANGLES or GL_TRIANGLE_STRIP?
	makeCube(w, h, d, xRepeat = 1, yRepeat = 1) {
		let cube = new Object3d();
		let params = gAssetManager.makeModelParams();
		params.positions = [
			// frontal face
			-w / 2,
			-h / 2,
			d / 2,
			w / 2,
			-h / 2,
			d / 2,
			w / 2,
			h / 2,
			d / 2,
			-w / 2,
			h / 2,
			d / 2,

			// backwards face
			-w / 2,
			-h / 2,
			-d / 2,
			-w / 2,
			h / 2,
			-d / 2,
			w / 2,
			h / 2,
			-d / 2,
			w / 2,
			-h / 2,
			-d / 2,

			// top face
			-w / 2,
			h / 2,
			-d / 2,
			-w / 2,
			h / 2,
			d / 2,
			w / 2,
			h / 2,
			d / 2,
			w / 2,
			h / 2,
			-d / 2,

			// bottom face
			-w / 2,
			-h / 2,
			-d / 2,
			w / 2,
			-h / 2,
			-d / 2,
			w / 2,
			-h / 2,
			d / 2,
			-w / 2,
			-h / 2,
			d / 2,

			// right face
			w / 2,
			-h / 2,
			-d / 2,
			w / 2,
			h / 2,
			-d / 2,
			w / 2,
			h / 2,
			d / 2,
			w / 2,
			-h / 2,
			d / 2,

			// left face
			-w / 2,
			-h / 2,
			-d / 2,
			-w / 2,
			-h / 2,
			d / 2,
			-w / 2,
			h / 2,
			d / 2,
			-w / 2,
			h / 2,
			-d / 2
		];
		params.normals = [
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,
			1.0,

			0.0,
			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,

			0.0,
			1.0,
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,
			1.0,
			0.0,

			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,

			1.0,
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,
			1.0,
			0.0,
			0.0,

			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,
			0.0,
			-1.0,
			0.0,
			0.0
		];

		params.textureCoordinates = [
			0.0,
			0.0,
			1.0 * xRepeat,
			0.0,
			0.0,
			1.0 * yRepeat,
			1.0 * xRepeat,
			1.0 * yRepeat,

			0.0,
			0.0,
			1.0 * xRepeat,
			0.0,
			0.0,
			1.0 * yRepeat,
			1.0 * xRepeat,
			1.0 * yRepeat,

			0.0,
			0.0,
			1.0 * xRepeat,
			0.0,
			0.0,
			1.0 * yRepeat,
			1.0 * xRepeat,
			1.0 * yRepeat,

			0.0,
			0.0,
			1.0 * xRepeat,
			0.0,
			0.0,
			1.0 * yRepeat,
			1.0 * xRepeat,
			1.0 * yRepeat,

			0.0,
			0.0,
			1.0 * xRepeat,
			0.0,
			0.0,
			1.0 * yRepeat,
			1.0 * xRepeat,
			1.0 * yRepeat,

			0.0,
			0.0,
			1.0 * xRepeat,
			0.0,
			0.0,
			1.0 * yRepeat,
			1.0 * xRepeat,
			1.0 * yRepeat,
		];

		cube.setModel(
			gAssetManager.makeModelData(
				params,
				[
					0,
					1,
					2,
					0,
					2,
					3,
					4,
					5,
					6,
					4,
					6,
					7,
					8,
					9,
					10,
					8,
					10,
					11,
					12,
					13,
					14,
					12,
					14,
					15,
					16,
					17,
					18,
					16,
					18,
					19,
					20,
					21,
					22,
					20,
					22,
					23
				],
				"TRIANGLES"
			)
		);

		return cube;
	}

	makeSphere(r, samplesAmount) {
		let step = 180.0 / (samplesAmount - 1);
		let positions = [];
		let normals = [];
		let texture_coordinates = [];

		for (let theta_deg = 0.0; theta_deg <= 180.0; theta_deg += step) {
			let theta = (theta_deg * Math.PI) / 180.0;
			for (let phi_deg = 0.0; phi_deg <= 360.0; phi_deg += 2 * step) {
				let phi = (phi_deg * Math.PI) / 180.0;
				positions.push(r * Math.sin(theta) * Math.cos(phi)); // x
				positions.push(r * Math.cos(theta)); // y
				positions.push(r * Math.sin(theta) * Math.sin(phi)); // z

				normals.push(Math.sin(theta) * Math.cos(phi)); // x
				normals.push(Math.cos(theta)); // y
				normals.push(Math.sin(theta) * Math.sin(phi)); // z

				texture_coordinates.push(phi_deg / 360.0); // s
				texture_coordinates.push(theta_deg / 180.0); // t
			}
		}

		let sphere = new Object3d();
		let params = gAssetManager.makeModelParams();
		params.positions = positions;
		params.normals = normals;
		params.textureCoordinates = texture_coordinates;
		sphere.setModel(
			gAssetManager.makeModelData(
				params,
				this.generateIndexBuffer(samplesAmount, samplesAmount),
				"TRIANGLE_STRIP"
			)
		);
		return sphere;
	}

	// RotationAmount is in degrees
	makeRevolutionSurface(
		form,
		rotationAmount,
		samplesAmount,
		repeatX,
		repeatY
	) {
		let surface = new Object3d();
		surface.setModel(
			gAssetManager.makeModelData(
				this.makeRevolutionSurfaceData(
					form,
					rotationAmount,
					samplesAmount,
					repeatX,
					repeatY
				),
				this.generateIndexBuffer(samplesAmount, form.amountOfVertices),
				"TRIANGLE_STRIP"
			)
		);
		return surface;
	}

	makeRevolutionSurfaceData(
		form,
		rotationAmount,
		samplesAmount,
		repeatX,
		repeatY
	) {
		let step = rotationAmount / (samplesAmount - 1);

		let positions = [];
		let normals = [];
		let textureCoordinates = [];

		let level = mat4.create();
		let normalMatrix = mat4.create();
		for (let phi = 0.0; phi <= rotationAmount; phi += step) {
			mat4.identity(level);
			mat4.rotate(level, level, (phi * Math.PI) / 180.0, [0.0, 1.0, 0.0]);

			mat4.invert(normalMatrix, level);
			mat4.transpose(normalMatrix, normalMatrix);
			for (let j = 0; j < form.amountOfVertices; j++) {
				let position = vec3.create();
				vec3.transformMat4(position, form.positions[j], level);

				positions.push(position[0]);
				positions.push(position[1]);
				positions.push(position[2]);

				let normal = vec4.fromValues(
					form.normals[j][0],
					form.normals[j][1],
					form.normals[j][2],
					1.0
				);
				vec4.transformMat4(normal, normal, normalMatrix);
				normal = vec3.fromValues(normal[0], normal[1], normal[2]);
				vec3.normalize(normal, normal);

				normals.push(normal[0]);
				normals.push(normal[1]);
				normals.push(normal[2]);

				textureCoordinates.push((phi * repeatX) / rotationAmount);
				textureCoordinates.push((j * repeatY) / form.amountOfVertices);
			}
		}

		let params = gAssetManager.makeModelParams();
		params.positions = positions;
		params.normals = normals;
		params.textureCoordinates = textureCoordinates;
		return params;
	}

	/*
      Form example: 
      form = {
	    "positions" :  [
		[0.0, 0.0, 0.5],    
		[0.0, 0.5, 0.0],
		[0.0, -0.5,0.0]
	    ],
	    "normals" : [
		[1.0, 0.0, 0.0],    
		[0.0, 0.5, 0.0],
		[0.0, 1.0,0.5]
	    ],
	    "amountOfVertices" : 3
	}
    */
	makeSurfaceFromFormAndCurve(form, curve, samplesAmount, repeatX, repeatY) {
		let positions = [];
		let normals = [];
		let textureCoordinates = [];
		let discretizedCurve = curve.getUniformSampling(samplesAmount);

		let normalMatrix = mat4.create();
		for (let i = 0; i < samplesAmount; i++) {
			let curveSample = discretizedCurve[i];

			mat4.invert(normalMatrix, curveSample);
			mat4.transpose(normalMatrix, normalMatrix);
			for (let j = 0; j < form.amountOfVertices; j++) {
				let position = vec3.create();
				vec3.transformMat4(position, form.positions[j], curveSample);
				positions.push(position[0]);
				positions.push(position[1]);
				positions.push(position[2]);

				let normal = vec4.fromValues(
					form.normals[j][0],
					form.normals[j][1],
					form.normals[j][2],
					1.0
				);
				vec4.transformMat4(normal, normal, normalMatrix);
				normal = vec3.fromValues(normal[0], normal[1], normal[2]);
				vec3.normalize(normal, normal);
				normals.push(normal[0]);
				normals.push(normal[1]);
				normals.push(normal[2]);

				textureCoordinates.push((j * repeatX) / form.amountOfVertices);
				textureCoordinates.push((i * repeatY) / (samplesAmount - 1));
			}
		}

		let surface = new Object3d();
		let params = gAssetManager.makeModelParams();
		params.positions = positions;
		params.normals = normals;
		params.textureCoordinates = textureCoordinates;
		surface.setModel(
			gAssetManager.makeModelData(
				params,
				this.generateIndexBuffer(samplesAmount, form.amountOfVertices),
				"TRIANGLE_STRIP"
			)
		);
		return surface;
	}

	// This is going to be hard refactored. This is super hardcoded.
	excrute(form, transform) {
		let positions = [];
		let normals = [];
		let textureCoordinates = [];

		form.normals = form.positions;
		for (let i = 0; i < form.amountOfVertices; i++) {
			positions.push(0);
			positions.push(0);
			positions.push(0);

			normals.push(-1);
			normals.push(0);
			normals.push(0);

			textureCoordinates.push(i / form.amountOfVertices);
			textureCoordinates.push(0);
		}

		for (let i = 0; i < form.amountOfVertices; i++) {
			positions.push(form.positions[i][0]);
			positions.push(form.positions[i][1]);
			positions.push(form.positions[i][2]);

			normals.push(form.normals[i][0] * 2);
			normals.push(form.normals[i][1] * 2);
			normals.push(form.normals[i][2] * 2);
			textureCoordinates.push(i / form.amountOfVertices);
			textureCoordinates.push(0.5);
		}

		let normalMatrix = mat4.create();
		mat4.invert(normalMatrix, transform);
		mat4.transpose(normalMatrix, normalMatrix);
		for (let i = 0; i < form.amountOfVertices; i++) {
			let position = vec3.create();
			vec3.transformMat4(position, form.positions[i], transform);
			positions.push(position[0]);
			positions.push(position[1]);
			positions.push(position[2]);

			let normal = vec4.fromValues(
				form.normals[i][0] * 2,
				form.normals[i][1] * 2,
				form.normals[i][2] * 2,
				1.0
			);
			vec4.transformMat4(normal, normal, normalMatrix);
			normal = vec3.fromValues(normal[0], normal[1], normal[2]);
			vec3.normalize(normal, normal);
			normals.push(normal[0]);
			normals.push(normal[1]);
			normals.push(normal[2]);

			textureCoordinates.push(i / form.amountOfVertices);
			textureCoordinates.push(1);
		}

		let surface = new Object3d();
		let params = gAssetManager.makeModelParams();
		params.positions = positions;
		params.normals = normals;
		params.textureCoordinates = textureCoordinates;
		surface.setModel(
			gAssetManager.makeModelData(
				params,
				this.generateIndexBuffer(3, form.amountOfVertices),
				"TRIANGLE_STRIP"
			)
		);

		return surface;
	}

	makeQuad(w, d) {
		return {
			positions: [
				[0, d / 2, -w / 2],
				[0, d / 2, w / 2],
				[0, -d / 2, w / 2],
				[0, -d / 2, -w / 2]
			],
			normals: [
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1],
				[1, 1, 1]
			],
			amountOfVertices: 4
		};
	}
}
