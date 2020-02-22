class CubicBSplineCurve {
    m = 0.001;
    defaultNormal = [0,1,0];
    constructor(p0, p1, p2, p3) {
	this.p0 = p0;
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;

	// Coefficients of cubic bezier polynomial
	this.a = vec3.create();
	this.b = vec3.create();
	this.c = vec3.create();
	this.d = vec3.create();

	// Set a coefficient. 
	vec3.scale(this.a, p0, -1.0);
	vec3.scaleAndAdd(this.a, this.a, p1, 3.0);
	vec3.scaleAndAdd(this.a, this.a, p2, -3.0);
	vec3.add(this.a, this.a, p3);

	// Set b coefficient.
	vec3.scale(this.b, p0, 3.0);
	vec3.scaleAndAdd(this.b, this.b, p1, -6.0);
	vec3.scaleAndAdd(this.b, this.b, p2, 3.0);
				
	// Set c coefficient
	vec3.scale(this.c, p0, -3.0);
	vec3.scaleAndAdd(this.c, this.c, p2, 3.0);
	
	// Set d coefficient
	vec3.scaleAndAdd(this.d, p0, p1, 4.0);
 	vec3.add(this.d, this.d, p2);
    }

    setDefaultNormal(defaultNormal) {
	this.defaultNormal = defaultNormal;
	return this;
    }

    point(t) {
	let point = vec3.create();
		vec3.scale(point, this.a, Math.pow(t, 3.0));
	vec3.scaleAndAdd(point, point, this.b, Math.pow(t, 2));
	vec3.scaleAndAdd(point, point, this.c, t);
	   vec3.add(point, point, this.d);
	vec3.scale(point, point, 1/6.0);

	return point;
    }
    
    curve(t) {
	let point = this.point(t);
	let tangent = vec3.create();
	let normal = vec3.fromValues(this.defaultNormal[0], this.defaultNormal[1], this.defaultNormal[2]);
	let binormal = vec3.create();

	// tangent
	vec3.scale(tangent, this.a, 3.0*Math.pow(t,2));
	vec3.scaleAndAdd(tangent, tangent, this.b, 2.0*t);
	vec3.add(tangent, tangent, this.c);
	vec3.scale(tangent, tangent, 1/6.0);
	vec3.normalize(tangent, tangent);

	if (vec3.length(tangent) == 0) {
	    if (t == 0) tangent = this.curve(t + this.m).slice(0,3);
	    if (t > this.m) tangent = this.curve(t-this.m).slice(0,3);
	    if (t == this.m) tangent = [1.0, 0.0, 0.0]; // Think if this is needed.
	}
	// binormal
	vec3.cross(binormal, tangent, normal);
	vec3.normalize(binormal, binormal);

	// normal
	vec3.cross(normal, binormal, tangent);
	vec3.normalize(normal, normal);
	
	// transform
	return mat4.fromValues(
	    tangent[0], tangent[1], tangent[2], 0.0,
	    normal[0], normal[1], normal[2], 0.0,
	    binormal[0], binormal[1], binormal[2], 0.0,
	    point[0], point[1], point[2], 1.0);
    }
}
