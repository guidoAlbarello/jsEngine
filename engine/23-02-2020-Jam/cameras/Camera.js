class Camera extends Object3d {
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
	
        this.position = position || [0,0,0];
        this.target = target;
	this.binormal = vec3.create();
//	this.buildModelMatrix();
	
	this.width = 7.5;
	this.height = 5.0;
	this.fov = 45;
	this.aspectRatio = this.width/this.height;
	this.near = 0.1;
	this.far = 300.0;
	
        mat4.perspective(this.projectionMatrix, this.fov, this.aspectRatio, this.near, this.far);
        mat4.lookAt(this.viewMatrix, this.position, this.target, this.UP);
    }

    updateMyself(fatherModelMatrix) {
	this.buildModelMatrix(fatherModelMatrix);
    }

    updateController() {

    }

    getViewDirection() {
	let normalizedPosition = vec3.create();
	vec3.scaleAndAdd(normalizedPosition, this.position, this.target, -1);
	vec3.normalize(normalizedPosition, normalizedPosition);
	return normalizedPosition;
    }

    buildModelMatrix(fatherModelMatrix) {
	let targetDir = vec3.create();
	vec3.scaleAndAdd(targetDir, this.target, this.position, -1);
	vec3.normalize(targetDir, targetDir);

	vec3.cross(this.binormal, targetDir, this.UP);
	vec3.normalize(this.binormal, this.binormal);
	
	this.modelMatrix = mat4.fromValues(
	this.UP[0], this.UP[1], this.UP[2], 0,
	    this.binormal[0], this.binormal[1], this.binormal[2], 0,
	    
	targetDir[0], targetDir[1], targetDir[2], 0,
	    this.position[0], this.position[1], this.position[2], 1);

	let target = vec3.create();
	vec3.transformMat4(target, this.target, fatherModelMatrix);
	vec3.transformMat4(this.worldPosition, this.position, fatherModelMatrix);
        mat4.lookAt(this.viewMatrix, this.worldPosition, target, this.UP);
    }
}

