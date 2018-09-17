# Particle-swarm.js

Particle-swarm.js is a javascript implementation of a fully-informed particle swarm optimization algorithm.

## Installing

With npm:

```
npm install --save particle-swarm
```

With yarn

```
yarn add  particle-swarm
```

## Usage

```  
import createOptimizer from 'particle-swarm';

const optimizer = createOptimizer({
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


## Authors

* **Matej Grcic** - [github](https://github.com/matejgrcic)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

