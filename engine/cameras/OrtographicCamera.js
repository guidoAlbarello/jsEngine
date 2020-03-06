class OrtographicCamera extends Object3d {    
    constructor(position, target, UP, height, width) {
        super();
        this.projectionMatrix = mat4.create();
        this.viewMatrix = mat4.create();

        this.position = position || [0, 0, 100];
        this.target = target || [0, 0, 0];
        this.UP = UP || [0.0, 1.0, 0.0];
        this.binormal = vec3.create();

        this.width = width || 50;
        this.height = height || 50;
        this.near = 100;
        this.far = -100;

        mat4.ortho(this.projectionMatrix, -this.width/2, this.width/2, -this.height/2, this.height/2, this.near, this.far);
        mat4.lookAt(this.viewMatrix, this.position, this.target, this.UP);
        this.behaviour.setUpdate(this.buildModelMatrix);
    }

    updateController() {}

    updateMyself(fatherModelMatrix) {
        this.buildModelMatrix(fatherModelMatrix);
    }

    buildModelMatrix(fatherModelMatrix) {
        let fatherPosition =fatherModelMatrix.slice(12,15);

        // Only update x,y coordinates to avoid moving the camera in the z axis.
        let position = [this.object.position[0] + fatherPosition[0], this.object.position[1] + fatherPosition[1], this.object.position[2]];
        let target = [this.object.target[0] + fatherPosition[0], this.object.target[1] + fatherPosition[1], this.object.target[2]];

        mat4.lookAt(this.object.viewMatrix, position, target, this.object.UP);
    }
}