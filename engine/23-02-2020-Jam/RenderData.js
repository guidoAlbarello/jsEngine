class RenderData {
    constructor (mesh, material, modelMatrix) {
        this.mesh = mesh;
        this.material = material;
        this.modelMatrix = modelMatrix;
    }
    indexBufferLength() {
        return this.mesh.indexBuffer.length;
    }

    drawingMethod() {
        return this.mesh.drawingMethod;
    }

    objectId() {
        return this.mesh.id;    // this is mapped in AssetManager to objectTypeCLass to render the class. 
                                // If mesh was modified a copy is made in AssetManager and used that instead.
    }

    attributes() {
        return this.mesh.attributes;
    }

    uniforms() {
	return this.material.uniforms;
    }

    amountOfVertices() {
	return this.mesh.attributes[gAssetManager.POSITIONS][1].length/3;
    }
}
