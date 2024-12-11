
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { buildMap, countTrails, getStartPositions, part2 } from './day10';


describe('day 10', () => {

  test('sample', () => {
    const data = readTestData('./src/day10/input.sample.txt');
    expect (countTrails(data)).toBe(1)
  })

  test('sample 2', () => {
    const data = readTestData('./src/day10/input.sample2.txt');
    expect (countTrails(data)).toBe(36)
  })
  
  test('part1', () => {
    const data = readTestData('./src/day10/input.txt');
    expect (countTrails(data)).toBe(496)
  })
  
  test('sample 2', () => {
    const data = readTestData('./src/day10/input.sample2.txt');
    expect (part2(data)).toBe(81)
  })

  test('part2', () => { 
    const data = readTestData('./src/day10/input.txt');
    expect (part2(data)).toBe(1120)

   })
})