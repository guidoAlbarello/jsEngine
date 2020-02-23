class AssetManager {
	gl;

	POSITIONS = "positions";
	NORMALS = "normals";
	TEXTURE_COORDINATES = "texture_coordinates";
	TANGENTS = "tangents";

	constructor() {
		this.nextMeshId = 0;
		this.models = [];
	}

	getNextMeshId() {
		return this.nextMeshId++;
	}

	readJson(pathname) {
		// TODO: Handle error case.
		return new Promise(resolve => {
			$.getJSON(pathname, function(data) {
				resolve(data);
			});
		});
	}

	async loadDataFromFile(modelDataFilename) {
		// if not loaded
		let modelData = await this.readJson(modelDataFilename);
		return this.loadData(modelData);
	}

	getWebglDrawingMethod(drawingMethod) {
		switch (drawingMethod) {
			case "TRIANGLE_STRIP":
				return this.gl.TRIANGLE_STRIP;
			case "TRIANGLES":
				return this.gl.TRIANGLES;
			case "POINTS":
				return this.gl.POINTS;
			case "LINES":
				return this.gl.LINES;
			case "TRIANGLE_FAN":
				return this.gl.TRIANGLE_FAN;
			case "LINE_LOOP":
				return this.gl.LINE_LOOP;
			case "LINE_STRIP":
				return this.gl.LINE_STRIP;
			default:
				return this.gl.TRIANGLE_STRIP;
		}
	}

	copyBufferToRenderer(bufferData) {
		let bufferLocation = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, bufferLocation);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array(bufferData),
			this.gl.STATIC_DRAW
		);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		return bufferLocation;
	}

	// TODO: Move loaders out of this class.
	loadData(modelData) {
		let mesh = new Mesh();
		mesh.id = this.getNextMeshId();
		let attributes = modelData.attributes;

		for (let i = 0; i < attributes.length; i++) {
			if (attributes[i]["data"].length > 0)
				mesh.attributes[attributes[i]["name"]] = [
					this.copyBufferToRenderer(attributes[i]["data"]),
					attributes[i]["data"]
				];
		}

		mesh.indexBuffer = modelData.indexBuffer;
		mesh.drawingMethod = this.getWebglDrawingMethod(
			modelData.drawingMethod
		);

		mesh.indexBufferLocation = this.gl.createBuffer();
		this.gl.bindBuffer(
			this.gl.ELEMENT_ARRAY_BUFFER,
			mesh.indexBufferLocation
		);
		this.gl.bufferData(
			this.gl.ELEMENT_ARRAY_BUFFER,
			new Uint32Array(mesh.indexBuffer),
			this.gl.STATIC_DRAW
		);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);

		this.models.push(mesh);
		return mesh;
	}

	// Refactor to put indexBuffer inside params.
	makeModelData(params, indexBuffer, drawingMethod) {
		let tangents_temp = [];
		let tangents = [];

		// This is too slow, either add a loading screen, or refactor.
		if (params.textureCoordinates.length > 0) {
			for (let i = 0; i < params.positions.length / 3; i++) {
				tangents_temp[i] = [[0, 0, 0], 0];
			}
			// If drawing method is TRIANGLES use a step of 3.
			// Otherwise if TRIANGLE STRIP use step of 1.
			let step = drawingMethod == "TRIANGLES" ? 3 : 1;
			for (let j = 0; j < indexBuffer.length - 2; j += step) {
				let i1 = indexBuffer[j];
				let i2 = indexBuffer[j + 1];
				let i3 = indexBuffer[j + 2];

				let p1 = [
					params.positions[3 * i1],
					params.positions[3 * i1 + 1],
					params.positions[3 * i1 + 2]
				];
				let p2 = [
					params.positions[3 * i2],
					params.positions[3 * i2 + 1],
					params.positions[3 * i2 + 2]
				];
				let p3 = [
					params.positions[3 * i3],
					params.positions[3 * i3 + 1],
					params.positions[3 * i3 + 2]
				];
				let uv1 = [
					params.textureCoordinates[2 * i1],
					params.textureCoordinates[2 * i1 + 1]
				];
				let uv2 = [
					params.textureCoordinates[2 * i2],
					params.textureCoordinates[2 * i2 + 1]
				];
				let uv3 = [
					params.textureCoordinates[2 * i3],
					params.textureCoordinates[2 * i3 + 1]
				];

				let edge1 = vec3.create();
				let edge2 = vec3.create();
				let deltaUV1 = vec2.create();
				let deltaUV2 = vec2.create();
				let tangent = vec3.create();

				vec3.scaleAndAdd(edge1, p2, p1, -1);
				vec3.scaleAndAdd(edge2, p3, p1, -1);
				vec2.scaleAndAdd(deltaUV1, uv2, uv1, -1);
				vec2.scaleAndAdd(deltaUV2, uv3, uv1, -1);

				let invDet =
					1.0 /
					(deltaUV1[0] * deltaUV2[1] - deltaUV2[0] * deltaUV1[1]);
				vec3.scaleAndAdd(tangent, tangent, edge1, deltaUV2[1]);
				vec3.scaleAndAdd(tangent, tangent, edge2, -deltaUV1[1]);
				vec3.scale(tangent, tangent, invDet);

				// If two points in a row are repeated, don't add them.
				if (!(i1 == i2 || i1 == i3 || i3 == i2)) {
					// P1
					vec3.add(
						tangents_temp[i1][0],
						tangents_temp[i1][0],
						tangent
					);
					tangents_temp[i1][1]++;

					// P2
					vec3.add(
						tangents_temp[i2][0],
						tangents_temp[i2][0],
						tangent
					);
					tangents_temp[i2][1]++;

					// P3
					vec3.add(
						tangents_temp[i3][0],
						tangents_temp[i3][0],
						tangent
					);
					tangents_temp[i3][1]++;
				}
			}

			for (let i = 0; i < params.positions.length / 3; i++) {
				let tangent = vec3.create();

				vec3.scale(tangent, tangents_temp[i][0], tangents_temp[i][1]);
				vec3.normalize(tangent, tangent);

				tangents.push(tangent[0]);
				tangents.push(tangent[1]);
				tangents.push(tangent[2]);
			}
		}

		return {
			drawingMethod: drawingMethod,
			indexBuffer: indexBuffer,
			attributes: [
				{
					name: this.POSITIONS,
					data: params.positions
				},
				{
					name: this.NORMALS,
					data: params.normals
				},
				{
					name: this.TEXTURE_COORDINATES,
					data: params.textureCoordinates
				},
				{
					name: this.TANGENTS,
					data: tangents
				}
			]
		};
	}

	makeModelParams() {
		return {
			positions: [],
			normals: [],
			textureCoordinates: []
		};
	}

	setContext(gl) {
		this.gl = gl;
	}
}
