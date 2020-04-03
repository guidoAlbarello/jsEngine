varying highp vec2 vTexCoord;

uniform sampler2D textureAtlas;
uniform highp vec3 offset;
uniform bool has_heart;
uniform bool has_liver;
uniform bool has_brain;

void main(void) {
	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

    if (has_heart && vTexCoord.x < 0.33) {
         gl_FragColor = vec4(0.0, 0.0,0.0,1.0);
    } 
    
    if (has_liver && vTexCoord.x > 0.33 && vTexCoord.x < 0.66) {
        gl_FragColor = vec4(0.0, 0.0,0.0,1.0);
    } 
    
    if (has_brain && vTexCoord.x > 0.66) {
        gl_FragColor = vec4(0.0, 0.0,0.0,1.0);
    }
}