#define PI 3.1415926535897932
#define MAXIMUM_TOTAL_POINT_LIGHTS 7

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

precision mediump float;
	// Perlin Noise						
						
			vec3 mod289(vec3 x)
			{
			  return x - floor(x * (1.0 / 289.0)) * 289.0;
			}

			vec4 mod289(vec4 x)
			{
			  return x - floor(x * (1.0 / 289.0)) * 289.0;
			}

			vec4 permute(vec4 x)
			{
			  return mod289(((x*34.0)+1.0)*x);
			}

			vec4 taylorInvSqrt(vec4 r)
			{
			  return 1.79284291400159 - 0.85373472095314 * r;
			}

			vec3 fade(vec3 t) {
			  return t*t*t*(t*(t*6.0-15.0)+10.0);
			}

			// Classic Perlin noise
			float cnoise(vec3 P)
			{
			  vec3 Pi0 = floor(P); // Integer part for indexing
			  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
			  Pi0 = mod289(Pi0);
			  Pi1 = mod289(Pi1);
			  vec3 Pf0 = fract(P); // Fractional part for interpolation
			  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
			  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
			  vec4 iy = vec4(Pi0.yy, Pi1.yy);
			  vec4 iz0 = Pi0.zzzz;
			  vec4 iz1 = Pi1.zzzz;

			  vec4 ixy = permute(permute(ix) + iy);
			  vec4 ixy0 = permute(ixy + iz0);
			  vec4 ixy1 = permute(ixy + iz1);

			  vec4 gx0 = ixy0 * (1.0 / 7.0);
			  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
			  gx0 = fract(gx0);
			  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
			  vec4 sz0 = step(gz0, vec4(0.0));
			  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
			  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

			  vec4 gx1 = ixy1 * (1.0 / 7.0);
			  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
			  gx1 = fract(gx1);
			  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
			  vec4 sz1 = step(gz1, vec4(0.0));
			  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
			  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

			  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
			  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
			  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
			  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
			  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
			  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
			  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
			  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

			  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
			  g000 *= norm0.x;
			  g010 *= norm0.y;
			  g100 *= norm0.z;
			  g110 *= norm0.w;
			  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
			  g001 *= norm1.x;
			  g011 *= norm1.y;
			  g101 *= norm1.z;
			  g111 *= norm1.w;

			  float n000 = dot(g000, Pf0);
			  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
			  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
			  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
			  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
			  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
			  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
			  float n111 = dot(g111, Pf1);

			  vec3 fade_xyz = fade(Pf0);
			  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
			  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
			  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
			  return 2.2 * n_xyz;
			}

//uniform float u_time;
highp vec3 mixTexturesWithPerlinNoise(vec3 firstTexture, vec3 secondTexture) {
      // Add code to mix textures here!.
      float noise1 = cnoise(vTexCoord.xyx * 1.0);
      float noise2 = cnoise(vTexCoord.xyx * 3.0);
      float noise3 = cnoise(vTexCoord.xyx * 13.0);

      float noise = (noise1 + noise2 + noise3)/3.0;
      vec3 vecFinal = mix( firstTexture, secondTexture, 1.5*noise);
      return vecFinal;
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
       float reflection_intensity;
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

highp vec3 Brdf(vec3 L, vec3 V, vec3 N, vec3 albedo, vec3 metallic, vec3 roughness, vec3 reflection) {
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
     highp vec3 albedo = mixTexturesWithPerlinNoise(texture2D(params.albedo, vTexCoord).rgb, texture2D(params.second_albedo, vTexCoord).rgb);
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
     highp vec3 R = reflect(normalize(worldPos - cameraPos), N);
     highp vec3 reflection = textureCube(params.reflection_map, R).rgb;
     
     highp vec3 Lo = vec3(0.0);
     
     // Calcualte directional light
     highp vec3 Wi = dirLight.direction;
     highp vec3 Wo = normalize(cameraPos - worldPos);
     highp vec3 LWi = dirLight.intensity;
     
     Lo += Brdf(Wi, Wo, N, albedo, metallic, roughness, reflection) * LWi * maxdot(N, Wi);

     for (int i = 0; i < MAXIMUM_TOTAL_POINT_LIGHTS; i++) {
    	 Wi = normalize(pointLights[i].position - worldPos);
	 highp float distance = length(pointLights[i].position - worldPos);
	 highp float attenuation = 1.0 / ( distance);
	 LWi = pointLights[i].intensity * attenuation;
     	 Lo += Brdf(Wi, Wo, N, albedo, metallic, roughness, reflection) * LWi * maxdot(N, Wi);
     }

     highp vec3 ambient = params.reflection_intensity * reflection + vec3(0.03) * albedo * ambient_occlusion;
     highp vec3 color = ambient + Lo;

     highp float exposure = 2.0;
     color = vec3(1.0) - exp(-color * exposure);		// Map the HDR to LDR
     //color = pow(color, vec3(1.0/2.2));				// Gamma correction

     gl_FragColor = vec4(color, 1.0);
}