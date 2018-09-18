var createOptimizer = require('../dist/index.js').default;

var RASTRING_PARAMS = {
    A: 10,
    n: 2,
};

var MAX_ITER = 50;
var CONVERGENCE_THRESHOLD = MAX_ITER / 2;
var INERTIA_MIN_FACTOR = 0.8;
var INERTIA_MAX_FACTOR = 1.;

var rastringFunction = (position) => {
    return position.reduce(
        (accumulatedValue, currentValue) =>
            accumulatedValue + Math.pow(currentValue, 2) - RASTRING_PARAMS.A * Math.cos(2. * Math.PI * currentValue),
        RASTRING_PARAMS.A * RASTRING_PARAMS.n
    );
};

var inertiaFactor = (iteration) => {
    if (iteration < CONVERGENCE_THRESHOLD) {
        return (iteration / MAX_ITER) * (INERTIA_MIN_FACTOR - INERTIA_MAX_FACTOR) + INERTIA_MAX_FACTOR;
    }
    return INERTIA_MIN_FACTOR;
};

var loggerFunction = (meta) =>
    console.log({
        globalBestPosition: meta.globalBestPosition,
        globalBestFitness: meta.globalBestFitness,
        iteration: meta.iteration
    });


var optimizer = createOptimizer({
    inertiaFactor,
    useConstrictionFactor: true,
    maxVelocity:[2.05, 2.05],
    minVelocity: [-2.05, -2.05],
    maxPosition: [5.12, 5.12],
    minPosition: [-5.12, -5.12],
    populationSize: 30,
    numberOfDimensions: 2,
    maxIterations: 50,
    desiredFitness: 0,
    desiredPrecision: 1E-3,
    fitnessFunction: rastringFunction,
    socialFactor: () => 2.05,
    individualFactor: () => 2.05,
    callbackFn: loggerFunction,
});

console.log(optimizer.start());
