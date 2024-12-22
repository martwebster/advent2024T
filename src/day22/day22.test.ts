
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { getTopBanana, loop, mix, next, prune, sumBuyers } from './day22';


describe('day 22', () => {
   test ('Sample', () =>{
      expect (mix(42,15)).toBe(37)
      expect (prune(100000000)).toBe(16113920)

      expect (next(123)).toBe(15887950)
      expect (loop(123, 10)).toBe(5908254)

      expect (loop(1, 2000)).toBe(8685429)
      expect (loop(10, 2000)).toBe(4700978)
      expect (loop(100, 2000)).toBe(15273692)
      expect (loop(2024, 2000)).toBe(8667524)
      expect (sumBuyers([1,10,100,2024])).toBe(37327623)

   })

   test ('Part 1', () =>{
      const data = readTestData('./src/day22/input.txt').map( it => Number(it))
      expect (sumBuyers(data)).toBe(17965282217)
   })

   test ('Sample - Part 2', () =>{
      var buyers = [1,2,3,2024];
      expect(getTopBanana(buyers)).toBe(23)
   })

   test ('Part 2', () =>{
      const buyers = readTestData('./src/day22/input.txt').map( it => Number(it))
      expect(getTopBanana(buyers)).toBe(2152)
   })
})