varying highp vec2 vTexCoord;

uniform sampler2D textureAtlas;
uniform highp vec3 offset;
uniform highp float life;
uniform highp float total_life;

void main(void) {
	gl_FragColor = texture2D(textureAtlas, vTexCoord).rgba;

    if (vTexCoord.x > life/total_life) discard;
}