QUnit.assert.withinEpsilon = function( value, expected, epsilon ) {
    console.log(expected);
    if(epsilon >= Math.abs(value - expected)) {
        this.push( true, value, expected, 'Passed!' );
    }
    else {
        this.push( false, value, expected, 'Failed!');
    }
    
};

//Chrome Tests
QUnit.test("Chrome Basic Use", function(assert) {
    var bezier = new UnitBezier([0.5, 1.0, 0.5, 1.0], 0.005);
    
    assert.ok( 0.875 === bezier.calc(0.5), 'Passed!');
});

QUnit.test("Chrome Overshoot", function(assert) {
    var bezier = new UnitBezier([0.5, 2.0, 0.5, 2.0], 0.005);
    
    assert.ok( 1.625 === bezier.calc(0.5), 'Passed!');
});

QUnit.test("Chrome Undershoot", function(assert) {
    var bezier = new UnitBezier([0.5, -1.0, 0.5, -1.0], 0.005);
    
    assert.ok( -0.625 === bezier.calc(0.5), 'Passed!');
});

//Mozilla Tests
QUnit.test("Mozilla Simple A", function mozSimpleA(assert) {
    var epsilon = 0.00001,
        bezier = new UnitBezier([0.0, 0.0, 1.0, 1.0], epsilon),
        tests = {
            inputs: [
                0.0,
                0.25,
                0.5,
                0.75,
                1.0
            ],
            expectedResults: [
                0.0,
                0.25,
                0.5,
                0.75,
                1.0
            ]
        };
    
    assert.ok( tests.inputs.length === tests.expectedResults.length, 'Inputs and Expected Results Array length match');
    
    for(var i=0; i < tests.inputs.length; ++i) {
        assert.withinEpsilon(bezier.calc(tests.inputs[i]), tests.expectedResults[i], epsilon);
    }
    
});

QUnit.test("Mozilla Simple B", function mozSimpleB(assert) {
    'use strict';
    
    var epsilon = 0.00001,
        bezier = new UnitBezier([0.5, 0.0, 0.5, 1.0], epsilon),
        tests = {
            inputs: [
                0.0,
                0.25,
                0.5,
                0.75,
                1.0
            ],
            expectedResults: [
                0.0,
                0.1058925,
                0.5,
                0.8941075,
                1.0
            ]
        };
    
    assert.ok( tests.inputs.length === tests.expectedResults.length, 'Inputs and Expected Results Array length match');
    
    for(let i=0; i < tests.inputs.length; ++i) {
        assert.withinEpsilon(bezier.calc(tests.inputs[i]), tests.expectedResults[i], epsilon);
    }
    
});

QUnit.test("Mozilla Simple C", function mozSimpleC(assert) {
    var epsilon = 0.00001,
        bezier = new UnitBezier([0.0, 0.75, 0.25, 1.0], epsilon),
        tests = {
            inputs: [
                0.0,
                0.25,
                0.5,
                0.75,
                1.0
            ],
            expectedResults: [
                0.0,
                0.8101832,
                0.9413430,
                0.98865045,
                1.0
            ]
        };
    
    assert.ok( tests.inputs.length === tests.expectedResults.length, 'Inputs and Expected Results Array length match');
    
    for(var i=0; i < tests.inputs.length; ++i) {
        assert.withinEpsilon(bezier.calc(tests.inputs[i]), tests.expectedResults[i], epsilon);
    }
    
});

QUnit.test("Mozilla Simple C", function mozSimpleC(assert) {
    var epsilon = 0.00001,
        bezier = new UnitBezier([1.0, 0.0, 0.25, 0.25], epsilon),
        tests = {
            inputs: [
                0.0,
                0.25,
                0.5,
                0.75,
                1.0
            ],
            expectedResults: [
                0.0,
                0.0076925,
                0.0644369,
                0.6908699,
                1.0
            ]
        };
    
    assert.ok( tests.inputs.length === tests.expectedResults.length, 'Inputs and Expected Results Array length match');
    
    for(var i=0; i < tests.inputs.length; ++i) {
        assert.withinEpsilon(bezier.calc(tests.inputs[i]), tests.expectedResults[i], epsilon);
    }
    
});
