# Particle-swarm.js
Particle-swarm.js is a javascript implementation of a fully-informed particle swarm optimization algorithm.
![Image](https://github.com/matejgrcic/particle-swarm/blob/master/static/Logo_full.svg?sanitize=true)
## Installing

With npm:

```
npm install --save particle-swarm
```

With yarn:

```
yarn add particle-swarm
```

## Basic usage

```javascript
var createOptimizer = require('particle-swarm').default;

var optimizer = createOptimizer({
    maxVelocity:[4.05],
    minVelocity: [-4.05],
    maxPosition: [10.],
    minPosition: [-10.],
    populationSize: 30,
    numberOfDimensions: 1,
    maxIterations: 50,
    fitnessFunction: (x) => x*x,
});

var solution = optimizer.start();
```


## Complex usage

```javascript
import createOptimizer from 'particle-swarm';

const optimizer = createOptimizer({
    useConstrictionFactor: true,
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
    socialFactor: (iteration) => 2.05,
    individualFactor: (iteration) => 2.05,
    inertiaFactor: (iteration) => 1.,
    callbackFn: (meta) => console.log(meta.globalBestFitness),
});

const solution = optimizer.start();
```

## Parameters

### Required parameters

* ```maxVelocity``` - max velocity of particle for each dimension
* ```minVelocity``` - min velocity of particle for each dimension
* ```maxPosition``` - max position of particle for each dimension
* ```maxPosition``` - min position of particle for each dimension
* ```populationSize``` - size of population, must be greater than zero
* ```numberOfDimensions``` - number of dimensions, must be greater than zero
* ```maxIterations``` - max number of iterations, must be greater than zero
* ```fitnessFunction``` - function that evaluates each particle, algorithm is searching for position that gives smallest value of this function


### Optional parameters

* ```useConstrictionFactor``` - constriction factor prevents divergence of algorithm, false by default
* ```randomFunction``` - function that returns random number from interval [0, 1], Math.random by default
* ```desiredFitness``` - desired fitness algorithm should achieve, 0 by default
* ```desiredPrecision``` - desired precision when comparing desired fitness and global best fitness, 1E-5 by default
* ```socialFactor``` - function that calculates social factor for each iteration, 2.05 by default
* ```individualFactor``` - function that calculates individual factor for each iteration, 2.05 by default
* ```inertiaFactor``` - function that calculates individual factor for each iteration, 1 by default
* ```callbackFn``` - function that is called after each iteration, can be used as a observer

### Tips

* Parameters _maxVelocity_, _minVelocity_, _maxPosition_ and _maxPosition_ must be arrays of length _numberOfDimensions_
* Parameters _socialFactor_ and _individualFactor_ should return value of 2.05
* Parameter _inertiaFactor_ should have value of 1 in first iteration and decline in each iteration
* Set _useConstrictionFactor_ to true if you want to prevent divergence of algorithm
* Velocity should be between 10 and 20 percent of space that is searched (e.g. searched space: [-10, 10], velocity: [-4,4])

**Note:** Please see _finding global minimum of Rastring function_ example in demo file.

## Authors

* **_Matej Grcic_** - [Github](https://github.com/matejgrcic) [LinkedIn](https://www.linkedin.com/in/matej-grcic/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

