
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { countMasX, countX, countXmas, isLeft, isRight, isUp } from './day4';

extensions.apply();

describe('day 4', () => {

    test('sample 1', () => {
      const data = [
          "..X...",
          ".SAMX.",
          ".A..A.",
          "XMAS.S",
          ".X....",
      ]
      expect(isLeft(data, 2, 1)).toBe(false);
      expect(isLeft(data, 4, 1)).toBe(true);
      expect(isLeft(data, 5, 1)).toBe(false);

      expect(isRight(data, 4, 1)).toBe(false);
      expect(isRight(data, 0, 3)).toBe(true);
      expect(isRight(data, 1, 3)).toBe(false);

      expect(isUp(data, 1, 4)).toBe(true);
      expect(countXmas(data)).toBe(4)
    })

    test('sample 2', () => {
      const data = readTestData('./src/day4/input.sample.txt');
      expect(countXmas(data)).toBe(18)
    })

    test('part1', () => {
         const data = readTestData('./src/day4/input.txt');
         expect(countXmas(data)).toBe(2551)
    })

    test('sample part 2', () => {
      const data = [
        "M.S",
        ".A.",
        "M.S"]
        expect(countX(data, 1, 1)).toBe(1)
        expect(countMasX(data)).toBe(1)
      })

    test('sample part 22', () => {
      const data = readTestData('./src/day4/input.sample.txt');
      expect(countMasX(data)).toBe(9)
    })

     test('part2', () => {
        const data = readTestData('./src/day4/input.txt');
        expect(countMasX(data)).toBe(1985)
   })
})