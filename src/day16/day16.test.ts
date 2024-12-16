
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { createMaze, getStart, move, moveRoutes, moveToEnd } from './day16';

describe('day 16', () => {
  test('Sample 1', () => {
    const data = readTestData('./src/day16/input.sample.txt');
    const maze = createMaze(data);
    const start = getStart(maze);
    expect (start.positon).toStrictEqual({
      x:1,
      y: 13
    })
    var next = moveRoutes(maze, [start])
    expect (next[0].positon).toStrictEqual({
      x:2,
      y: 13
    })
    expect (next[1].positon).toStrictEqual({
      x:1,
      y: 12
    })

    next = moveRoutes(maze, next)
    expect (next[0].positon).toStrictEqual({
      x: 3,
      y: 13
    })
    expect (next[1].positon).toStrictEqual({
      x:1,
      y: 11
    })
  })

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

  test('Part 1', () => {
    const data = readTestData('./src/day16/input.txt');
    const maze = createMaze(data);
    var min = moveToEnd(maze);
    expect(min).toBe(11048)
  })
})