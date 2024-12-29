
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import {  countNumbers} from './day11';


describe('day 11', () => {

  test('sample 2', () => {
    var numbers = countNumbers([125,17],6)

    expect(numbers).toBe(22)
    numbers = countNumbers([125,17],25)
    expect(numbers).toBe(55312)    
  })

  test('part 1', () => {
    var numbers = countNumbers([4,4841539,66,5279,49207,134,609568,0],25)
    expect(numbers).toBe(212655)
  });

  test('part 2 - Sample', () => {

    expect(countNumbers([125,17],1)).toBe(3)
    expect(countNumbers([125,17],2)).toBe(4)
    expect(countNumbers([125,17],3)).toBe(5)
    expect(countNumbers([125,17],4)).toBe(9)
    expect(countNumbers([125,17],5)).toBe(13)
    expect(countNumbers([125,17],6)).toBe(22)

  });

  test('part 2', () => {

    const numbers = countNumbers([4, 4841539, 66, 5279, 49207, 134, 609568, 0], 75)
    expect(numbers).toBe(253582809724830)
  });
})