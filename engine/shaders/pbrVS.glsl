attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec3 aVertexTangent;
attribute vec2 aTexCoord;

uniform mat4 uMVMatrix;
uniform mat4 uMMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNormalMatrix;

varying highp mat3 TBN;
varying highp vec3 worldPos;
varying highp vec2 vTexCoord;

void main(void) {
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	vTexCoord = aTexCoord;
	worldPos = (uMMatrix * vec4(aVertexPosition, 1.0)).xyz;
	vec3 normal = normalize((uNormalMatrix * vec4(aVertexNormal, 1.0)).xyz);
	vec3 tangent = normalize((uMMatrix * vec4(aVertexTangent, 1.0)).xyz);
	tangent = normalize(tangent - dot(tangent, normal) * normal);
	vec3 bitangent = normalize(cross(normal, tangent));
     	TBN = mat3(tangent, bitangent, normal);
}