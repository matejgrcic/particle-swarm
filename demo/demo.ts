import { Particle } from '../src/index';
import { createRastringOptimizer } from './rastring_optimization';

const loggerFunction = (meta: {
    globalBestPosition: number[],
    globalBestFitness: number,
    iteration: number,
    population: Particle[]
}) =>
    console.log({
        globalBestPosition: meta.globalBestPosition,
        globalBestFitness: meta.globalBestFitness,
        iteration: meta.iteration
    });

const solution = createRastringOptimizer(loggerFunction).start();
console.log(solution);
