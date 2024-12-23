
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { getPart1, getPassword, linkNodes } from './day23';


describe('day 23', () => {
   test ('Sample', () =>{
      const nodes = linkNodes(readTestData('./src/day23/input.sample.txt'))
      expect (nodes.length).toBe(16)
      expect (getPart1(nodes)).toBe(7) 
   })

   test ('Part 1', () =>{
      const data = readTestData('./src/day23/input.txt')
      const nodes = linkNodes(data)
      expect (nodes.length).toBe(520)
      expect (getPart1(nodes)).toBe(1240)
   })

   test ('Sample - Part 2', () =>{
      const data = linkNodes(readTestData('./src/day23/input.sample.txt'))
      expect(getPassword(data)).toBe("co,de,ka,ta")
   })

   test ('Part 2', () =>{
      const data = readTestData('./src/day23/input.txt')
      const nodes = linkNodes(data)
      expect(getPassword(nodes)).toBe("am,aq,by,ge,gf,ie,mr,mt,rw,sn,te,yi,zb")
   })

   // Part 2
   // form parties.

   // somone can only join a party, if they have a link with everyone else in that party

   // first person, joins a party
   // if second person, is linked to first
   // they can join party.
   // if not they start there own party.
   // next person.

})