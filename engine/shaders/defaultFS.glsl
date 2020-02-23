varying highp vec4 vColor;
varying highp vec2 vTexCoord;

uniform highp vec3 uColor;

void main(void) {
	gl_FragColor = 0.2*normalize(vColor) + 0.8* vec4(uColor, 1.0);
}