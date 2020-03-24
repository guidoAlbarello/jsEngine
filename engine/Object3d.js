// There should be some system to keep track of the objects ids to simplify communication.
// For now we just use an static id.
class Object3d {
	mesh;
	physicsComponent;
	hitbox;
	camera;
	constructor() {
		this.worldPosition = vec3.create();
		this.nodes = [];
		this.material = new DefaultMaterial([0.8, 0.78, 0.78]);
		this.modelMatrix = mat4.identity(mat4.create());
		this.worldModelMatrix = mat4.create();
		this.modelMatrixTmp = mat4.create();
		this.animations = [];
		this.id = Object3d.generateId();
		this.behaviours = [];
		this.colliders = [];
		this.inverseFatherModelMatrix = mat4.create();
	}

	static generateId() {
		return Object3d.ID++;
	}

	getId() {
		return this.id;
	}

	async loadModel(modelFilename) {
		this.mesh = await gAssetManager.loadDataFromFile(modelFilename);
		this.setMeshDataLocationsInMaterial();
	}

	setCamera(camera) {
		this.camera = camera;
	}

	setModel(modelData) {
		this.mesh = gAssetManager.loadData(modelData);
		this.setMeshDataLocationsInMaterial();
	}

	addBehaviour(behaviour) {
		behaviour.setObject(this);
		behaviour.init();
		this.behaviours.push(behaviour);
	}

	setPhysicsComponent(component) {
		component.setObject(this);
		this.physicsComponent = component;
	}

	addCollider(collider) {
		collider.setObject(this);
		this.colliders.push(collider);
		gCollisionDetection.addCollider(collider);
	}

	addPhysicsCollider() {
		let physicsCollider = new PhysicsCollider();
		physicsCollider.setObject(this);
		this.colliders.push(physicsCollider);
		gCollisionDetection.addPhysicalCollider(physicsCollider);
	}

	setHitbox(hitbox) {
		hitbox.setObject(this);
		this.hitbox = hitbox;
	}

	getHitbox() {
		return this.hitbox;
	}

	getPosition() {
		return this.modelMatrix.slice(12, 15);
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
		if (
			this.mesh.attributes[gAssetManager.POSITIONS] &&
			this.material.setVertexPositions
		)
			this.material.setVertexPositions(
				this.mesh.attributes[gAssetManager.POSITIONS][0]
			);
		if (
			this.mesh.attributes[gAssetManager.NORMALS] &&
			this.material.setVertexNormals
		)
			this.material.setVertexNormals(
				this.mesh.attributes[gAssetManager.NORMALS][0]
			);
		if (
			this.mesh.attributes[gAssetManager.TEXTURE_COORDINATES] &&
			this.material.setTextureCoordinates
		)
			this.material.setTextureCoordinates(
				this.mesh.attributes[gAssetManager.TEXTURE_COORDINATES][0]
			);
		if (
			this.mesh.attributes[gAssetManager.TANGENTS] &&
			this.material.setVertexTangents
		)
			this.material.setVertexTangents(
				this.mesh.attributes[gAssetManager.TANGENTS][0]
			);
	}

	addChild(node) {
		node.parent = this;
		this.nodes.push(node);
		console.log(this);
	}

	addOrphanChild(node) {
		if(this.parent){
			this.parent.addOrphanChild(node);
		}else{
			this.addChild(node);
		}
		
	}

	addAnimation(animation) {
		animation.object = this;
		this.animations.push(animation);
	}

	getWorldPosition() {
		return this.worldModelMatrix.slice(12,15);
	}

	translateWorldPosition(movement) {
		this.worldModelMatrix[12] += movement[0];
		this.worldModelMatrix[13] += movement[1];
		this.worldModelMatrix[14] += movement[2];

		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].update(this.worldModelMatrix);
		}
	}

	setWorldPosition(position) {
		this.worldModelMatrix[12] = position[0];
		this.worldModelMatrix[13] = position[1];
		this.worldModelMatrix[14] = position[2];

		mat4.mul(this.modelMatrix, this.inverseFatherModelMatrix, this.worldModelMatrix);
		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].update(this.worldModelMatrix);
		}
	}

	update(fatherModelMatrix) {
		for (let i = 0; i < this.behaviours.length; i++) {
			this.behaviours[i].update(fatherModelMatrix);
		}

		if (this.physicsComponent) {
			this.physicsComponent.update();
		}
		
		mat4.invert(this.inverseFatherModelMatrix, fatherModelMatrix);

		mat4.multiply(
			this.worldModelMatrix,
			fatherModelMatrix,
			this.modelMatrix
		);

		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].update(this.worldModelMatrix);
		}
	}

	draw() {
		// Other uniforms may be passed.
		if (this.mesh) {
			gRenderer.draw(this.mesh, this.material, this.worldModelMatrix);
		}

		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].draw();
		}
	}

	drawAt(fatherModelMatrix) {
		mat4.multiply(this.modelMatrixTmp, fatherModelMatrix, this.modelMatrix);

		// Other uniforms may be passed.
		if (this.mesh) {
			gRenderer.draw(this.mesh, this.material, this.modelMatrixTmp);
		}

		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].drawAt(this.modelMatrixTmp);
		}
	}

	removeObject(objectId) {
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].getId() == objectId) {
				gCollisionDetection.removeColliders(objectId);
				this.nodes.splice(i, 1);
			}
		}
	}

	remove() {
		this.parent.removeObject(this.getId());
	}
}

Object3d.ID = 0;
