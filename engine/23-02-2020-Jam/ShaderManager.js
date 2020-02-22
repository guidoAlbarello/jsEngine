class ShaderManager {
    DEFAULT_VS = './shaders/pbrVS.glsl';
    DEFAULT_FS = './shaders/pbrFS.glsl';
    gl;

    constructor() {
        this.programs = []; // Only one shader for now. 
        this.nextShaderId = 0;
    }

    makeShader(shaderSrc, shaderType) {
        let shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, shaderSrc);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            alert("An error occurred compiling the shaders: " +
            this.gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }

    async loadDefaultShaders() {
       await this.loadShaders(this.DEFAULT_VS, this.DEFAULT_FS);
    }

    readJson(pathname) {
        return new Promise(resolve => {$.get(pathname, function(data) {
            resolve(data);
         }, 'text');});
    }

    // TODO: Group objects with same shaders
    async loadShaders(vsFile, fsFile) {
        // TODO: Refactor optional shader
        let vertexShader;
        let fragmentShader;

        if (vsFile.length > 0) {
            vertexShader = await this.readJson(vsFile);
        } // TODO: else load default vertex shader. 

        if (fsFile.length > 0) {
            fragmentShader = await this.readJson(fsFile);
        }

        let newProgram = this.gl.createProgram();
        
        this.gl.attachShader(newProgram, this.makeShader(vertexShader, this.gl.VERTEX_SHADER));
        this.gl.attachShader(newProgram, this.makeShader(fragmentShader, this.gl.FRAGMENT_SHADER));
        
        this.gl.linkProgram(newProgram);
        if (!this.gl.getProgramParameter(newProgram, this.gl.LINK_STATUS)) {
            alert("Unable to initialize the shader program: " +
                this.gl.getProgramInfoLog(newProgram));
            return null;
        }

        // map uniforms and uniform pointers, also attrib pointers. 
        // TODO: If id already exists, replace it.
        return {id:this.nextShaderId++, reference: newProgram};
    }
    
    setContext(gl) {
        this.gl = gl;
    }
}
