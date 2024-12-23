
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { getPart1, getPassword, populateNodes } from './day23';


describe('day 23', () => {
   test ('Sample', () =>{
      const nodes = populateNodes(readTestData('./src/day23/input.sample.txt'))
      expect (nodes.length).toBe(16)
      expect (getPart1(nodes)).toBe(7) 
   })

   test ('Part 1', () =>{
      const data = readTestData('./src/day23/input.txt')
      const nodes = populateNodes(data)
      expect (nodes.length).toBe(520)
      expect (getPart1(nodes)).toBe(1240)
   })

   test ('Sample - Part 2', () =>{
      const data = populateNodes(readTestData('./src/day23/input.sample.txt'))
      expect(getPassword(data)).toBe("co,de,ka,ta")
   })

   test ('Part 2', () =>{
      const data = readTestData('./src/day23/input.txt')
      const nodes = populateNodes(data)
      expect(getPassword(nodes)).toBe("am,aq,by,ge,gf,ie,mr,mt,rw,sn,te,yi,zb")
   })

})