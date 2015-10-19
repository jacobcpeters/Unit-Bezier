/*!
* Unit-Bezier 1.0.0
*
* Copyright 2015, Jacob Peters - http://jacobpeters.co
* Credit to:
*   Chromium: UnitBezier Class and tests
*   Firefox: nsSMILKeySpline Class and tests
*   A Primer on Bézier Curves - http://pomax.github.io/bezierinfo/
* Released under the MIT license - http://opensource.org/licenses/MIT
*/

/**
 * @class UnitBezier
 * @brief Calculates the Y coordinate for a given X coordinate on a Bezier curve. 
 * @param [in] Array points The control points of a Bezier curve [x1, y1, x2, y2].
 * @param [in] Float epsilon An epsilon to determine the acceptable error for the answer.
 */
function UnitBezier(points, epsilon) {
    'use strict';
    //Calculate coefficients for sampling equations
    this.coefX = [
        3.0 * points[0],
        3.0 * (points[2] - points[0]),
        1
    ];
    this.coefY = [
        3.0 * points[1],
        3.0 * (points[3] - points[1]),
        1
    ];
    this.coefX[1] -= this.coefX[0];
    this.coefX[2] = this.coefX[2] - this.coefX[0] - this.coefX[1];
    this.coefY[1] -= this.coefY[0];
    this.coefY[2] = this.coefY[2] - this.coefY[0] - this.coefY[1];
    
    this.epsilon = epsilon;
    
    this.sampleTable = this.generateSampleTable();
}

UnitBezier.prototype.generateSampleTable = function () {
    'use strict';
    
    var sampleTable = [];
    
    for(var i=0; i < this.sampleTableSize; ++i) {
        sampleTable[i] = this.sampleCurveX(i * this.sampleStepSize);
    }
    return sampleTable;
};

UnitBezier.prototype.sampleCurveX = function (t) {
    'use strict';
    return ((this.coefX[2] * t + this.coefX[1]) * t + this.coefX[0]) * t;
};

UnitBezier.prototype.sampleCurveY = function (t) {
    'use strict';
    return ((this.coefY[2] * t + this.coefY[1]) * t + this.coefY[0]) * t;
};

UnitBezier.prototype.sampleCurveDerivativeX = function (t) {
    'use strict';
    return (3.0 * this.coefX[2] * t + 2.0 * this.coefX[1]) * t + this.coefX[0];
};

UnitBezier.prototype.solveCurveX = function (x) {
    'use strict';
    
    //Estimate the value of t by interpolating the LUT
    var tEstimates = this.esitimateT(x),
        calculatedT;
    
    //Newton Raphson will not converge if the slope is too small
    if(tEstimates.slope >= 0.02) {
        calculatedT = this.newtonRaphsonIterate(x, tEstimates.guessForT);
    }
    //For tiny slopes, the estimate is close enough
    else if(tEstimates.slope < 0.00001) {
        calculatedT = tEstimates.guessForT;
    }
    //Fallback to Binary Subdivision if all else fails
    if(calculatedT === -1) {
        calculatedT = this.binarySubdivide(x, tEstimates.tBoundsLow, tEstimates.tBoundsHigh);
    }

    return calculatedT;
};

UnitBezier.prototype.esitimateT = function (x) {
    'use strict';
    
    var index = 0,
        interpolatedT,
        dist;
    
    //find which samples the desired x is between
    for(; index < this.sampleTableSize - 1 && this.sampleTable[index] <= x + this.epsilon; ++index) {}
    --index;
    
    dist = (x - this.sampleTable[index]) / (this.sampleTable[index+1] - this.sampleTable[index]); 
    interpolatedT = (this.sampleStepSize * index) + (dist * this.sampleStepSize);
    
    return { 
        guessForT: interpolatedT,
        tBoundsLow: this.sampleStepSize * index,
        tBoundsHigh: Math.min(this.sampleStepSize * (index + 1), 1),
        slope: this.sampleCurveDerivativeX(interpolatedT)
    };
};

//
UnitBezier.prototype.newtonRaphsonIterate = function (x, estimatedT) {
    'use strict';
    
    var currentX,
        currentDerivitive;
    
    for(var i=0; i < this.newtonRaphsonMaxIterations; ++i) {
        currentX = this.sampleCurveX(estimatedT) - x;
        currentDerivitive = this.sampleCurveDerivativeX(estimatedT);
        
        if(Math.abs(currentX) < this.epsilon) {
            return estimatedT;
        }
        
        estimatedT -= currentX / currentDerivitive;
    }
    console.log('x for calculated t = ' + this.sampleCurveX(estimatedT));
    return -1;
};

UnitBezier.prototype.binarySubdivide = function (x, tBoundsLow, tBoundsHigh) {
    'use strict';
    
    var currentX,
        currentT,
        i = this.binarySubdivideMaxIterations;
    
    do {
        currentT = tBoundsLow + ((tBoundsHigh - tBoundsLow) / 2.0);
        currentX = this.sampleCurveX(currentT) - x;
        
        if(currentX > 0.0) {
            tBoundsHigh = currentT;
        }
        else {
            tBoundsLow = currentT;
        }
    } while (Math.abs(currentX) > this.epsilon && --i > 0);
    
    return currentT;
};

UnitBezier.prototype.calc = function (timePercent) {
    'use strict';

    
    if(timePercent < 0.0) {
        timePercent = 0.0;
    }
    else if (timePercent > 1.0) {
        timePercent = 1.0
    }
    
    return this.sampleCurveY(this.solveCurveX(timePercent));
};

//class constants
UnitBezier.prototype.sampleTableSize = 26;
UnitBezier.prototype.sampleStepSize = 1.0 / (UnitBezier.prototype.sampleTableSize - 1);
UnitBezier.prototype.newtonRaphsonMaxIterations = 8;
UnitBezier.prototype.binarySubdivideMaxIterations = 20;

UnitBezier.easings = {
    linear:         [0.0,   0.0,    1.0,    1.0],
    ease:           [0.25,  0.1,    0.25,   1.0],
    easeIn:         [0.42,  0.0,    1.0,    1.0],
    easeInOut:      [0.42,  0.0,    0.58,   1.0],
    easeOut:        [0.0,   0.0,    0.58,   1.0],
    easeInBack:     [0.6,   -0.28,  0.735,  0.045],
    easeOutBack:    [0.175, 0.885,  0.32,   1.275],
    easeInOutBack:  [0.680, -0.550, 0.265,  1.550]
};


//export for node
module.exports = UnitBezier;
