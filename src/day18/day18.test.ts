
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { createMemory, displayMemory, findBlock, getBytes, moveToEnd } from './day18';
import { displayMaze } from '../day16/day16';


describe('day 18', () => {
  
   test('Sample 1', () => {
     const data = readTestData('./src/day18/input.sample.txt');
     const maze = createMemory(data, 6,12);
     displayMemory(maze)
     var min = moveToEnd(maze, 6);
     displayMemory(maze)
     
     expect(min).toBe(22)
   })

   test('Part 1', () => {
    const data = readTestData('./src/day18/input.txt');
    const maze = createMemory(data, 70, 1024);
    displayMemory(maze)
    var min = moveToEnd(maze, 70);
   // displayMemory(maze)
    
    expect(min).toBe(270)
  })

  test('Sample 2', () => {
    const data = readTestData('./src/day18/input.sample.txt');
    const extra = getBytes(data, 12)
    
    const maze = createMemory(data, 6,12);
    var min = moveToEnd(maze, 6);
    var block = findBlock(maze, extra, 6);

  
    expect(block).toStrictEqual({
      x: 6,
      y: 1
    })
  })

  test('Part 2', () => {
    const data = readTestData('./src/day18/input.txt');
    const extra = getBytes(data, 1024)
    
    const maze = createMemory(data, 70,1024);
    var min = moveToEnd(maze, 70);
    var block = findBlock(maze, extra, 70);

  
    expect(block).toStrictEqual({
      x: 51,
      y: 40
    })
  })


  })