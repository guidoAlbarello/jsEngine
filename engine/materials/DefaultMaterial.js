class DefaultMaterial extends Material {
    constructor(color) {
	super();
	if (color) this.setColor(color);
    }

    Id() {
	return DefaultMaterial.ID;
    }

    GlobalUniforms() {
	return DefaultMaterial.GLOBAL_UNIFORMS;
    }
    
    setVertexPositions(positions) {
	this.addAttribute("aVertexPosition", positions, 3);
    }

    setVertexNormals(normals) {
	this.addAttribute("aVertexNormal", normals, 3);
    }

    static setProjectionMatrix(projectionMatrix) {
	DefaultMaterial.GLOBAL_UNIFORMS.push(Material.makeUniform("uPMatrix", gRenderer.MAT4, projectionMatrix));
    }

    // Maybe refactor this to optimize changes in the same property. 
    setModelViewMatrix(modelViewMatrix) {
	this.addUniform("uMVMatrix", gRenderer.MAT4, modelViewMatrix);
    }

    setNormalMatrix(normalMatrix) {
	this.addUniform("uNormalMatrix", gRenderer.MAT4, normalMatrix);
    }

    setWorldMatrix(matrix) {
	
    }

    setColor(color) {
	this.addUniform("uColor", gRenderer.VEC3, color);
    }
}
    
DefaultMaterial.resetGlobals = () => {
    DefaultMaterial.GLOBAL_UNIFORMS = [];
}

DefaultMaterial.resetGlobals();
    
