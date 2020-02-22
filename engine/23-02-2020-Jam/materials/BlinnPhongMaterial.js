class BlinnPhongMaterial extends Material {
    constructor(ambient, diffuse, specular, k) {
	super();
	this.setLightConstants(ambient, diffuse, specular, k);
    }

    Id() {
	return BlinnPhongMaterial.ID;
    }

    GlobalUniforms() {
	return BlinnPhongMaterial.GLOBAL_UNIFORMS;
    }
    
    setVertexPositions(positions) {
	this.addAttribute("aVertexPosition", positions, 3);
    }

    setVertexNormals(normals) {
	this.addAttribute("aVertexNormal", normals, 3);
    }

    static setProjectionMatrix(projectionMatrix) {
	BlinnPhongMaterial.GLOBAL_UNIFORMS.push(Material.makeUniform("uPMatrix", gRenderer.MAT4, projectionMatrix));
    }

    // Maybe refactor this to optimize changes in the same property. 
    setModelViewMatrix(modelViewMatrix) {
	this.addUniform("uMVMatrix", gRenderer.MAT4, modelViewMatrix);
    }

    setNormalMatrix(normalMatrix) {
	this.addUniform("uNormalMatrix", gRenderer.MAT4, normalMatrix);
    }

    static setLight(light) {
	BlinnPhongMaterial.GLOBAL_UNIFORMS.push(Material.makeUniform("uAmbientLight", gRenderer.VEC3, light.ambient));
	BlinnPhongMaterial.GLOBAL_UNIFORMS.push(Material.makeUniform("uDiffuseLight", gRenderer.VEC3, light.diffuse));
	BlinnPhongMaterial.GLOBAL_UNIFORMS.push(Material.makeUniform("uSpecularLight", gRenderer.VEC3, light.specular));
	BlinnPhongMaterial.GLOBAL_UNIFORMS.push(Material.makeUniform("uLightDirection", gRenderer.VEC3, light.direction));
    }

    static setViewDirection(viewDirection) {
    	BlinnPhongMaterial.GLOBAL_UNIFORMS.push(Material.makeUniform("uViewDirection", gRenderer.VEC3, viewDirection));
    }

    setLightConstants(ambient, diffuse, specular, k) {
	this.addUniform("uAmbientConstant", gRenderer.VEC3, ambient);
	this.addUniform("uDiffuseConstant", gRenderer.VEC3, diffuse);
	this.addUniform("uSpecularConstant", gRenderer.VEC3, specular);
	this.addUniform("uSpecularCoefficient", gRenderer.FLOAT, k);
    }
}

BlinnPhongMaterial.resetGlobals = () => {
    BlinnPhongMaterial.GLOBAL_UNIFORMS = [];
}

BlinnPhongMaterial.resetGlobals();
    
