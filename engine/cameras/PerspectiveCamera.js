class PerspectiveCamera extends Object3d {
	viewMatrix;
	projectionMatrix;
	target;
	position;
	UP = [0.0, 1.0, 0.0];

	// Position is relative, target is absolute in world coordinates.
	constructor(position, target) {
		super();
		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();

		this.position = position || [0, 0, 0];
		this.target = target;
		this.binormal = vec3.create();
		//	this.buildModelMatrix();

		this.width = 7.5;
		this.height = 5.0;
		this.fov = 45;
		this.aspectRatio = this.width / this.height;
		this.near = 0.1;
		this.far = 1000.0;

		mat4.perspective(
			this.projectionMatrix,
			this.fov,
			this.aspectRatio,
			this.near,
			this.far
		);
		mat4.lookAt(this.viewMatrix, this.position, this.target, this.UP);

        let behaviour = new Behaviour(this);
        behaviour.setUpdate(this.buildModelMatrix);
        this.addBehaviour(behaviour);	}

	updateMyself(fatherModelMatrix) {
		this.buildModelMatrix(fatherModelMatrix);
	}

	updateController() {}

	getViewDirection() {
		let normalizedPosition = vec3.create();
		vec3.scaleAndAdd(normalizedPosition, this.position, this.target, -1);
		vec3.normalize(normalizedPosition, normalizedPosition);
		return normalizedPosition;
	}

	buildModelMatrix(fatherModelMatrix) {
		let targetDir = vec3.create();
		vec3.scaleAndAdd(
			targetDir,
			this.object.target,
			this.object.position,
			-1
		);
		vec3.normalize(targetDir, targetDir);

		vec3.cross(this.object.binormal, targetDir, this.object.UP);
		vec3.normalize(this.object.binormal, this.object.binormal);

		this.object.modelMatrix = mat4.fromValues(
			this.object.UP[0],
			this.object.UP[1],
			this.object.UP[2],
			0,
			this.object.binormal[0],
			this.object.binormal[1],
			this.object.binormal[2],
			0,

			targetDir[0],
			targetDir[1],
			targetDir[2],
			0,
			this.object.position[0],
			this.object.position[1],
			this.object.position[2],
			1
		);

		let target = vec3.create();
		vec3.transformMat4(target, this.object.target, fatherModelMatrix);
		vec3.transformMat4(
			this.object.worldPosition,
			this.object.position,
			fatherModelMatrix
		);
		mat4.lookAt(
			this.object.viewMatrix,
			this.object.worldPosition,
			target,
			this.object.UP
		);
	}
}
