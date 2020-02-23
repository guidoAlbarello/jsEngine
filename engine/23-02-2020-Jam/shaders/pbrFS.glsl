#define PI 3.1415926535897932
#define MAXIMUM_TOTAL_POINT_LIGHTS 1

varying highp mat3 TBN;
varying highp vec3 worldPos;
varying highp vec2 vTexCoord;


highp float saturatedDot(vec3 v1, vec3 v2) {
      return min(max(dot(v1, v2), 0.0), 1.0);
}

highp vec3 saturate(vec3 v) {
      return clamp(v, 0.0, 1.0);
}

highp float maxdot(vec3 v1, vec3 v2) {
      return max(dot(v1, v2), 0.0);
}

struct DirectionalLight {
       highp vec3 direction;	// Light direction
       highp vec3 intensity;	// Light intensity
};

struct PointLight {
       highp vec3 position;
       highp vec3 intensity;
};

struct ObjectParams {
       // Surface Params
       sampler2D albedo;
       sampler2D second_albedo;
       sampler2D metallic;
       sampler2D roughness;
       sampler2D ambient_occlusion;
       sampler2D normal_map;
       samplerCube reflection_map;
       highp float reflection_intensity;
};

uniform DirectionalLight dirLight;
uniform PointLight pointLights[MAXIMUM_TOTAL_POINT_LIGHTS];
uniform ObjectParams params;
uniform highp vec3 cameraPos;

highp vec3 NDFggxtr(vec3 n, vec3 h, vec3 roughness) {
      highp vec3 alfa = roughness * roughness;
      highp float dotN_H = maxdot(n, h);
      highp vec3 denom = (dotN_H * dotN_H) * (alfa - vec3(1.0)) + vec3(1.0);
      
      return alfa / (PI * denom * denom);
}

highp vec3 Gschlickggx(vec3 n, vec3 vec, vec3 roughness) {
      highp float dotN_V = maxdot(n, vec);
      highp vec3 k = roughness + vec3(1.0);
      k = k*k/8.0;
      return vec3(dotN_V)/(dotN_V*(vec3(1.0)-k)+k);
}

highp vec3 Fschlick(vec3 h, vec3 v, vec3 F0) {
      return F0 + (vec3(1.0) - F0) * vec3(pow((1.0 - maxdot(h, v)), 5.0));
}

highp vec3 Brdf(vec3 L, vec3 V, vec3 N, vec3 albedo, vec3 metallic, vec3 roughness) {
      highp vec3 H = normalize(L + V);

      highp vec3 F0 = vec3(0.04);	// 0.04 value for dielectrics.
      F0 = mix(F0, albedo, metallic);	// We interpolate from F0 to albedo given by the metalness of material.

      highp vec3 flambert = albedo/PI;

      highp vec3 D = NDFggxtr(N, H, roughness);
      highp vec3 G = Gschlickggx(N, V, roughness) * Gschlickggx(N, L, roughness);
      highp vec3 F = Fschlick(H, V, F0);
      highp vec3 fcookTorrance =  D*F*G/(4.0*max(maxdot(V, N)*maxdot(L, N), 0.001));

      highp vec3 ks = F; 
      highp vec3 kd = (vec3(1.0) - ks) * (vec3(1.0) - metallic);

      return kd * flambert + fcookTorrance; // Ks inside cook-torrance
}

void main(void) {
     // Sample textures
     highp vec3 albedo = texture2D(params.albedo, vTexCoord).rgb;
     highp vec3 metallic = texture2D(params.metallic, vTexCoord).rgb;
     highp vec3 roughness = texture2D(params.roughness, vTexCoord).rgb;
     highp vec3 ambient_occlusion = texture2D(params.ambient_occlusion, vTexCoord).rgb;
     highp vec3 normal = texture2D(params.normal_map, vTexCoord).rgb;
     
     // Transform normal map to World Space
     highp vec3 N = normalize(normal * 2.0 - 1.0);
     N = normalize(TBN * N);
     
     // Comment this line to use normal maps.
     N = TBN[2];

     // Sample reflection_map
     //highp vec3 R = reflect(normalize(worldPos - cameraPos), N);
     //highp vec3 reflection = textureCube(params.reflection_map, R).rgb;
     
     highp vec3 Lo = vec3(0.0);
     
     // Calculate directional light
     highp vec3 Wi = -dirLight.direction;
     highp vec3 Wo = normalize(cameraPos - worldPos);
     highp vec3 LWi = dirLight.intensity;
     
     Lo += Brdf(Wi, Wo, N, albedo, metallic, roughness) * LWi * maxdot(N, Wi);

     for (int i = 0; i < MAXIMUM_TOTAL_POINT_LIGHTS; i++) {
    	 Wi = normalize(pointLights[i].position - worldPos);
	 	highp float distance = length(pointLights[i].position - worldPos);
	 	highp float attenuation = 1.0 / ( distance);
	 	LWi = pointLights[i].intensity * attenuation;
     	Lo += Brdf(Wi, Wo, N, albedo, metallic, roughness) * LWi * maxdot(N, Wi);
     }

     highp vec3 ambient = /*params.reflection_intensity * reflection */ + vec3(0.03) * albedo * ambient_occlusion;
     highp vec3 color = ambient + Lo;

     highp float exposure = 2.0;
     color = vec3(1.0) - exp(-color * exposure);		// Map the HDR to LDR
     //color = pow(color, vec3(1.0/2.2));				// Gamma correction

     gl_FragColor = vec4(color, 1.0);
}