
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { Equation, evaluate, evaluateAll, parseEquation, evaluateEquation } from './day7';


describe('day 7', () => {

    test('sample 1', () => {

      expect(parseEquation("190: 10 19")).toStrictEqual({
        result : 190, 
        parts: [ 10, 19], 
        operators: [],
      })

      
      const equation : Equation= {
        parts: [10,19],
        result: 190,
        operators : ["+"]
      }
      
      expect(evaluateEquation(equation)).toBe(false)
      equation.operators = ["*"]
      expect(evaluateEquation(equation)).toBe(true)
      
      expect(evaluate("190: 10 19", false)).toBe(190)

      const data = readTestData('./src/day7/input.sample.txt');
      expect(evaluateAll(data)).toBe(3749)
    })

    test('part1', () => {
      const data = readTestData('./src/day7/input.txt')
      expect(evaluateAll(data)).toBe(6392012777720)
    })

    test('sample 2', () => {
            
      const equation : Equation= {
        parts: [10,19],
        result: 1019,
        operators : ["||"]
      }
      
      expect(evaluate("1019: 10 19", true)).toBe(1019)
      expect(evaluateEquation(equation)).toBe(true)
      
      const data = readTestData('./src/day7/input.sample.txt');
      expect(evaluateAll(data, true)).toBe(11387)
    })

    
    test('part2', () => {
      const data = readTestData('./src/day7/input.txt')
      expect(evaluateAll(data, true)).toBe(61561126043536)
    })
})