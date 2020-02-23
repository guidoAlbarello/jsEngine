class BezierCurve extends Curve {
	constructor(controlPoints) {
		super();
		this.controlPoints = controlPoints || [];
		if (controlPoints.length % 4 != 0) {
			this.controlPoints = [];
			throw "ControlPoints arrays must be a multiple of 4";
		}
		this.buildCurveSections(this.controlPoints);
	}

	addControlPoints(controlPoints) {
		if (controlPoints.length % 4 != 0)
			throw "ControlPoints arrays must be a multiple of 4";
		this.controlPoints.concat(controlPoints);
		this.buildCurveSections(this.controlPoints);
	}

	setControlPoints(controlPoints) {
		if (controlPoints.length % 4 != 0)
			throw "ControlPoints arrays must be a multiple of 4";
		this.controlPoints = controlPoints;
		this.buildCurveSections(this.controlPoints);
	}

	buildCurveSections(controlPoints) {
		let curveSections = [];
		for (let i = 0; i < controlPoints.length; i += 4) {
			curveSections.push(
				new CubicBezierCurve(
					controlPoints[i],
					controlPoints[i + 1],
					controlPoints[i + 2],
					controlPoints[i + 3]
				).setDefaultNormal(this.defaultNormal)
			);
		}

		this.curveSections = curveSections;
	}
}
