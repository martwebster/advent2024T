
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { extractMultiplications, sumLine, sumLinesWithInstructions } from './day3';

describe('day 3', () => {

    test('sample', () => {
       expect(sumLine("mul(1,2)")).toBe(2)
       expect(sumLine("mul( 1,2)")).toBe(0)
       expect(sumLine("mul(1 ,2)")).toBe(0)
       expect(sumLine("mul(1,2")).toBe(0)
       expect(sumLine("mul(1,2")).toBe(0)
       expect(sumLine("Mul(1,2)")).toBe(0)
       
       expect(sumLine("xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))")).toBe(161)
    })

    test('part1', () => {
         const data = readTestData('./src/day3/input.txt');
         const result = data.sumOf ( it => sumLine(it))
         expect(result).toBe(188741603);
    })

    test('sample 2', () => {
        expect(sumLinesWithInstructions(["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"])).toBe(48)
     })

     test('part2', () => {
        const data = readTestData('./src/day3/input.txt');
        //31635268 is too low
        const result = sumLinesWithInstructions(data)
        expect(result).toBe(67269798);
   })
})