export class Particle {
    bestPosition: number[] = [];
    position: number[] = [];
    velocity: number[] = [];
    bestFitness: number = Number.MAX_VALUE;
    fitness: number = Number.MAX_VALUE;
}

interface Solution {
    globalBestPosition: number[];
    globalBestFitness: number;
}

interface Options {
    useConstrictionFactor?: boolean;
    maxVelocity: number[];
    minVelocity: number[];
    maxPosition: number[];
    minPosition: number[];
    populationSize: number;
    numberOfDimensions: number;
    maxIterations: number;
    fitnessFunction: (position: number[]) => number;
    desiredFitness?: number;
    desiredPrecision?: number;
    randomFunction?: () => number;
    socialFactor?: (iteration: number) => number;
    individualFactor?: (iteration: number) => number;
    inertiaFactor?: (iteration: number) => number;
    callbackFn?: (meta: IterationMeta) => void;
}

interface IterationMeta {
    globalBestPosition: number[];
    globalBestFitness: number;
    iteration: number;
    population: Particle[];
}

const defaultOptions = {
    useConstrictionFactor: false,
    randomFunction: Math.random,
    socialFactor: () => 2.05,
    individualFactor: () => 2.05,
    inertiaFactor: () => 1.,
    desiredFitness: 0.,
    desiredPrecision: 1E-5,
    callbackFn: () => {},
};

class ParticleSwarmOptimizer {

    private readonly options: Options;

    constructor(options: Options) {
        this.options = { ...defaultOptions, ...options };
    }

    start(): Solution | undefined {
        const population = this.createAndEvaluatePopulation();
        let solution: Solution | undefined = undefined;
        for (let iteration = 1; iteration <= this.options.maxIterations; iteration += 1) {
            solution = this.getGlobalBestPositionAndFitness(population);

            this.notifyListeners({
                ...solution,
                iteration,
                population: [...population],
            });
            if (this.isDesiredFitness(solution.globalBestFitness)) {
                return solution;
            }

            this.updatePopulation(population, solution.globalBestPosition, iteration);
        }

        return solution;
    }

    createAndEvaluatePopulation(): Particle[] {
        const population = [];
        for (let i = 0; i < this.options.populationSize; i += 1) {
            const particle = this.createParticle();
            this.evaluateParticle(particle);
            population.push(particle);
        }
        return population;
    }

    getGlobalBestPositionAndFitness(population: Particle[]): { globalBestPosition: number[], globalBestFitness: number} {
        if (!population.length) {
            throw new Error('Population size is 0!');
        }
        const particle = Util.minBy(population, 'bestFitness');
        return { globalBestPosition: particle!.bestPosition, globalBestFitness: particle!.bestFitness };
    }

    notifyListeners(meta: IterationMeta): void {
        if (!this.options.callbackFn) {
            return;
        }
        this.options.callbackFn(meta);
    }

    isDesiredFitness(globalBestFitness: number): boolean {
        return Math.abs(this.options.desiredFitness! - globalBestFitness) < this.options.desiredPrecision!;
    }

    updatePopulation(population: Particle[], globalBestPosition: number[], iteration: number) {
        population.forEach((particle) => {
            this.updateParticlePositionAndVelocity(particle, globalBestPosition, iteration);
            this.evaluateParticle(particle);
        });
    }

    createParticle(): Particle {
        const particle = new Particle();
        for (let j = 0; j < this.options.numberOfDimensions; j += 1) {
            particle.position.push(
                Util.getRandomArbitrary(
                    this.options.minPosition[j],
                    this.options.maxPosition[j],
                    this.options.randomFunction!
                )
            );
            particle.velocity.push(
                Util.getRandomArbitrary(
                    this.options.minVelocity[j],
                    this.options.maxVelocity[j],
                    this.options.randomFunction!
                )
            );
        }
        return particle;
    }

    evaluateParticle(particle: Particle): void {
        particle.fitness = this.options.fitnessFunction(particle.position);
        if (particle.fitness < particle.bestFitness) {
            particle.bestPosition = [...particle.position];
            particle.bestFitness = particle.fitness;
        }
    }

    updateParticlePositionAndVelocity(particle: Particle, globalBestPosition: number[], iteration: number): void {
        for (let i = 0; i < this.options.numberOfDimensions; i += 1) {
            particle.velocity[i] = this.updateParticleVelocity({
                iteration,
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
    }

    updateParticleVelocity(
        meta: {
            velocity: number,
            iteration: number,
            particleBestPosition: number,
            globalBestPosition: number,
            currentPosition: number,
            minVelocity: number,
            maxVelocity: number,
        }
    ): number {
        let newVelocity = this.options.inertiaFactor!(meta.iteration) * meta.velocity
            + this.options.individualFactor!(meta.iteration)
                * this.options.randomFunction!() * (meta.particleBestPosition - meta.currentPosition)
            + this.options.socialFactor!(meta.iteration)
                * this.options.randomFunction!() * (meta.globalBestPosition - meta.currentPosition);
        newVelocity = Util.getValueFromRange(
            meta.minVelocity,
            meta.maxVelocity,
            newVelocity
        );
        return newVelocity * this.constrictionFactor(
            this.options.individualFactor!(meta.iteration),
            this.options.socialFactor!(meta.iteration)
        );
    }

    updateParticlePosition(meta: {
        position: number,
        velocity: number,
        minPosition: number,
        maxPosition: number
    }): number {
        return Util.getValueFromRange(
            meta.minPosition,
            meta.maxPosition,
            meta.position + meta.velocity
        );
    }

    constrictionFactor(individualFactor: number, socialFactor: number): number {
        if (!this.options.useConstrictionFactor) {
            return 1.;
        }
        return Util.constrictionFactor(individualFactor, socialFactor);
    }
}

const createOptimizer = (options: Options) => new ParticleSwarmOptimizer(options);

export default createOptimizer;

export class Util {
    static MIN_CONSTRICTION_FACTOR = 4.;

    static getRandomArbitrary(min: number, max: number, randomFunction: () => number) {
        return randomFunction() * (max - min) + min;
    }

    static getValueFromRange(min: number, max: number, value: number): number {
        if (value < min) {
            return min;
        }
        if (value > max) {
            return max;
        }
        return value;
    }

    static minBy<T>(items: T[], key: string): T | undefined {
        if (!items.length) {
            return undefined;
        }
        let min = items[0];
        items.forEach((item) => min = (item as any)[key] < (min as any)[key] ? item : min);
        return min;
    }

    static constrictionFactor(individualFactor: number, socialFactor: number) {
        const constrictionFactor = individualFactor + socialFactor;
        if (constrictionFactor <= Util.MIN_CONSTRICTION_FACTOR) {
            throw new Error(
        // tslint:disable-next-line
                `constrictionFactor (sum of individual and social factor) should be greater than ${Util.MIN_CONSTRICTION_FACTOR}, current is: ${constrictionFactor}`);
        }
        return 2. / Math.abs(
            2. - constrictionFactor - Math.sqrt(constrictionFactor * constrictionFactor - 4 * constrictionFactor)
        );
    }
}
