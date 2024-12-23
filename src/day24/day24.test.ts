
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';


describe('day 24', () => {
   test ('Sample', () =>{
      const nodes = readTestData('./src/day24/input.sample.txt')
      expect (1).toBe(7) 
   })

   test ('Part 1', () =>{
      const data = readTestData('./src/day24/input.txt')
      expect (1).toBe(1240)
   })

})