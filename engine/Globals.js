const mat4 = glMatrix.mat4;
const vec3 = glMatrix.vec3;
const vec4 = glMatrix.vec4;
const vec2 = glMatrix.vec2;

const round = (value, decimals) => {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

const makeRgb = (r, g, b) => {
    return [r/255.0, g/255.0, b/255.0];
}

const vecToZYPlane = (vec) => {
    return [vec[2], vec[1], -vec[0]]; 
}

const sphericalToXYZ = (radius, alfa, beta) => {
    return [radius * Math.sin(alfa) * Math.sin(beta), radius * Math.cos(beta) , radius * Math.cos(alfa) * Math.sin(beta)];
}

(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
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

var gDeltaTime = 0.0;
var gGUIParams = {
    profile:"cruzada",
    columns: 5,
    chairs: 4,
    elevation: 4
};
const IDENTITY = mat4.identity(mat4.create());

