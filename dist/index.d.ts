export declare class Particle {
    bestPosition: number[];
    position: number[];
    velocity: number[];
    bestFitness: number;
    fitness: number;
}
interface Solution {
    globalBestPosition: number[];
    globalBestFitness: number;
}
interface Options {
    maxVelocity: number[];
    minVelocity: number[];
    maxPosition: number[];
    minPosition: number[];
    populationSize: number;
    numberOfDimensions: number;
    maxIterations: number;
    desiredFitness: number;
    desiredPrecision: number;
    randomFunction?: () => number;
    fitnessFunction: (position: number[]) => number;
    socialFactor: (iteration: number) => number;
    individualFactor: (iteration: number) => number;
    inertiaFactor: (iteration: number) => number;
    callbackFn?: (meta: {
        globalBestPosition: number[];
        globalBestFitness: number;
        iteration: number;
    }) => void;
}
declare class ParticleSwarmOptimizer {
    private readonly options;
    constructor(options: Options);
    start(): Solution | undefined;
    createAndEvaluatePopulation(): Particle[];
    getGlobalBestPositionAndFitness(population: Particle[]): {
        globalBestPosition: number[];
        globalBestFitness: number;
    };
    notifyListeners(payload: {
        iteration: number;
        globalBestFitness: number;
        globalBestPosition: number[];
        population: Particle[];
    }): void;
    isDesiredFitness(globalBestFitness: number): boolean;
    updatePopulation(population: Particle[], globalBestPosition: number[], iteration: number): void;
    createParticle(): Particle;
    evaluateParticle(particle: Particle): void;
    updateParticlePositionAndVelocity(particle: Particle, globalBestPosition: number[], iteration: number): void;
    updateParticleVelocity(meta: {
        velocity: number;
        iteration: number;
        particleBestPosition: number;
        globalBestPosition: number;
        currentPosition: number;
        minVelocity: number;
        maxVelocity: number;
    }): number;
    updateParticlePosition(meta: {
        position: number;
        velocity: number;
        minPosition: number;
        maxPosition: number;
    }): number;
}
declare const createOptimizer: (options: Options) => ParticleSwarmOptimizer;
export default createOptimizer;
export declare class Util {
    static getRandomArbitrary(min: number, max: number, randomFunction: () => number): number;
    static getValueFromRange(min: number, max: number, value: number): number;
}
