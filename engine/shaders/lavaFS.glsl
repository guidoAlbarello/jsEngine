varying highp vec2 vTexCoord;

uniform sampler2D textureAtlas;
uniform highp vec3 offset;

void main(void) {
	gl_FragColor = mix(texture2D(textureAtlas, vTexCoord).rgba, vec4(0.5,0.45,0.0,1.0), vTexCoord.y);
}