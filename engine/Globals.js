const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;
const vec4 = glMatrix.vec4;
const vec2 = glMatrix.vec2;

const addVector3 = (vec1, vec2) => {
	return [vec1[0] + vec2[0], vec1[1] + vec2[1], vec2[2] + vec2[2]];
};

const vecMulScalar = (vec, scalar) => {
	return [vec[0] * scalar, vec[1] * scalar, vec[2] * scalar];
};

const round = (value, decimals) => {
	return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

const makeRgb = (r, g, b) => {
	return [r / 255.0, g / 255.0, b / 255.0];
};

const vecToZYPlane = vec => {
	return [vec[2], vec[1], -vec[0]];
};

const sphericalToXYZ = (radius, alfa, beta) => {
	return [
		radius * Math.sin(alfa) * Math.sin(beta),
		radius * Math.cos(beta),
		radius * Math.cos(alfa) * Math.sin(beta)
	];
};

(function () {
	var requestAnimationFrame =
		window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;
})();

var gRenderer = new Renderer();
var gAssetManager = new AssetManager();
var gShaderManager = new ShaderManager();
var gTextureManager = new TextureManager();
var gSurfaceCreator = new SurfaceCreator();
var gDeveloperTools = new DeveloperTools();
var gInputHandler = new InputHandler();
var gMaterialManager = new MaterialManager();
var gModelMaker = new ModelMaker();
var gCollisionDetection = new CollisionDetection();
var gEntityManager = new EntityManager();
var gQuerySystem = new QuerySystem();


var gDeltaTime = 0.0;
var gDeltaTimeMultiplier = 1.0;
var skipFrame = false;
var backoff_type = "none";
var gBackoffSpeed = 1;

const freezeFrame = () => {
	skipFrame = true;
};

const freezeFrameWithExponentialBackoff = (backoffSpeed) => {
	freezeFrame();
	gDeltaTimeMultiplier = backoffSpeed || 0.1;
	backoff_type = "exponential";
};

const freezeFrameWithLinearBackoff = (backoffSpeed) => {
	freezeFrame();
	gDeltaTimeMultiplier = 0;
	gBackoffSpeed = backoffSpeed || 0.1;
	backoff_type = "linear";
};


const checkIfFrameIsFreezed = () => {
	let isFreezingActive = skipFrame;
	skipFrame = false;
	switch (backoff_type) {
		case "exponential":
			gDeltaTimeMultiplier = Math.min(gDeltaTimeMultiplier + gDeltaTimeMultiplier, 1);
			break;
		case "linear":
			gDeltaTimeMultiplier = Math.min(gDeltaTimeMultiplier + gBackoffSpeed, 1);
			break;
		default:
			gDeltaTimeMultiplier = 1;
	}
	gDeltaTime *= gDeltaTimeMultiplier;
	return isFreezingActive;
};

const IDENTITY = mat4.identity(mat4.create());
