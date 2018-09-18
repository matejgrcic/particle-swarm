# Particle-swarm.js

Particle-swarm.js is a javascript implementation of a fully-informed particle swarm optimization algorithm.

## Installing

With npm:

```
npm install --save particle-swarm
```

With yarn:

```
yarn add particle-swarm
```

## Usage

```  
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
    socialFactor: (iteration) => 2.,
    individualFactor: (iteration) => 2.,
    inertiaFactor: (iteration) => 1.,
    callbackFn: (meta) => console.log(meta.globalBestFitness),
});

const solution = optimizer.start();
```

### Parameters

#### Required parameters

* ```maxVelocity``` - max velocity of particle by each dimension
* ```minVelocity``` - min velocity of particle by each dimension
* ```maxPosition``` - max position of particle by each dimension
* ```maxPosition``` - min position of particle by each dimension
* ```populationSize``` - size of population, should be greater than zero
* ```numberOfDimensions``` - number of dimensions, should be greater than zero
* ```maxIterations``` - max number of iterations, should be greater than zero
* ```desiredFitness``` - desired fitness algorithm should achieve
* ```desiredPrecision``` - desired precision when comparing desired fitness and global best fitness
* ```fitnessFunction``` - function that evaluates each particle, algorithm is searching for position that gives smallest value of this function
* ```socialFactor``` - function that calculates social factor for each iteration
* ```individualFactor``` - function that calculates individual factor for each iteration
* ```inertiaFactor``` - function that calculates individual factor for each iteration

#### Optional parameters

* ```useConstrictionFactor``` - constriction factor prevents divergence of algorithm, default to false
* ```randomFunction``` - function that creates returns random number from interval [0 ,1], default to Math.random
* ```callbackFn``` - function that is called after each iteration, can be used as a observer

### Tips

* Parameters _maxVelocity_, _minVelocity_, _maxPosition_ and _maxPosition_ should be arrays of length _numberOfDimensions_
* Parameters _socialFactor_ and _individualFactor_ should return value of 2.05, 
* Parameter _inertiaFactor_ should have value of 1 in first iteration and decline in each iteration
* Set _useConstrictionFactor_ to true if you want to prevent divergence of algorithm

**Note:** Please see demo Rastring function example in demo file.

## Authors

* **_Matej Grcic_** - [github](https://github.com/matejgrcic) [LinkedIn](https://www.linkedin.com/in/matej-grcic/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

