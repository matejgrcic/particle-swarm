var createOptimizer = require('../dist/index.js').default;

createOptimizer({
    maxVelocity:[4.05],
    minVelocity: [-4.05],
    maxPosition: [10.],
    minPosition: [-10.],
    populationSize: 30,
    numberOfDimensions: 1,
    maxIterations: 50,
    desiredFitness: 0,
    desiredPrecision: 1E-5,
    fitnessFunction: (x) => x*x,
    socialFactor: (iteration) => 2.,
    individualFactor: (iteration) => 2.,
    inertiaFactor: (iteration) => 1.,
    callbackFn: (meta) => console.log(meta.globalBestFitness),
}).start();