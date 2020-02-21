class TextureManager {
    gl;
    TEXTURES_DIRECTORY = "textures/";
    
    constructor() {
	this.textures = [];
    }
    
    setContext(gl) {
	this.gl = gl;
    }

    // Load all textures asynchronously
    async loadTextures() {
	let texture_loading = this.selectTextures();
	await Promise.all(texture_loading);
    }
    
    async loadTexture(name, texFile) {
	let image = await new Promise(resolve => {
	    const image = new Image();
	    image.onload = () => {
		resolve(image);
	    };
	    image.src = texFile;
	});
	
	this.createTexture(name,image);
    }

    // Add custom params
    createTexture(name, image) {
	image = image || null;
	
	let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, textureObject);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        //this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

   		//this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
   		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	
		this.textures[name] = this.makeMaterialParam(textureObject);
    }

    // Add custom params
    createTextureFromArray(name, data) {
		let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, textureObject);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, data.length/3, data.length/3, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);

		this.textures[name] = this.makeMaterialParam(textureObject);
    }

    // Use string or id to get textures?
    getTexture(name) {
	return this.textures[name];
    }

    // Modify this function to add new textures. 
    selectTextures() {
		let texture_loading = [];
/*	texture_loading.push(this.loadTexture("metal_albedo", this.TEXTURES_DIRECTORY + "Tiles32_col.jpg"));
	texture_loading.push(this.loadTexture("metal_roughness", this.TEXTURES_DIRECTORY + "Tiles32_rgh.jpg"));
	texture_loading.push(this.loadTexture("metal_metallic", this.TEXTURES_DIRECTORY + "rustediron2_metallic.png"));
	texture_loading.push(this.loadTexture("metal_normal", this.TEXTURES_DIRECTORY + "Tiles32_nrm.jpg"));
	texture_loading.push(this.loadTexture("metal_ao", this.TEXTURES_DIRECTORY + "Tiles32_AO.jpg"));
*/
		texture_loading.push(this.loadTexture("grass1024", this.TEXTURES_DIRECTORY + "pasto1024.jpg"));
		texture_loading.push(this.loadTexture("grass", this.TEXTURES_DIRECTORY + "pasto512.jpg"));
		texture_loading.push(this.loadTexture("grass256", this.TEXTURES_DIRECTORY + "pasto256.jpg"));

		texture_loading.push(this.loadTexture("dust", this.TEXTURES_DIRECTORY + "tierra512.jpg"));
		texture_loading.push(this.loadTexture("dust256", this.TEXTURES_DIRECTORY + "tierra256.jpg"));

		texture_loading.push(this.loadTexture("metal_albedo", this.TEXTURES_DIRECTORY + "metal/metal_albedo.jpg"));
		texture_loading.push(this.loadTexture("metal_roughness", this.TEXTURES_DIRECTORY + "metal/metal_roughness.jpg"));
		texture_loading.push(this.loadTexture("metal_metallic", this.TEXTURES_DIRECTORY + "metal/metal_metal.jpg"));
		texture_loading.push(this.loadTexture("metal_ao", this.TEXTURES_DIRECTORY + "metal/metal.png"));

		texture_loading.push(this.loadTexture("metal_titanium_metallic", this.TEXTURES_DIRECTORY + "Titanium-Scuffed-Unreal-Engine/Titanium-Scuffed_metallic.png"));
		texture_loading.push(this.loadTexture("metal_titanium_normal", this.TEXTURES_DIRECTORY + "Titanium-Scuffed-Unreal-Engine/Titanium-Scuffed_normal.png"));
		texture_loading.push(this.loadTexture("metal_titanium_roughness", this.TEXTURES_DIRECTORY + "Titanium-Scuffed-Unreal-Engine/Titanium-Scuffed_roughness.png"));
		texture_loading.push(this.loadTexture("metal_titanium_albedo", this.TEXTURES_DIRECTORY + "Titanium-Scuffed-Unreal-Engine/Titanium-Scuffed_basecolor.png"));

		texture_loading.push(this.loadTexture("Star_and_Cross_albedo", this.TEXTURES_DIRECTORY + "Tiles_Star_and_Cross/Tiles_Star_and_Cross_001_basecolor.jpg"));
		texture_loading.push(this.loadTexture("Star_and_Cross_roughness", this.TEXTURES_DIRECTORY + "Tiles_Star_and_Cross/Tiles_Star_and_Cross_001_roughness.jpg"));
		texture_loading.push(this.loadTexture("Star_and_Cross_metallic", this.TEXTURES_DIRECTORY + "Tiles_Star_and_Cross/Tiles_Star_and_Cross_001_height.png"));
		texture_loading.push(this.loadTexture("Star_and_Cross_normal", this.TEXTURES_DIRECTORY + "Tiles_Star_and_Cross/Tiles_Star_and_Cross_001_normal.jpg"));
		texture_loading.push(this.loadTexture("Star_and_Cross_ao", this.TEXTURES_DIRECTORY + "Tiles_Star_and_Cross/Tiles_Star_and_Cross_001_ambientOcclusion.jpg"));
/*
		texture_loading.push(this.loadTexture("Planks03_albedo", this.TEXTURES_DIRECTORY + "Planks03/Planks03_col.jpg"));
		texture_loading.push(this.loadTexture("Planks03_roughness", this.TEXTURES_DIRECTORY + "Planks03/Planks03_rgh.jpg"));
		texture_loading.push(this.loadTexture("Planks03_metallic", this.TEXTURES_DIRECTORY + "Planks03/Planks03_disp.jpg"));
		texture_loading.push(this.loadTexture("Planks03_normal", this.TEXTURES_DIRECTORY + "Planks03/Planks03_nrm.jpg"));
		texture_loading.push(this.loadTexture("Planks03_ao", this.TEXTURES_DIRECTORY + "Planks03/Planks03_AO.jpg"));
*/
		texture_loading.push(this.loadTexture("PavingStones40_albedo", this.TEXTURES_DIRECTORY + "PavingStones40/PavingStones40_col.jpg"));
		texture_loading.push(this.loadTexture("PavingStones40_roughness", this.TEXTURES_DIRECTORY + "PavingStones40/PavingStones40_rgh.jpg"));
		texture_loading.push(this.loadTexture("PavingStones40_metallic", this.TEXTURES_DIRECTORY + "PavingStones40/PavingStones40_disp.jpg"));
		texture_loading.push(this.loadTexture("PavingStones40_normal", this.TEXTURES_DIRECTORY + "PavingStones40/PavingStones40_nrm.jpg"));
		texture_loading.push(this.loadTexture("PavingStones40_ao", this.TEXTURES_DIRECTORY + "PavingStones40/PavingStones40_AO.jpg"));

		texture_loading.push(this.loadTexture("concrete_albedo", this.TEXTURES_DIRECTORY + "concrete/concrete2_albedo.png"));
		texture_loading.push(this.loadTexture("concrete_roughness", this.TEXTURES_DIRECTORY + "concrete/concrete2_Roughness.png"));
		texture_loading.push(this.loadTexture("concrete_metallic", this.TEXTURES_DIRECTORY + "concrete/concrete2_Metallic.png"));
		texture_loading.push(this.loadTexture("concrete_normal", this.TEXTURES_DIRECTORY + "concrete/concrete2_Normal-dx.png"));
		texture_loading.push(this.loadTexture("concrete_ao", this.TEXTURES_DIRECTORY + "concrete/concrete2-ao.png"));

	
		texture_loading.push(this.loadTexture("Marble01_albedo", this.TEXTURES_DIRECTORY + "Marble01/Marble01_col.jpg"));
		texture_loading.push(this.loadTexture("Marble01_roughness", this.TEXTURES_DIRECTORY + "Marble01/Marble01_rgh.jpg"));
		texture_loading.push(this.loadTexture("Marble01_metallic", this.TEXTURES_DIRECTORY + "Marble01/Marble01_mask.jpg"));
		texture_loading.push(this.loadTexture("Marble01_normal", this.TEXTURES_DIRECTORY + "Marble01/Marble01_nrm.jpg"));
		
		texture_loading.push(this.loadTexture("green_rough_planks_albedo", this.TEXTURES_DIRECTORY + "green_rough_planks/green_rough_planks_diff_2k.jpg"));
		texture_loading.push(this.loadTexture("green_rough_planks_roughness", this.TEXTURES_DIRECTORY + "green_rough_planks/green_rough_planks_rough_2k.jpg"));
		texture_loading.push(this.loadTexture("green_rough_planks_metallic", this.TEXTURES_DIRECTORY + "green_rough_planks/green_rough_planks_disp_2k.jpg"));
		texture_loading.push(this.loadTexture("green_rough_planks_normal", this.TEXTURES_DIRECTORY + "green_rough_planks/green_rough_planks_nor_2k.jpg"));
		texture_loading.push(this.loadTexture("green_rough_planks_ao", this.TEXTURES_DIRECTORY + "green_rough_planks/green_rough_planks_ao_2k.jpg"));

	texture_loading.push(this.loadCubemap("skybox", this.TEXTURES_DIRECTORY+"skybox/"));
	return texture_loading;
    }

    loadDefaultArrayTextures() {
		gTextureManager.createTextureFromArray("white", new Uint8Array([255.0, 255.0, 255.0]));
		gTextureManager.createTextureFromArray("black", new Uint8Array([0, 0, 0]));
		gTextureManager.createTextureFromArray("gray", new Uint8Array([150, 150, 150]));
		gTextureManager.createTextureFromArray("z_axis", new Uint8Array([128, 128, 255.0]));
		gTextureManager.createTextureFromArray("brown", new Uint8Array([222.0, 184.0, 135.0]));
		gTextureManager.createTextureFromArray("green", new Uint8Array([117.0, 157.0, 35.0]));
		gTextureManager.createTextureFromArray("blue", new Uint8Array([59.0, 131.0, 189.0]));
		gTextureManager.createTextureFromArray("violet", new Uint8Array([138.0, 43.0, 226.0]));
		gTextureManager.createTextureFromArray("yellow", new Uint8Array([253.0,210.0,5.0]));
		gTextureManager.createTextureFromArray("red", new Uint8Array([255, 0, 0]));
		gTextureManager.createTextureCubemapFromArray("white_cubemap", new Uint8Array([0, 0, 0]));
    }

    // Cubemap files must be in the same folder with each face named in a determined way.
    loadCubemap(name, directory) {
	return new Promise(resolve => {
	    let upImage = this.loadImage(directory + "posy.jpg");
	    let bottomImage = this.loadImage(directory + "negy.jpg");
	    let rightImage = this.loadImage(directory + "posx.jpg");
	    let leftImage = this.loadImage(directory + "negx.jpg");
	    let backImage = this.loadImage(directory + "posz.jpg");
	    let frontImage = this.loadImage(directory + "negz.jpg");

	    return Promise.all([upImage, bottomImage, rightImage, leftImage, backImage, frontImage]).then(values => {
		this.createCubemap(name, values[0], values[1], values[2], values[3], values[4], values[5]);
		resolve();
	    });
	});
    }

    loadImage(imagePath) {
	return new Promise(resolve => {
	    const image = new Image();
	    image.onload = () => {
		resolve(image);
	    };
	    image.src = imagePath;
	});
    }

    makeMaterialParam(textureObject, textureType) {
	return {
	    "data" : textureObject,
	    "type" : textureType || this.gl.TEXTURE_2D
	}
    }

    createCubemap(name, upImage, bottomImage, rightImage, leftImage, backImage, frontImage) {
		let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, textureObject);
       
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, rightImage);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, leftImage);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, upImage);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, bottomImage);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, backImage);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, frontImage);
	    	
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);
		
	this.textures[name] = this.makeMaterialParam(textureObject, this.gl.TEXTURE_CUBE_MAP);
    }
    
    createTextureCubemapFromArray(name, data) {
		let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, textureObject);
       
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGB, data.length/3, data.length/3, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGB, data.length/3, data.length/3, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGB, data.length/3, data.length/3, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGB, data.length/3, data.length/3, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGB, data.length/3, data.length/3, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
		this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGB, data.length/3, data.length/3, 0, this.gl.RGB, this.gl.UNSIGNED_BYTE, data);
	    	
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);
		
	this.textures[name] = this.makeMaterialParam(textureObject, this.gl.TEXTURE_CUBE_MAP);
    }
}
