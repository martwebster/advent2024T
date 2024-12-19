
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { countDesigns, designTowel, sumDesigns } from './day19';

describe('day 19', () => {
  
   test('Sample 1', () => {
     const data = readTestData('./src/day19/input.sample.txt');

     const towels = data[0].split(", ")
     const designs = data.split("")[1]
     
    expect(designTowel(designs[0], towels)).toBe(2)
    expect(designTowel(designs[1], towels)).toBe(1)
    expect(designTowel(designs[2], towels)).toBe(4)
    expect(designTowel(designs[3], towels)).toBe(6)
    expect(designTowel(designs[4], towels)).toBe(0)

     expect (countDesigns( designs, towels)).toBe(6)
     expect (sumDesigns( designs, towels)).toBe(16)
   })

    test('Part 1', () => {
      const data = readTestData('./src/day19/input.txt');

      const towels = data[0].split(", ")
      const designs = data.split("")[1]
      expect (countDesigns( designs, towels)).toBe(278)
    })

    test('Part 2', () => {
      const data = readTestData('./src/day19/input.txt');

      const towels = data[0].split(", ")
      const designs = data.split("")[1]
      expect (sumDesigns( designs, towels)).toBe(569808947758890)
    })

  
  })