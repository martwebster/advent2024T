import "../utility/extensions"
import { test, describe, expect } from "vitest"
import { readTestData } from "../utility/fileHelper"
import { createTrack, displayTrack, getFastest, getSavings, moveToEnd, recordBaseline } from "./day20"

describe("day 20", () => {
   test("Sample 1", () => {
      const data = readTestData("./src/day20/input.sample.txt")
      const track = createTrack(data)
      const baseline = moveToEnd(track, 0)[0]

      recordBaseline(track, baseline.visited)

      expect(getFastest(track,0)).toBe(84)
      expect(getFastest(track,1)).toBe(20)
      expect(getFastest(track,3)).toBe(12)

      expect(getSavings(track,1,1)).toBe(44)
   })

   test("Sample 2", () => {
      const data = readTestData("./src/day20/input.sample2.txt")
      const track = createTrack(data)

      const baseline =  moveToEnd(track, 0)[0]
      recordBaseline(track, baseline.visited)

      expect(getFastest(track,0)).toBe(7)
      expect(getFastest(track,1)).toBe(5)
      expect(getFastest(track,2)).toBe(3)

      expect(getSavings(track,1,1)).toBe(1)
   })

   test("Part 1", () => {
      const data = readTestData("./src/day20/input.txt")
      const track = createTrack(data)
      const baseline =  moveToEnd(track, 0)[0]
      recordBaseline(track, baseline.visited)
      displayTrack(track)
      expect(getSavings(track,1,100)).toBe(1346)
   })

   test("Part 2 - Sample 2", () => {
      const data = readTestData("./src/day20/input.sample.txt")
      const track = createTrack(data)
      const baseline = moveToEnd(track, 0)[0]

      recordBaseline(track, baseline.visited)
      expect(getSavings(track,20,72)).toBe(29)
   })

})