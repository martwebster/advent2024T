
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { countObstacles, getStartPos, move, calculateVisitedCells, parseMap, printMap } from './day6';


describe('day 6', () => {

    test('sample 1', () => {
      const data = readTestData('./src/day6/input.sample.txt');
      const map = parseMap(data);
      const startPos = getStartPos(map);
      var pos = move(map, startPos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      printMap(map)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      printMap(map)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      printMap(map)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      var pos = move(map, pos!)
      printMap(map)
    })

    test('sample 1 end', () => {
      const data = readTestData('./src/day6/input.sample.txt');
      const map = parseMap(data);
      const result = calculateVisitedCells(map)
      printMap(map)
      expect(result).toBe(41)
    })

    test('part1', () => {
      const data = readTestData('./src/day6/input.txt')
      const map = parseMap(data);
      const result = calculateVisitedCells(map)
      printMap(map)
      expect(result).toBe(4826)
    })

  test('obstacle 1', () => {
    const data = readTestData('./src/day6/input.sample.txt');
    const map = parseMap(data);
    map[6][3].obstruction = true;
    printMap(map)
    const end = calculateVisitedCells(map)
    expect(end).toBeUndefined()
    printMap(map)
  })

  test('obstacle 2', () => {
    const data = readTestData('./src/day6/input.sample.txt');
    const map = parseMap(data);
    map[7][6].obstruction = true;
    printMap(map)
    const end = calculateVisitedCells(map)
    expect(end).toBeUndefined()
    printMap(map)
  })

  test('obstacle 3', () => {
    const data = readTestData('./src/day6/input.sample.txt');
    const map = parseMap(data);
    map[7][7].obstruction = true;
    printMap(map)
    const end = calculateVisitedCells(map)
    expect(end).toBeUndefined()
    printMap(map)
  })

  test('obstacle 4', () => {
    const data = readTestData('./src/day6/input.sample.txt');
    const map = parseMap(data);
    map[8][1].obstruction = true;
    printMap(map)
    const end = calculateVisitedCells(map)
    expect(end).toBeUndefined()
    printMap(map)
  })

  test('obstacle 5', () => {
    const data = readTestData('./src/day6/input.sample.txt');
    const map = parseMap(data);
    map[8][3].obstruction = true;
    printMap(map)
    const end = calculateVisitedCells(map)
    expect(end).toBeUndefined()
    printMap(map)
  })
  test('obstacle 6', () => {
    const data = readTestData('./src/day6/input.sample.txt');
    const map = parseMap(data);
    map[9][7].obstruction = true;
    printMap(map)
    const end = calculateVisitedCells(map)
    expect(end).toBeUndefined()
    printMap(map)
  })

  test('count obstacles 6', () => {
    const data = readTestData('./src/day6/input.sample.txt');
    expect(countObstacles(data)).toBe(6)
  })

  test('part2', () => {
    const data = readTestData('./src/day6/input.txt')
    expect(countObstacles(data)).toBe(1721)
  })


})