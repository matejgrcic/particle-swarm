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
* ```minPosition``` - min position of particle by each dimension
* ```populationSize``` - size of population, should be greater than zero
* ```numberOfDimensions``` - number of dimensions, should be greater than zero
* ```maxIterations``` - max number of iterations, should be greater than zero
* ```desiredFitness``` - desired fitness algorithm should achieve
* ```desiredPrecision``` - desired precision when comparing desired fitness and global best fitness
* ```fitnessFunction``` - function that evaluates each particle, algorithm is searching for smallest value of this function
* ```socialFactor``` - function that calculates social factor in each iteration
* ```individualFactor``` - function that calculates individual factor in each iteration
* ```inertiaFactor``` - function that calculates individual factor in each iteration

#### Optional parameters

* ```useConstrictionFactor``` - constriction factor prevents algorithm divergence, default to false
* ```randomFunction``` - function that creates returns random number from interval [0 ,1], default to Math.random
* ```callbackFn``` - function that is called after each iteration, can be used as a observer

## Authors

* **_Matej Grcic_** - [github](https://github.com/matejgrcic) [LinkedIn](https://www.linkedin.com/in/matej-grcic/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

