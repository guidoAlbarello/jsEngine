class TextureManager {
	gl;
	TEXTURES_DIRECTORY = "textures/";
	TEXTURE_LIST = this.TEXTURES_DIRECTORY + "textures.csv";

	constructor() {
		this.textures = [];
	}

	setContext(gl) {
		this.gl = gl;
	}

	// Load all textures asynchronously
	async loadTextures() {
		let texture_loading = [];
		let texturesToLoad = (await this.getTexturesToLoad()).split("\n");
		if (texturesToLoad) {
			for (let i = 0; i < texturesToLoad.length; i++) {
				let texture = texturesToLoad[i].split(",");
				texture = texture.map(element => element.trim());
				texture_loading.push(
					this.loadTexture(
						texture[0],
						this.TEXTURES_DIRECTORY + texture[1]
					)
				);
			}
		}
		//texture_loading.push(this.loadCubemap("skybox", this.TEXTURES_DIRECTORY+"skybox/"));
		await Promise.all(texture_loading);
	}

	getTexturesToLoad() {
		return new Promise(resolve => {
			$.get(
				this.TEXTURE_LIST,
				function(data) {
					resolve(data);
				},
				"text"
			);
		});
	}

	async loadTexture(name, texFile) {
		let image = await new Promise(resolve => {
			const image = new Image();
			image.onload = () => {
				resolve(image);
			};
			image.src = texFile;
		});
		3;
		this.createTexture(name, image);
	}

	// Add custom params
	createTexture(name, image) {
		image = image || null;

		let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, textureObject);

		//this.gl.generateMipmap(this.gl.TEXTURE_2D);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.LINEAR
		);
		//this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);

		//this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.REPEAT
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.REPEAT
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGB,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			image
		);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);

		this.textures[name] = this.makeMaterialParam(textureObject);
	}

	// Add custom params
	createTextureFromArray(name, data) {
		let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, textureObject);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.NEAREST
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGB,
			data.length / 3,
			data.length / 3,
			0,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			data
		);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);

		this.textures[name] = this.makeMaterialParam(textureObject);
	}

	// Use string or id to get textures?
	getTexture(name) {
		return this.textures[name];
	}

	loadDefaultArrayTextures() {
		gTextureManager.createTextureFromArray(
			"white",
			new Uint8Array([255.0, 255.0, 255.0])
		);
		gTextureManager.createTextureFromArray(
			"black",
			new Uint8Array([0, 0, 0])
		);
		gTextureManager.createTextureFromArray(
			"gray",
			new Uint8Array([150, 150, 150])
		);
		gTextureManager.createTextureFromArray(
			"z_axis",
			new Uint8Array([128, 128, 255.0])
		);
		gTextureManager.createTextureFromArray(
			"brown",
			new Uint8Array([222.0, 184.0, 135.0])
		);
		gTextureManager.createTextureFromArray(
			"green",
			new Uint8Array([117.0, 157.0, 35.0])
		);
		gTextureManager.createTextureFromArray(
			"blue",
			new Uint8Array([59.0, 131.0, 189.0])
		);
		gTextureManager.createTextureFromArray(
			"violet",
			new Uint8Array([138.0, 43.0, 226.0])
		);
		gTextureManager.createTextureFromArray(
			"yellow",
			new Uint8Array([253.0, 210.0, 5.0])
		);
		gTextureManager.createTextureFromArray(
			"red",
			new Uint8Array([255, 0, 0])
		);
		gTextureManager.createTextureCubemapFromArray(
			"white_cubemap",
			new Uint8Array([0, 0, 0])
		);
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

			return Promise.all([
				upImage,
				bottomImage,
				rightImage,
				leftImage,
				backImage,
				frontImage
			]).then(values => {
				this.createCubemap(
					name,
					values[0],
					values[1],
					values[2],
					values[3],
					values[4],
					values[5]
				);
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
			data: textureObject,
			type: textureType || this.gl.TEXTURE_2D
		};
	}

	createCubemap(
		name,
		upImage,
		bottomImage,
		rightImage,
		leftImage,
		backImage,
		frontImage
	) {
		let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, textureObject);

		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			0,
			this.gl.RGB,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			rightImage
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			0,
			this.gl.RGB,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			leftImage
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			0,
			this.gl.RGB,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			upImage
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			0,
			this.gl.RGB,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			bottomImage
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			0,
			this.gl.RGB,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			backImage
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
			0,
			this.gl.RGB,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			frontImage
		);

		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.LINEAR
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.LINEAR
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);

		this.textures[name] = this.makeMaterialParam(
			textureObject,
			this.gl.TEXTURE_CUBE_MAP
		);
	}

	createTextureCubemapFromArray(name, data) {
		let textureObject = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, textureObject);

		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_X,
			0,
			this.gl.RGB,
			data.length / 3,
			data.length / 3,
			0,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			data
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
			0,
			this.gl.RGB,
			data.length / 3,
			data.length / 3,
			0,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			data
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y,
			0,
			this.gl.RGB,
			data.length / 3,
			data.length / 3,
			0,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			data
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
			0,
			this.gl.RGB,
			data.length / 3,
			data.length / 3,
			0,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			data
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
			0,
			this.gl.RGB,
			data.length / 3,
			data.length / 3,
			0,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			data
		);
		this.gl.texImage2D(
			this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
			0,
			this.gl.RGB,
			data.length / 3,
			data.length / 3,
			0,
			this.gl.RGB,
			this.gl.UNSIGNED_BYTE,
			data
		);

		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.LINEAR
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.LINEAR
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_CUBE_MAP,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, null);

		this.textures[name] = this.makeMaterialParam(
			textureObject,
			this.gl.TEXTURE_CUBE_MAP
		);
	}
}
