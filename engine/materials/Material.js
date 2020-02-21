class Material {
    constructor() {
	this.uniforms = [];
	this.uniformsLookUp = [];
	
	this.attributes = [];
	this.attributesLookUp = [];

	this.textures = [];
	this.texturesLookUp = [];
    }
  
    setVertexPositions(positions) {}
    setVertexNormals(normals) {}
    setTextureCoordinates(texCoords) {}
    
    addUniform(name, type, data) {
	let index = this.uniformsLookUp[name];
	let uniform = { 'name' : name, 'type' : type, 'data' : data};
	if (index == undefined) {
	    this.uniformsLookUp[name] = this.uniforms.push(uniform) -1 ;
	} else {
	    this.uniforms[index] = uniform;
	}
    }

    addAttribute(name, data, valuesPerVertex) {
	let index = this.attributesLookUp[name];
	let attribute = {'name' : name, 'location' : data, 'valuesPerVertex' : valuesPerVertex};
	if (index == undefined) {
	    this.attributesLookUp[name] = this.attributes.push(attribute) - 1;
	} else {
	    this.attributes[index] = attribute;
	}
    }

    addSampler(name, textureObject) {
	let index = this.texturesLookUp[name];
	let texture = {'name' : name, 'data' : textureObject.data, 'type' : textureObject.type};
	if (index == undefined) {
	    this.texturesLookUp[name] = this.textures.push(texture) - 1;
	} else {
	    this.textures[index] = texture;
	}
    }

    static makeUniform(name, type, data) {
	return { 'name' : name, 'type' : type, 'data' : data};
    }
}
