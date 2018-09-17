import { expect } from 'chai';
import 'chai/register-should';
import createOptimizer from '../src/index';

const defaultMeta = {
    maxVelocity:[2., 2.],
    minVelocity: [-2, -2],
    maxPosition: [5.12, 5.12],
    minPosition: [-5.12, -5.12],
    populationSize: 1,
    numberOfDimensions: 2,
    maxIterations: 2,
    desiredFitness: 0,
    desiredPrecision: 1E-3,
    fitnessFunction: () => 0,
    socialFactor: () => 2.,
    individualFactor: () => 2.,
    inertiaFactor: () => 1.,
    randomFunction: () => 1.,
};

describe('ParticleSwarmOptimization', () => {
    describe('createParticle()', () => {
        it('should create particle with position of max position', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            expect(particle.position).to.deep.equal([5.12, 5.12]);
        });

        it('should create particle with velocity of max velocity', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            expect(particle.velocity).to.deep.equal([2, 2]);
        });
    });

    describe('evaluateParticle()', () => {
        it('should evaluate particle with position of max position', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            algorithm.evaluateParticle(particle);
            expect(particle.bestPosition).to.deep.equal([5.12, 5.12]);
        });

        it('should evaluate particle with fitness of 0', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            algorithm.evaluateParticle(particle);
            expect(particle.fitness).to.be.equal(0);
        });

        it('should evaluate particle with bestFitness of 0', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            algorithm.evaluateParticle(particle);
            expect(particle.bestFitness).to.be.equal(0);
        });

        it('should evaluate particle with best position of maxPosition', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            algorithm.evaluateParticle(particle);
            expect(particle.bestPosition).to.deep.equal([5.12, 5.12]);
        });

        it('should not update best fitness if fitness is greater than particle\'s bestFitness', () => {
            const algorithm = createOptimizer({ ...defaultMeta, fitnessFunction: () => 2 });
            const particle = algorithm.createParticle();
            particle.bestFitness = 0;
            algorithm.evaluateParticle(particle);
            expect(particle.bestFitness).to.be.equal(0);
        });

        it('should update best fitness if fitness is lower than particle\'s bestFitness', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            particle.bestFitness = 25;
            algorithm.evaluateParticle(particle);
            expect(particle.bestFitness).to.be.equal(0);
        });

        it('should update best position if fitness is lower than particle\'s bestFitness', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            particle.bestFitness = 5;
            particle.position = [0, 0];
            algorithm.evaluateParticle(particle);
            expect(particle.bestPosition).to.deep.equal([0, 0]);
        });

        it('should not update best position if fitness is greater than particle\'s bestFitness', () => {
            const algorithm = createOptimizer({ ...defaultMeta, fitnessFunction: () => 25 });
            const particle = algorithm.createParticle();
            particle.bestFitness = 5;
            particle.bestPosition = [0, 0];
            algorithm.evaluateParticle(particle);
            expect(particle.bestPosition).to.deep.equal([0, 0]);
        });
    });

    describe('getGlobalBestPositionAndFitness()', () => {
        it('should return best global position and fitness', () => {
            const algorithm = createOptimizer({ ...defaultMeta, populationSize: 3, fitnessFunction: () => 3 });
            const population = algorithm.createAndEvaluatePopulation();
            population[2].bestFitness = 0;
            population[2].bestPosition = [1, 2];
            const { globalBestPosition, globalBestFitness } = algorithm.getGlobalBestPositionAndFitness(population);
            expect(globalBestPosition).to.deep.equal([1, 2]);
            expect(globalBestFitness).to.be.equal(0);
        });

        it('should throw exception when population size is 0', () => {
            const algorithm = createOptimizer({ ...defaultMeta, populationSize: 0 });
            const population = algorithm.createAndEvaluatePopulation();
            expect(() => algorithm.getGlobalBestPositionAndFitness(population)).to.throw('Population size is 0!');
        });
    });

    describe('isDesiredFitness()', () => {
        it('should return true if fitness is lower than desired fitness', () => {
            const algorithm = createOptimizer(defaultMeta);
            expect(algorithm.isDesiredFitness(0)).to.be.true;
        });

        it('should return false if fitness is greater than desired fitness', () => {
            const algorithm = createOptimizer(defaultMeta);
            expect(algorithm.isDesiredFitness(15)).to.be.false;
        });
    });

    describe('updateParticlePositionAndVelocity()', () => {
        it('velocity should stay in range of [minVelocity, maxVelocity]', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            algorithm.evaluateParticle(particle);
            algorithm.updateParticlePositionAndVelocity(particle, [100, 10], 1);
            expect(particle.velocity).to.deep.equal([2, 2]);
        });

        it('position should stay in range of [minVelocity, maxVelocity]', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            algorithm.evaluateParticle(particle);
            particle.position = [-5.12, -5.12];
            algorithm.updateParticlePositionAndVelocity(particle, [-100, -100], 1);
            expect(particle.position).to.deep.equal([-5.12, -5.12]);
        });

        it('position and speed should be updated correctly', () => {
            const algorithm = createOptimizer(defaultMeta);
            const particle = algorithm.createParticle();
            algorithm.evaluateParticle(particle);
            algorithm.updateParticlePositionAndVelocity(particle, [0, 0], 1);
            expect(particle.position).to.deep.equal([3.12, 3.12]);
            expect(particle.velocity).to.deep.equal([-2, -2]);
        });
    });
});
