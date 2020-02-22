class BSplineCurve extends Curve {
   constructor(controlPoints) {
	super();
	this.curveSections = [];
	this.controlPoints = controlPoints || [];
	this.buildCurveSections(this.controlPoints);
    }

    // This can be optimized to not build the curve sections every time new control points are added. 
    addControlPoints(controlPoints) {
	this.controlPoints.concat(controlPoints);
	this.buildCurveSections(this.controlPoints);
    }

    setControlPoints(controlPoints) {
	this.controlPoints = controlPoints;
	this.buildCurveSections(this.controlPoints);
    }

    buildCurveSections(controlPoints) {
	let curveSections = [];
	for (let i = 0; i < controlPoints.length-3; i++) {
	    curveSections.push(new CubicBSplineCurve(controlPoints[i], controlPoints[i+1], controlPoints[i+2], controlPoints[i+3]).setDefaultNormal(this.defaultNormal));
	}

	this.curveSections = curveSections;
    }
}
