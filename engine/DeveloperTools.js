class DeveloperTools {
	// Refactor to unbinf vertex buffers. We have to set the normals, otherwise it will try to use the normals of another models apparently.
	// We need to unbound previous buffers.
	makeGrid() {
		let positions = [];
		let normals = [];
		let length = 1000;
		for (let i = 0; i < length; i++) {
			positions.push(-(length - 1.0) / 2.0); // x
			positions.push(0.0); // y
			positions.push((length - 1.0) / 2.0 - i); // z

			normals.push(0);
			normals.push(1);
			normals.push(0);

			positions.push((length - 1.0) / 2.0); // x
			positions.push(0.0); // y
			positions.push((length - 1.0) / 2.0 - i); // z

			normals.push(0);
			normals.push(1);
			normals.push(0);
		}

		for (let i = 0; i < length; i++) {
			positions.push(i - (length - 1.0) / 2.0); // x
			positions.push(0.0); // y
			positions.push((length - 1.0) / 2.0); // z

			normals.push(0);
			normals.push(1);
			normals.push(0);

			positions.push(i - (length - 1.0) / 2.0); // x
			positions.push(0.0); // y
			positions.push(-(length - 1.0) / 2.0); // z

			normals.push(0);
			normals.push(1);
			normals.push(0);
		}

		let plane = new Object3d();
		let params = gAssetManager.makeModelParams();
		params.positions = positions;
		params.normals = normals;
		let indexBuffer = [];
		for (let i = 0; i < 4 * length; i++) indexBuffer.push(i);
		plane.setModel(
			gAssetManager.makeModelData(params, indexBuffer, "LINES")
		);
		plane.setMaterial(new DefaultMaterial([0.5, 0.3, 0.5]));

		return plane;
	}

	makeTranslationAxisTern() {
		let axis = new Object3d();

		let x_axis = this.makeTranslationAxis();
		x_axis.rotate(-Math.PI / 2, [0.0, 0.0, 1.0]);
		x_axis.setMaterial(new DefaultMaterial([1.0, 0.0, 0.0]));

		let y_axis = this.makeTranslationAxis();
		y_axis.setMaterial(new DefaultMaterial([0.0, 1.0, 0.0]));

		let z_axis = this.makeTranslationAxis();
		z_axis.rotate(Math.PI / 2, [1.0, 0.0, 0.0]);
		z_axis.setMaterial(new DefaultMaterial([0.0, 0.0, 1.0]));

		let center = gSurfaceCreator.makeSphere(0.05, 25);
		center.setMaterial(new DefaultMaterial([0.05, 0.05, 0.05]));

		axis.addChild(x_axis);
		axis.addChild(y_axis);
		axis.addChild(z_axis);
		axis.addChild(center);

		return axis;
	}

	makeTranslationAxis() {
		let triangleForm = {
			positions: [
				[0.0, 0.0, 0.0],
				[0.015, 0.0, 0.0],
				[0.015, 2.2, 0.0],
				[0.037, 2.2, 0.0],
				[0.0, 2.5, 0.0]
			],
			normals: [
				[0.0, -1.0, 0.0],
				[1.0, 0.0, 0.0],
				[1.0, 0.0, 0.0],
				[1.0, 0.0, 0.0],
				[0.0, 1.0, 0.0]
			],
			amountOfVertices: 5
		};

		return gSurfaceCreator.makeRevolutionSurface(triangleForm, 360.0, 10);
	}

	addModelToPointLight(pointLight) {
		pointLight.mesh = gSurfaceCreator.makeSphere(0.1, 20).mesh;
		pointLight.setMaterial(new DefaultMaterial(makeRgb(255, 125, 0)));
	}

	addModelToCamera(camera) {
		let model = gSurfaceCreator.makeCube(1, 1, 2);
		model.setMaterial(new DefaultMaterial(makeRgb(168, 158, 125)));
		camera.addChild(model);

		let frustrum = new Object3d();
		let params = gAssetManager.makeModelParams();
		let positions = [
			-camera.width / 2,
			+camera.height / 2,
			camera.near,
			camera.width / 2,
			+camera.height / 2,
			camera.near,
			-camera.width / 2,
			-camera.height / 2,
			camera.near,
			camera.width / 2,
			-camera.height / 2,
			camera.near
		];

		for (let i = 0; i < 4 * 3; i += 3) {
			let scale =
				(camera.far - camera.near) *
				Math.tan(((camera.fov / 2) * Math.PI) / 180.0);
			positions.push(positions[i] * scale);
			positions.push(positions[i + 1] * scale);
			positions.push(camera.far);
		}

		params.positions = positions;
		let indexBuffer = [
			0,
			1,
			0,
			2,
			2,
			3,
			3,
			1,
			0,
			4,
			1,
			5,
			2,
			6,
			3,
			7,
			4,
			5,
			4,
			6,
			6,
			7,
			7,
			5
		];

		frustrum.setModel(
			gAssetManager.makeModelData(params, indexBuffer, "LINES")
		);
		camera.addChild(frustrum);
	}

	addDeveloperModels(scene) {
		// for now only support point lights.
		for (let i = 0; i < scene.pointLights.length; i++) {
			let pointLight = scene.pointLights[i];
			if (!pointLight.mesh) this.addModelToPointLight(pointLight);
		}

		for (let cameraName in scene.cameras) {
			let camera = scene.cameras[cameraName];
			if (camera.nodes.length == 0 && cameraName != scene.currentCamera)
				this.addModelToCamera(camera);
		}
	}

	removeDeveloperModels(scene) {
		// for now only support point lights.
		for (let i = 0; i < scene.pointLights.length; i++) {
			let pointLight = scene.pointLights[i];
			if (pointLight.mesh) pointLight.mesh = undefined; // Maybe deo some better destruction. Who knows.
		}

		for (let cameraName in scene.cameras) {
			let camera = scene.cameras[cameraName];
			// for now delete all the childs of the camera, we are not using any childs.
			camera.nodes = [];
		}
	}

	drawHitbox(object) {
		for (let i = 0; i < object.nodes.length; i++)
			this.drawHitbox(object.nodes[i]);
		if (object.hitbox) {
			let segments = [];
			let indexBuffer = [];
			let samples = 90;
			let step = 2 * Math.PI/samples;
			if (object.hitbox.getType() == "SPHERICAL_HITBOX") {
				for (let i = 0; i < 2 * Math.PI; i += step) {
					segments.push(Math.cos(i) * object.hitbox.getRadius());
					segments.push(0);
					segments.push(Math.sin(i) * object.hitbox.getRadius());
				}

				for (let i = 0; i < 2 * Math.PI; i += step) {
					segments.push(0);
					segments.push(Math.cos(i) * object.hitbox.getRadius());
					segments.push(Math.sin(i) * object.hitbox.getRadius());
				}

				for (let i = 0; i < samples; i++) {
					indexBuffer.push(i);
					indexBuffer.push(i+1);
				}
				indexBuffer.push(samples-1);
				indexBuffer.push(0);
				
				for (let i = 0; i < samples; i++) {
					indexBuffer.push(samples + i);
					indexBuffer.push(samples + i+1);
				}
				indexBuffer.push(2 * samples -1);
				indexBuffer.push(samples);
			}
			if (object.hitbox.getType() == "BOX_HITBOX") {
				segments = [
					// Back face
					object.hitbox.getMinX(), object.hitbox.getMinY(), object.hitbox.getMinZ(),
					object.hitbox.getMaxX(), object.hitbox.getMinY(), object.hitbox.getMinZ(),
					object.hitbox.getMinX(), object.hitbox.getMaxY(), object.hitbox.getMinZ(),
					object.hitbox.getMaxX(), object.hitbox.getMaxY(), object.hitbox.getMinZ(),

					// Front face
					object.hitbox.getMinX(), object.hitbox.getMinY(), object.hitbox.getMaxZ(),
					object.hitbox.getMaxX(), object.hitbox.getMinY(), object.hitbox.getMaxZ(),
					object.hitbox.getMinX(), object.hitbox.getMaxY(), object.hitbox.getMaxZ(),
					object.hitbox.getMaxX(), object.hitbox.getMaxY(), object.hitbox.getMaxZ(),
				];

				indexBuffer = [
					0,
					1,
					0,
					2,
					2,
					3,
					3,
					1,
					0,
					4,
					1,
					5,
					2,
					6,
					3,
					7,
					4,
					5,
					4,
					6,
					6,
					7,
					7,
					5
				];
			}

			let hitboxVolume = new Object3d();
			let params = gAssetManager.makeModelParams();
			params.positions = segments;
			

			hitboxVolume.setModel(
				gAssetManager.makeModelData(params, indexBuffer, "LINES")
			);
			hitboxVolume.setMaterial(new DefaultMaterial([1.0, 1.0, 0.005]));

			object.addChild(hitboxVolume);
		}
	}

	drawNormals(object) {
		let normalLength = 0.5;

		for (let i = 0; i < object.nodes.length; i++) {
			this.drawNormals(object.nodes[i]);
		}

		if (object.mesh) {
			let vertices = object.mesh.attributes[gAssetManager.POSITIONS][1];
			let normals = object.mesh.attributes[gAssetManager.NORMALS][1];

			let normalSegments = [];
			for (let i = 0; i < vertices.length; i += 3) {
				normalSegments.push(vertices[i]);
				normalSegments.push(vertices[i + 1]);
				normalSegments.push(vertices[i + 2]);

				normalSegments.push(vertices[i] + normalLength * normals[i]);
				normalSegments.push(
					vertices[i + 1] + normalLength * normals[i + 1]
				);
				normalSegments.push(
					vertices[i + 2] + normalLength * normals[i + 2]
				);
			}

			let normalLines = new Object3d();
			let params = gAssetManager.makeModelParams();
			params.positions = normalSegments;
			params.normals = normalSegments;
			let indexBuffer = [];
			for (let i = 0; i < normalSegments.length / 3; i++)
				indexBuffer.push(i);
			normalLines.setModel(
				gAssetManager.makeModelData(params, indexBuffer, "LINES")
			);
			normalLines.setMaterial(new DefaultMaterial([1.0, 1.0, 0.005]));

			object.addChild(normalLines);
		}
	}
}
