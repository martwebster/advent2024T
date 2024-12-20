
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { createTrack, getCounts, getInnerTrack, moveToEnd } from './day20';

describe('day 20', () => {
  
   test('Sample 1', () => {
     const data = readTestData('./src/day20/input.sample.txt');
     const track = createTrack(data);
     const inner = getInnerTrack(track)
     expect(moveToEnd(track)).toBe(84)
     expect(inner.length).toBe(84)
     getCounts(track, inner)
   })

    test('Part 1', () => {
      const data = readTestData('./src/day20/input.txt');
      const track = createTrack(data);
      const inner = getInnerTrack(track)
      expect(moveToEnd(track)).toBe(9324)
      expect(inner.length).toBe(9996)
      var count = getCounts(track, inner)

      expect (count).toBe(1346)
    })
  
  })