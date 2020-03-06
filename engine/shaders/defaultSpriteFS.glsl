varying highp vec2 vTexCoord;

uniform sampler2D textureAtlas;
uniform highp vec3 offset;

void main(void) {
	gl_FragColor =  vec4(texture2D(textureAtlas, vec2(offset[0], offset[1]) + vTexCoord).rgb, 1.0);
}