import { expect } from 'chai';
import 'chai/register-should';
import { Util } from '../src/index';

describe('Util', () => {
    describe('getRandomArbitrary()', () => {
        it('should return min value if random function returns 0', () => {
            const value = Util.getRandomArbitrary(-1, 1, () => 0);
            expect(value).to.be.equal(-1);
        });

        it('should return max value if random function returns 1', () => {
            const value = Util.getRandomArbitrary(-1, 1, () => 1);
            expect(value).to.be.equal(1);
        });

        it('should return random value if random function is given', () => {
            const value = Util.getRandomArbitrary(-1, 1, Math.random);
            expect(value).to.be.lessThan(1.00000000001);
            expect(value).to.be.greaterThan(-1);
        });
    });

    describe('getValueFromRange()', () => {
        it('should return lower bound if given value is lower than lower bound', () => {
            const value = Util.getValueFromRange(-1, 1, -5);
            expect(value).to.be.equal(-1);
        });

        it('should return upper bound if given value is greater than upper bound', () => {
            const value = Util.getValueFromRange(-1, 1, 5);
            expect(value).to.be.equal(1);
        });

        it('should return given value if given value is in range', () => {
            const value = Util.getValueFromRange(-1, 1, 0);
            expect(value).to.be.equal(0);
        });
    });

    describe('minBy()', () => {
        it('should return correct value', () => {
            const array = [
                { a: 2 },
                { a: 3 },
                { a: 1 },
                { a: 5 },
            ];
            expect(Util.minBy(array, 'a')).to.be.deep.equal({ a: 1 });
        });

        it('should return undefined for empty array', () => {
            const array: any = [];
            expect(Util.minBy(array, 'a')).to.be.undefined;
        });
    });

    describe('constrictionFactor()', () => {
        it('should calculate correct constriction factor', () => {
            expect(Util.constrictionFactor(2.05, 2.05)).to.be.within(0.729, 0.73);
        });

        it('should throw for constriction factor lower than MIN_PSI', () => {
            expect(() => Util.constrictionFactor(1., 2.05)).to.throw;
        });
    });
});
