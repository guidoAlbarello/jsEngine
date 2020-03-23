varying highp vec2 vTexCoord;

uniform sampler2D textureAtlas;
uniform highp vec3 offset;

void main(void) {
	gl_FragColor =  texture2D(textureAtlas, vec2(offset[0], offset[1]) + vTexCoord).rgba;

	if (gl_FragColor.a < 0.5) discard;
}