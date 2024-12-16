
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { createMaze, moveToEnd, part2 } from './day16';

describe('day 16', () => {

  test('Sample 1 - End', () => {
    const data = readTestData('./src/day16/input.sample.txt');
    const maze = createMaze(data);
    var min = moveToEnd(maze);
    expect(min).toBe(7036)
  })

  test('Sample 2 - End', () => {
    const data = readTestData('./src/day16/input.sample2.txt');
    const maze = createMaze(data);
    var min = moveToEnd(maze);
    expect(min).toBe(11048)
  })

  test('Sample 3 - End', () => {
    const data = readTestData('./src/day16/input.sample3.txt');
    const maze = createMaze(data);
    var min = moveToEnd(maze);
    expect(min).toBe(7036)
  })


  test('Part 1', () => {
    const data = readTestData('./src/day16/input.txt');
    const maze = createMaze(data);
    var min = moveToEnd(maze);
    expect(min).toBe(98520)
  })

  test('Part 2', () => {
    const data = readTestData('./src/day16/input.txt');
    const maze = createMaze(data);
    var min = part2(maze);
    expect(min).toBe(609)
  })
})