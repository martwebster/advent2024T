
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { getFitCount, isFit, isKey, isLock, parseKey, parseLock } from './day25';


describe('day 25', () => {
   test ('Sample 1', () =>{
      const data = readTestData('./src/day25/input.sample.txt')

      const locksAndKeys = data.splitAll("")
      expect(locksAndKeys.length).toBe(6)
      
      const locks = locksAndKeys.filter (isLock)
      expect(locks.length).toBe(2)
      expect (parseLock(locks[0])).toStrictEqual([0,5,3,4,3])
      expect (parseLock(locks[1])).toStrictEqual([1,2,0,5,3])
      
      const keys = locksAndKeys.filter (isKey)
      expect(keys.length).toBe(3)
      expect (parseKey(keys[0])).toStrictEqual([5,0,2,1,3])
      expect (parseKey(keys[1])).toStrictEqual([4,3,4,0,2])
      expect (parseKey(keys[2])).toStrictEqual([3,0,2,0,1])

      var parsedKeys = keys.map (parseKey)
      var parsedLocks = locks.map (parseLock)

      expect(isFit(parsedLocks[0], parsedKeys[2])).toBe(true)
      expect ( getFitCount(parsedLocks, parsedKeys)).toBe(3)
   })

   
   test ('Part 1', () =>{
      const data = readTestData('./src/day25/input.txt')
      const locksAndKeys = data.splitAll("")
      const locks = locksAndKeys.filter (isLock)
      const keys = locksAndKeys.filter (isKey)
      var parsedKeys = keys.map (parseKey)
      var parsedLocks = locks.map (parseLock)

      expect ( getFitCount(parsedLocks, parsedKeys)).toBe(3)

    })
 
})