class Curve extends Object3d {
    LENGTH_RESOLUTION = 400;
    curveSections;
    defaultNormal = [0,1,0];
    constructor() {
	super();
	this.controlPoints = [];
    }
    // Maybe add another sample method to just sample the point, ( to avoid calculating tangents, normals, binormals)
    sample(t) {
	let sample =  t == this.curveSections.length ? this.curveSections[t-1].curve(1.0) :
	    this.curveSections[Math.floor(t)].curve(t - Math.floor(t));
	return sample;
    }

    point(t) {
	return t == this.curveSections.length ? this.curveSections[t-1].point(1.0) :
	    this.curveSections[Math.floor(t)].point(t - Math.floor(t));
    }

    // Return multiple arrays from uniform sampling instead of just 1 with all. 
    makeForm(sampleAmount) {
	let samples = this.getUniformSampling(sampleAmount);
	let form = {
	    "positions" : [],
	    "normals" : [],
	    "amountOfVertices" : samples.length
	};
	
	for (let i = 0; i < samples.length; i++) {
	    form.positions.push(samples[i].slice(12,15));
	    form.normals.push(samples[i].slice(4, 7));
	}

	return form;
    }

    length() {
	return this.curveSections.length;
    }

    transformCurveSections() {
	let worldLocatedControlPoints = [];
	for (let i = 0; i < this.controlPoints.length; i++) {
	    let controlPoint = vec3.create();
	    vec3.transformMat4(controlPoint, this.controlPoints[i], this.modelMatrix);
	    worldLocatedControlPoints.push(controlPoint);
	}

	this.buildCurveSections(worldLocatedControlPoints);
    }
    
    getUniformSampling(samplesAmount) {
	this.transformCurveSections();
	let discretization = [];
	
	let samplePositions = this.getArcParametrization(samplesAmount-1);
	for (let i = 0; i < samplePositions.length; i++) {
	    let t = samplePositions[i];
	    discretization.push(this.sample(t));
	}

	discretization.push(this.sample(this.curveSections.length));
	return discretization;
    }

    getArcParametrization(samplesAmount) {
	let arcLength = 0.0;
	let indexToLength = [];

	// Generate array of [arcLength(t), t] at high resolution.
	let step = this.curveSections.length/(this.LENGTH_RESOLUTION-1);
	let previousPoint = this.curveSections[0].point(0);
	for (let t = 0.0; t < this.curveSections.length; t+=step) {
	    let point = this.point(t);
	    let difference = vec3.create();
	    vec3.scaleAndAdd(difference, point, previousPoint, -1.0);
	    arcLength += vec3.length(difference);
	    indexToLength.push([arcLength, t]);
	    previousPoint = point;
	}

	let point = this.point(this.curveSections.length);
	let difference = vec3.create();
	vec3.scaleAndAdd(difference, point, previousPoint, -1.0);
	arcLength += vec3.length(difference);
	indexToLength.push([arcLength, this.curveSections.length]);

	// Get array of sample positions (t) at equidistant points in the curve.
	let equidistantIndexes = [];
	step = this.curveSections.length/samplesAmount;
	for (let i = 0; i < samplesAmount; i++) {
	    let u = step * i;
	    equidistantIndexes.push(this.findTFromDistance(u * arcLength/this.curveSections.length, indexToLength));
	}

	return equidistantIndexes;
    }

    findTFromDistance(u, indexToLength) {
	// Binary search can be implemented to try to optimize.
	let i;
	for (i = 0; i < indexToLength.length; i++) {
	    if (indexToLength[i][0] == u) return indexToLength[i][1];
	    if (indexToLength[i][0] > u) break;
	    if (i == indexToLength.length-1) break;
	}
	
	return indexToLength[i-1][1] + (indexToLength[i][1] - indexToLength[i-1][1])/(indexToLength[i][0] - indexToLength[i-1][0])*(u - indexToLength[i-1][0]);
    }

    setDefaultNormal(defaultNormal) {
	this.defaultNormal = defaultNormal;
	return this;
    }
}
