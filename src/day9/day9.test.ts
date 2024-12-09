
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { calculateCheckSum, defrag, parseLine, part1, part2 } from './day9';



describe('day 9', () => {

  test('sample', () => {
    expect(part1("2333133121414131402")).toBe(1928)
  })
  
  test('part1', () => {
    const data = readTestData('./src/day9/input.txt')      
    expect(part1(data[0])).toBe(6471961544878)
  })
  
  test('part2 - sample 2', () => {
    expect(calculateCheckSum("00992111777.44.333....5555.6666.....8888..".split(""))).toBe(2858)
    expect(part2("2333133121414131402")).toBe(2858)

  })

  test('part2', () => {
    const data = readTestData('./src/day9/input.txt')      
    expect(part2(data[0])).toBe(6511178035564)
  })
})