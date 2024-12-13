
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { price, priceAll } from './day13';

const data = readTestData('./src/day10/input.txt');
describe('day 13', () => {
//Button A: X+94, Y+34
// Button B: X+22, Y+67
// Prize: X=8400, Y=5400

  test('sample 1', () => {
    var data = [
    "Button A: X+94, Y+34",
    "Button B: X+22, Y+67",
    "Prize: X=8400, Y=5400"]
    expect (price(data)).toBe(280)
  })

  test('sample 2', () => {
    const data = readTestData('./src/day13/input.sample.txt');
    var equations = data.splitAll("");
    expect (price(equations[0])).toBe(280)
    expect (price(equations[1])).toBe(0)
    expect (price(equations[2])).toBe(200)
    expect (price(equations[3])).toBe(0)
    expect ( priceAll(data)).toBe(480)
  })

  test('part 1', () => {
    const data = readTestData('./src/day13/input.txt');
    expect ( priceAll(data)).toBe(26599)
  });

  test('part 2', () => {
    const data = readTestData('./src/day13/input.txt');
    expect ( priceAll(data, 10000000000000)).toBe(106228669504887)
  });


})