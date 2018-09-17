'use strict';
var expect = require('chai').expect;
var createOptimizer = require('../dist/index.js').default;
describe('createOptimizer()', () => {
    it('should create optimizer', () => {
        expect(() => createOptimizer({
            maxVelocity:[2.05, 2.05],
            minVelocity: [-2.05, -2.05],
            maxPosition: [5.12, 5.12],
            minPosition: [-5.12, -5.12],
            populationSize: 30,
            numberOfDimensions: 2,
            maxIterations: 50,
            desiredFitness: 0,
            desiredPrecision: 1E-3,
            fitnessFunction: (x) => x[0],
            inertiaFactor: () => 1.,
            socialFactor: () => 2.,
            individualFactor: () => 2.,
        })).not.to.throw;
    });
    it('should start optimizer', () => {
        expect(() => createOptimizer({
            maxVelocity:[2.05, 2.05],
            minVelocity: [-2.05, -2.05],
            maxPosition: [5.12, 5.12],
            minPosition: [-5.12, -5.12],
            populationSize: 30,
            numberOfDimensions: 2,
            maxIterations: 50,
            desiredFitness: 0,
            desiredPrecision: 1E-3,
            fitnessFunction: (x) => x[0],
            inertiaFactor: () => 1.,
            socialFactor: () => 2.,
            individualFactor: () => 2.,
        }).start()).not.to.throw;
    });
});