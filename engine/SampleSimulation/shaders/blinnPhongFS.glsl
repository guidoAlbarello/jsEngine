varying highp vec3 vNormal;
varying highp vec3 vPos;

uniform highp vec3 uAmbientLight;
uniform highp vec3 uDiffuseLight;
uniform highp vec3 uSpecularLight;
uniform highp vec3 uLightDirection;

uniform highp vec3 uViewDirection;

uniform highp vec3 uAmbientConstant;
uniform highp vec3 uDiffuseConstant;
uniform highp vec3 uSpecularConstant;
uniform highp float uSpecularCoefficient;

void main(void) {
     highp vec3 halfway = normalize(uLightDirection + uViewDirection);
     gl_FragColor = vec4(uAmbientConstant * uAmbientLight + uDiffuseConstant * uDiffuseLight * max(dot(uLightDirection, normalize(vNormal)),0.0) + uSpecularConstant * uSpecularLight * pow(dot(vNormal, halfway), uSpecularCoefficient), 1.0);
}