attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTexCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNormalMatrix;

varying highp vec4 vColor;    
varying highp vec2 vTexCoord;

void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	vColor = vec4(mat3(uNormalMatrix) * aVertexNormal, 1.0);
	vTexCoord = aTexCoord;
}