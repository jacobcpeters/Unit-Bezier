# Unit-Bezier

> A Combination of Mozilla and Chromium implementations of Bezier Curves used for animation interpolation for Javascript

Unit-Bezier takes optimizations from both Mozilla and Chromium timing function code and combines them into performant Javascript. It is compliant with both browsers' tests.  

## Getting Started

Read the docs at [http://jacobcpeters.github.io/Unit-Bezier/](http://jacobcpeters.github.io/Unit-Bezier/)

### Download / Clone

Install with npm:

```bash
npm install Unit-Bezier
```

Clone the repo using Git:

```bash
git clone --bare https://github.com/jacobcpeters/Unit-Bezier.git
```

Alternatively you can [download](https://github.com/jacobcpeters/Unit-Bezier/archive/master.zip) this repository.

### Using Unit-Bezier

Use the 'new' operator to construct a new UnitBezier object for your function/module/class.
The first parameter of the constructor is an array that contains the control points for the Bezier Curve [x1, y1, x2, y2]. The second parameter is the epsilon that controls the desired accuracy of the estimations.

```js
var bezier = new UnitBezier(controlPoints, epsilon);
```

#### Easing Aliases

Easy to use aliases are available for common easing types in the UnitBezier.easings object.

```js
var bezier = new UnitBezier(UnitBezier.easings.easeInOut, 0.005);
```

###### Table of available aliases:

| Easing Name   | Control Points                 |
|:--------------|:-------------------------------|
| linear        | [0.0,   0.0,    1.0,    1.0]   |
| ease          | [0.25,  0.1,    0.25,   1.0]   |
| easeIn        | [0.42,  0.0,    1.0,    1.0]   |
| easeInOut     | [0.42,  0.0,    0.58,   1.0]   |
| easeOut       | [0.0,   0.0,    0.58,   1.0]   |
| easeInBack    | [0.6,   -0.28,  0.735,  0.045] |
| easeOutBack   | [0.175, 0.885,  0.32,   1.275] |
| easeInOutBack | [0.680, -0.550, 0.265,  1.550] |

####Code example:

```js
var bezier = new UnitBezier([0.0, 0.0, 1.0, 1.0], 0.000001), //linear Bezier Curve
    target = document.getElementById('animated-opacity'),
    animationLength = 1000, // 1000ms = 1s
    startTime = Date.now();
    
function animateOpacity() {
    var timeSinceAnimationStarted = Date.now() - startTime;
    
    target.style.opacity = 1 * bezier.calc(timeSinceAnimationStarted / animationLength);
    
    if(timeSinceAnimationStarted < animationLength) {
        requestAnimationFrame(animateOpacity);
    }
}

requestAnimationFrame(animateOpacity);
```

## Feature requests

If Unit-Bezier doesn't support a feature you require, please put a request in the issues tracker. 


## License

© Jacob Peters, 2015. Licensed under an [MIT](https://github.com/jacobcpeters/ResponsiveLazyVids/blob/master/LICENSE) license.