var createOptimizer = require('../dist/index.js').default;

var solution = createOptimizer({
    maxVelocity:[4.05],
    minVelocity: [-4.05],
    maxPosition: [10.],
    minPosition: [-10.],
    populationSize: 30,
    numberOfDimensions: 1,
    maxIterations: 50,
    fitnessFunction: (x) => x*x,
}).start();

console.log(solution);

