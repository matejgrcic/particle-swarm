"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Particle = /** @class */ (function () {
    function Particle() {
        this.bestPosition = [];
        this.position = [];
        this.velocity = [];
        this.bestFitness = Number.MAX_VALUE;
        this.fitness = Number.MAX_VALUE;
    }
    return Particle;
}());
exports.Particle = Particle;
var defaultOptions = {
    useConstrictionFactor: false,
    randomFunction: Math.random,
    callbackFn: function () { },
};
var ParticleSwarmOptimizer = /** @class */ (function () {
    function ParticleSwarmOptimizer(options) {
        this.options = __assign({}, defaultOptions, options);
    }
    ParticleSwarmOptimizer.prototype.start = function () {
        var population = this.createAndEvaluatePopulation();
        var solution = undefined;
        for (var iteration = 1; iteration <= this.options.maxIterations; iteration += 1) {
            solution = this.getGlobalBestPositionAndFitness(population);
            this.notifyListeners(__assign({}, solution, { iteration: iteration, population: population.slice() }));
            if (this.isDesiredFitness(solution.globalBestFitness)) {
                return solution;
            }
            this.updatePopulation(population, solution.globalBestPosition, iteration);
        }
        return solution;
    };
    ParticleSwarmOptimizer.prototype.createAndEvaluatePopulation = function () {
        var population = [];
        for (var i = 0; i < this.options.populationSize; i += 1) {
            var particle = this.createParticle();
            this.evaluateParticle(particle);
            population.push(particle);
        }
        return population;
    };
    ParticleSwarmOptimizer.prototype.getGlobalBestPositionAndFitness = function (population) {
        if (!population.length) {
            throw new Error('Population size is 0!');
        }
        var particle = Util.minBy(population, 'bestFitness');
        return { globalBestPosition: particle.bestPosition, globalBestFitness: particle.bestFitness };
    };
    ParticleSwarmOptimizer.prototype.notifyListeners = function (payload) {
        if (!this.options.callbackFn) {
            return;
        }
        this.options.callbackFn(payload);
    };
    ParticleSwarmOptimizer.prototype.isDesiredFitness = function (globalBestFitness) {
        return Math.abs(this.options.desiredFitness - globalBestFitness) < this.options.desiredPrecision;
    };
    ParticleSwarmOptimizer.prototype.updatePopulation = function (population, globalBestPosition, iteration) {
        var _this = this;
        population.forEach(function (particle) {
            _this.updateParticlePositionAndVelocity(particle, globalBestPosition, iteration);
            _this.evaluateParticle(particle);
        });
    };
    ParticleSwarmOptimizer.prototype.createParticle = function () {
        var particle = new Particle();
        for (var j = 0; j < this.options.numberOfDimensions; j += 1) {
            particle.position.push(Util.getRandomArbitrary(this.options.minPosition[j], this.options.maxPosition[j], this.options.randomFunction));
            particle.velocity.push(Util.getRandomArbitrary(this.options.minVelocity[j], this.options.maxVelocity[j], this.options.randomFunction));
        }
        return particle;
    };
    ParticleSwarmOptimizer.prototype.evaluateParticle = function (particle) {
        particle.fitness = this.options.fitnessFunction(particle.position);
        if (particle.fitness < particle.bestFitness) {
            particle.bestPosition = particle.position.slice();
            particle.bestFitness = particle.fitness;
        }
    };
    ParticleSwarmOptimizer.prototype.updateParticlePositionAndVelocity = function (particle, globalBestPosition, iteration) {
        for (var i = 0; i < this.options.numberOfDimensions; i += 1) {
            particle.velocity[i] = this.updateParticleVelocity({
                iteration: iteration,
                velocity: particle.velocity[i],
                particleBestPosition: particle.bestPosition[i],
                globalBestPosition: globalBestPosition[i],
                currentPosition: particle.position[i],
                minVelocity: this.options.minVelocity[i],
                maxVelocity: this.options.maxVelocity[i],
            });
            particle.position[i] = this.updateParticlePosition({
                position: particle.position[i],
                velocity: particle.velocity[i],
                minPosition: this.options.minPosition[i],
                maxPosition: this.options.maxPosition[i],
            });
        }
    };
    ParticleSwarmOptimizer.prototype.updateParticleVelocity = function (meta) {
        var newVelocity = this.options.inertiaFactor(meta.iteration) * meta.velocity
            + this.options.individualFactor(meta.iteration)
                * this.options.randomFunction() * (meta.particleBestPosition - meta.currentPosition)
            + this.options.socialFactor(meta.iteration)
                * this.options.randomFunction() * (meta.globalBestPosition - meta.currentPosition);
        newVelocity = Util.getValueFromRange(meta.minVelocity, meta.maxVelocity, newVelocity);
        return newVelocity * this.constrictionFactor(this.options.individualFactor(meta.iteration), this.options.socialFactor(meta.iteration));
    };
    ParticleSwarmOptimizer.prototype.updateParticlePosition = function (meta) {
        return Util.getValueFromRange(meta.minPosition, meta.maxPosition, meta.position + meta.velocity);
    };
    ParticleSwarmOptimizer.prototype.constrictionFactor = function (individualFactor, socialFactor) {
        if (!this.options.useConstrictionFactor) {
            return 1.;
        }
        return Util.constrictionFactor(individualFactor, socialFactor);
    };
    return ParticleSwarmOptimizer;
}());
var createOptimizer = function (options) { return new ParticleSwarmOptimizer(options); };
exports.default = createOptimizer;
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.getRandomArbitrary = function (min, max, randomFunction) {
        return randomFunction() * (max - min) + min;
    };
    Util.getValueFromRange = function (min, max, value) {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    };
    Util.minBy = function (items, key) {
        if (!items.length) {
            return undefined;
        }
        var min = items[0];
        items.forEach(function (item) { return min = item[key] < min[key] ? item : min; });
        return min;
    };
    Util.constrictionFactor = function (individualFactor, socialFactor) {
        var constrictionFactor = individualFactor + socialFactor;
        if (constrictionFactor <= Util.MIN_CONSTRICTION_FACTOR) {
            throw new Error("constrictionFactor (sum of individual and social factor)\n                 should be greater than " + Util.MIN_CONSTRICTION_FACTOR + ", current is: " + constrictionFactor);
        }
        return 2. / Math.abs(2. - constrictionFactor - Math.sqrt(constrictionFactor * constrictionFactor - 4 * constrictionFactor));
    };
    Util.MIN_CONSTRICTION_FACTOR = 4;
    return Util;
}());
exports.Util = Util;
