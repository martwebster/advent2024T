
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {  buildRegions, findRegion, getDiscountPrice, getPrice, horizontal, horizontalBottom, horizontalTop, sides, vertical, verticalLeft, verticalRight} from './day12';
import { readTestData } from '../utility/fileHelper';

const data = readTestData('./src/day10/input.txt');
describe('day 12', () => {


  test('sample 1', () => {
    var garden = ["AAAA",
    "BBCD",
    "BBCC",
    "EEEC"]

    // create a set of regions
    // start from top lef, and flood fill
    // adding to region

    var region = findRegion(garden, {x: 0 ,y:0})

    expect(region.plant).toBe("A")
    expect(region.positions.length).toBe(4)
    expect(region.perimeter).toBe(10)

    var region = findRegion(garden, {x: 0 ,y:1})

    expect(region.plant).toBe("B")
    expect(region.positions.length).toBe(4)
    expect(region.perimeter).toBe(8)
    
    var region = findRegion(garden, {x: 2 ,y:1})

    expect(region.plant).toBe("C")
    expect(region.positions.length).toBe(4)
    expect(region.perimeter).toBe(10)

    var region = findRegion(garden, {x: 3 ,y:1})

    expect(region.plant).toBe("D")
    expect(region.positions.length).toBe(1)
    expect(region.perimeter).toBe(4)

    var region = findRegion(garden, {x: 0 ,y:3})

    expect(region.plant).toBe("E")
    expect(region.positions.length).toBe(3)
    expect(region.perimeter).toBe(8)

    var regions = buildRegions(garden);
    expect (regions.length).toBe(5)
    expect (getPrice(regions)).toBe(140)
  })

  test('sample 2', () => {
    const garden = [
    "OOOOO",
    "OXOXO",
    "OOOOO",
    "OXOXO",
    "OOOOO"]
    var regions = buildRegions(garden);
    expect( regions.length).toBe(5)
    expect (regions[0].plant).toBe("O")
    expect(regions[0].positions.length).toBe(21)
    expect(regions[0].perimeter).toBe(36)

    expect ( getPrice(regions)).toBe(772)
    // part 2
    expect ( sides(regions[0])).toBe(20)
    expect ( getDiscountPrice(regions)).toBe(436)

  })

  
  test('big sample', () => {
    const data = readTestData('./src/day12/input.sample.txt');
    var regions = buildRegions(data);
    var r = regions.find(it => it.plant=="R")!
    expect (r.perimeter).toBe(18)
    expect (r.positions.length).toBe(12)
    
    expect (getPrice(regions)).toBe(1930)
    // part 2
    expect (getDiscountPrice(regions)).toBe(1206)
    
  });

  test('part 1', () => {
    const data = readTestData('./src/day12/input.txt');
    var regions = buildRegions(data);
    expect (getPrice(regions)).toBe(1465968 )

    // part 2
    expect (getDiscountPrice(regions)).toBe(897702 )
  });

  test('part 2 - sample', () => {
    var garden = ["AAAA",
      "BBCD",
      "BBCC",
      "EEEC"]
    var regions = buildRegions(garden);

    expect (sides(regions[0])).toBe(4)
    expect (sides(regions[2])).toBe(8)
    expect (getDiscountPrice(regions)).toBe(80)
    
  });

  test('sample 2', () => {
    const data = readTestData('./src/day12/input.sample2.txt');
    var regions = buildRegions(data);
    
    expect (getDiscountPrice(regions)).toBe(236)
  });


 
})