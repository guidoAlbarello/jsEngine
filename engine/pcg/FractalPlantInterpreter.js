class FractalPlantInterpreter {
    traduce(language) {
        let positions = [];
        let indexBuffer = [];

        let angle = Math.PI * 25 / 180;
        let segmentLength = 0.02;
        let displacement = (ang) => [Math.cos(ang) * segmentLength, Math.sin(ang) * segmentLength];
        
        let stack = [];
        let currentAngle = 0;
        let currentPos = [0,0];

        // Remove Xs as those have no meaning.
        language = language.split("X").join("");
    
        for (let i = 0; i < language.length; i++) {
            switch (language.charAt(i)) {
                case "F":
                    // We repeat points to simplify index buffer creation logic. Just testing, not looking for performance.
                    positions.push(currentPos[1]);positions.push(currentPos[0]);positions.push(0);
                    currentPos = [currentPos[0] + displacement(currentAngle)[0], currentPos[1] + displacement(currentAngle)[1]];
                    positions.push(currentPos[1]);positions.push(currentPos[0]);positions.push(0);
                    break;
                case "+":
                    currentAngle -= angle;
                    break;
                case "-":
                    currentAngle += angle;
                    break;
                case "[":
                    let currentState = {
                        "pos": currentPos,
                        "angle": currentAngle 
                    };
                    stack.push(currentState)
                    break;
                case "]":
                    let storedState = stack.pop();
                    currentAngle = storedState.angle;
                    currentPos = storedState.pos;
                    break;
            }
        }

        for (let i = 0; i < positions.length/3; i++) {
            indexBuffer.push(i);
        }

        let object = new Object3d();

        let params = gAssetManager.makeModelParams();
        params.positions = positions;

        object.setModel(
            gAssetManager.makeModelData(params, indexBuffer, "LINES")
        );
        object.setMaterial(new DefaultMaterial(makeRgb(124, 252, 0)));

        return object;
    }
}