
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { countMasX, countX, countXmas, moveLeft, moveRight, moveUp, checkForWord } from './day4';

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
     // expect(checkForWord(data, { x: 2, y:1}, "XMAS", moveLeft)).toBe(false);
      expect(checkForWord(data, { x: 4, y:1}, "XMAS", moveLeft)).toBe(true);
      expect(checkForWord(data, { x: 5, y:1}, "XMAS", moveLeft)).toBe(false);

      expect(checkForWord(data, { x:4, y:1},  "XMAS", moveRight)).toBe(false);
      expect(checkForWord(data, { x:0, y:3},  "XMAS", moveRight)).toBe(true);
      expect(checkForWord(data, { x:1, y:3},  "XMAS", moveRight)).toBe(false);

      expect(checkForWord(data, { x:1, y:4}, "XMAS", moveUp)).toBe(true);
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
        expect(countX(data, 1, 1, "MAS")).toBe(1)
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