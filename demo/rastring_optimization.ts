import { reduce as _reduce } from 'lodash';
import createOptimizer from '../src/index';

const RASTRING_PARAMS = {
    A: 10,
    n: 2,
};

const MAX_ITER = 50;
const INERTIA_MIN_FACTOR = 0.5;
const INERTIA_MAX_FACTOR = 1.;

const rastringFunction = (position: number[]): number => {
    return _reduce(
        position,
        (sum, x) => sum + Math.pow(x, 2) - RASTRING_PARAMS.A * Math.cos(2. * Math.PI * x),
        RASTRING_PARAMS.A * RASTRING_PARAMS.n
    );
};

const inertiaFactor = (iteration: number): number => {
    if (iteration < MAX_ITER / 2) {
        return (iteration / MAX_ITER) * (INERTIA_MIN_FACTOR - INERTIA_MAX_FACTOR) + INERTIA_MAX_FACTOR;
    }
    return INERTIA_MIN_FACTOR;
};

export const createRastringOptimizer = (callbackFn?: any): any => createOptimizer({
    callbackFn,
    inertiaFactor,
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
    socialFactor: () => 2.,
    individualFactor: () => 2.,
});
