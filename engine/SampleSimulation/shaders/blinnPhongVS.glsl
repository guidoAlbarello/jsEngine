attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNormalMatrix;

varying highp vec3 vNormal;
varying highp vec3 vPos;
	
void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	vPos = (uMVMatrix * vec4(aVertexPosition,1.0)).xyz;
	vNormal = normalize(uNormalMatrix * vec4(aVertexNormal, 1.0)).xyz;
}