
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {  sum} from './day12';
import { readTestData } from '../utility/fileHelper';

const data = readTestData('./src/day10/input.txt');
describe('day 12', () => {


  test('sample 2', () => {
    var numbers = sum()

    expect(numbers).toBe(22)
  })

  
  test('part 1', () => {
    const data = readTestData('./src/day10/input.txt');

  });

 
})