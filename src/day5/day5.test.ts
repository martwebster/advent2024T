
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { countMasX, countX, countXmas, moveLeft, moveRight, moveUp, checkForWord } from './day5';

extensions.apply();

describe('day 5', () => {

    test('sample 1', () => {
      const data = [
          "..X...",
          ".SAMX.",
          ".A..A.",
          "XMAS.S",
          ".X....",
      ]
      expect(countXmas(data)).toBe(4)
    })

    test('part1', () => {
         const data = readTestData('./src/day5/input.txt');
         expect(countXmas(data)).toBe(2551)
    })

     test('part2', () => {
        const data = readTestData('./src/day5/input.txt');
   })
})