class MaterialManager {
	SHADERS_DIRECTORY = "shaders/";

	constructor() {
		this.materials = [];
	}

	async loadMaterials() {
		let materialPrograms = this.selectMaterials();

		for (let i = 0; i < materialPrograms.length; i++) {
			let program = await gShaderManager.loadShaders(
				materialPrograms[i][1],
				materialPrograms[i][2]
			);
			materialPrograms[i][0].ID = program.id;
			this.materials[program.id] = {
				material: materialPrograms[i][0],
				program: program.reference
			};
		}
	}

	getMaterial(materialId) {
		return this.materials[materialId];
	}

	// Add new materials to load here.
	selectMaterials() {
		let materialPrograms = [];

		materialPrograms.push([
			DefaultMaterial,
			this.SHADERS_DIRECTORY + "defaultVS.glsl",
			this.SHADERS_DIRECTORY + "defaultFS.glsl"
		]);
		materialPrograms.push([
			BlinnPhongMaterial,
			this.SHADERS_DIRECTORY + "blinnPhongVS.glsl",
			this.SHADERS_DIRECTORY + "blinnPhongFS.glsl"
		]);
		materialPrograms.push([
			PBRMaterial,
			this.SHADERS_DIRECTORY + "pbrVS.glsl",
			this.SHADERS_DIRECTORY + "pbrFS.glsl"
		]);
		materialPrograms.push([
			SkyboxMaterial,
			this.SHADERS_DIRECTORY + "skyboxVS.glsl",
			this.SHADERS_DIRECTORY + "skyboxFS.glsl"
		]);
		materialPrograms.push([
			DefaultSpriteMaterial,
			this.SHADERS_DIRECTORY + "defaultSpriteVS.glsl",
			this.SHADERS_DIRECTORY + "defaultSpriteFS.glsl"
		]);

		return materialPrograms;
	}
}
