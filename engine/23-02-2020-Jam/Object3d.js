// There should be some system to keep track of the objects ids to simplify communication.
// For now we just use an static id. 
class Object3d {
    mesh;
    physicsComponent;
    behaviour;
    
    constructor() {
    	this.worldPosition = vec3.create();
        this.nodes = [];
        this.material = new DefaultMaterial([0.5,0.5,0.5]);
        this.modelMatrix = mat4.identity(mat4.create());
        this.worldModelMatrix = mat4.create();
        this.animations = [];
        this.id = Object3d.generateId();
	this.behaviour = new Behaviour(this);
    }

    static generateId() {
	   return Object3d.ID++;
    }
    
    async loadModel(modelFilename) {
        this.mesh = await gAssetManager.loadDataFromFile(modelFilename);
	   this.setMeshDataLocationsInMaterial();
    }

    setModel(modelData) {
        this.mesh = gAssetManager.loadData(modelData);
	    this.setMeshDataLocationsInMaterial();
    }

    setBehaviour(behaviour) {
	behaviour.setObject(this);
	behaviour.init();
	this.behaviour = behaviour;
    }

    setPhysicsComponent(component) {
	component.setObject(this);
	this.physicsComponent = component;
    }

    getPosition() {
	return this.modelMatrix.slice(12,15);
    }
    
    translate(position) {
        mat4.translate(this.modelMatrix, this.modelMatrix, position);
    }

    rotate(angle_rad, axis) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, angle_rad, axis);
    }

    scale(scale) {
        mat4.scale(this.modelMatrix, this.modelMatrix, scale);
    }
	
    setMaterial(material) {
        this.material = material;
	   this.setMeshDataLocationsInMaterial();
    }

    // Refactor this. Maybe use directly variable name instead of method. 
    setMeshDataLocationsInMaterial() {
	if (this.mesh.attributes[gAssetManager.POSITIONS] && this.material.setVertexPositions)
	    this.material.setVertexPositions(this.mesh.attributes[gAssetManager.POSITIONS][0]);
	if (this.mesh.attributes[gAssetManager.NORMALS] && this.material.setVertexNormals)
	    this.material.setVertexNormals(this.mesh.attributes[gAssetManager.NORMALS][0]);
	if (this.mesh.attributes[gAssetManager.TEXTURE_COORDINATES] && this.material.setTextureCoordinates)
	    this.material.setTextureCoordinates(this.mesh.attributes[gAssetManager.TEXTURE_COORDINATES][0]);
	if (this.mesh.attributes[gAssetManager.TANGENTS] && this.material.setVertexTangents)
	    this.material.setVertexTangents(this.mesh.attributes[gAssetManager.TANGENTS][0]);
    }
    
    addChild(node) { 
        this.nodes.push(node);        
    }

    addAnimation(animation) {
        animation.object = this;
        this.animations.push(animation);
    }
    
    update(fatherModelMatrix) {
	this.behaviour.update();
	for(let i=0; i<this.animations.length;i++){
            this.animations[i].update();
        }

	mat4.multiply(this.worldModelMatrix, fatherModelMatrix, this.modelMatrix);
	
	for (let i = 0; i < this.nodes.length; i++) {
	    this.nodes[i].update(this.worldModelMatrix);
        }
    }

    draw() {
        // Other uniforms may be passed. 
        if (this.mesh) {
            gRenderer.draw(this.mesh, this.material, this.worldModelMatrix);
        }

	if (this.physicsComponent) {
	    this.physicsComponent.update();
	}

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw();
        }
    }

    drawAt(fatherModelMatrix) {
	let modelMatrix = mat4.create();
	mat4.multiply(modelMatrix, fatherModelMatrix, this.modelMatrix);

        // Other uniforms may be passed. 
        if (this.mesh) {
            gRenderer.draw(this.mesh, this.material, modelMatrix);
        }

        for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].drawAt(modelMatrix);
        }
    }
}

Object3d.ID = 0;
