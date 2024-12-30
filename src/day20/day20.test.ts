import "../utility/extensions"
import { test, describe, expect } from "vitest"
import { readTestData } from "../utility/fileHelper"
import {
   createTrack,
   getAvailablePositions, getCheats,
   calculateBaseline,
   recordBaseline
} from "./day20"

describe("day 20", () => {
   test("Sample 1", () => {
      const data = readTestData("./src/day20/input.sample.txt")
      const track = createTrack(data)
      const baseline = calculateBaseline(track)

      recordBaseline(track, baseline.visited)

      // part 1
      expect(getCheats(track,2,1).length).toBe(44)
      // part 2
      expect(getCheats(track,20,50).length).toBe(285)
   })

   test("Sample 2", () => {
      const data = readTestData("./src/day20/input.sample2.txt")
      const track = createTrack(data)

      const baseline =  calculateBaseline(track)
      recordBaseline(track, baseline.visited)
      expect(getCheats(track,2,1).length).toBe(1)
   })

   test("Part 1", () => {
      const data = readTestData("./src/day20/input.txt")
      const track = createTrack(data)
      const baseline =  calculateBaseline(track)
      recordBaseline(track, baseline.visited)
      expect(getCheats(track, 2,100).length).toBe(1346)
      // part 2
      expect(getCheats(track,20,100).length).toBe(985482)
   })

   test("Part 2 - Sample 2", () => {
      const data = readTestData("./src/day20/input.sample.txt")
      const track = createTrack(data)
      const baseline = calculateBaseline(track)

      recordBaseline(track, baseline.visited)
      expect(getCheats(track,20,72).length).toBe(29)
   })

   //  0123456789
   //0 ----------
   //1 ----------
   //2 ----------
   //3 -----X----
   //4 ----XXX---
   //5 ---XXSXX--
   //6-----XXX--
   //7------X---
   //8----------
   test("Part 2 - Available Pos", () => {
      const positions = getAvailablePositions({
         x: 5,
         y: 5
      }, 9,9, 2)
      expect( positions.length).toBe(13)

      //  0123456789
      //0 ----------
      //1 ----------
      //2 -----X----
      //3 ----XXX---
      //4 ---XXXXX--
      //5 --XXXSXXX-
      //6----XXXXX--
      //7-----XXX---
      //8------X----
      const positions2 = getAvailablePositions({
         x: 5,
         y: 5
      }, 9,9, 3)
      expect( positions2.length).toBe(25)
   })
})