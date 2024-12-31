import "../utility/extensions"
import { test, describe, expect } from "vitest"
import {
   NumericKeyPad,
   getMinLength, getMinForSequence, getQuickTotal, getQuickTotalPart2
} from "./day21"

const sample = [
   "029A",
   "980A",
   "179A",
   "456A",
   "379A"
]

const full = [
   "805A",
   "983A",
   "149A",
   "413A",
   "582A"
]

describe("day 21", () => {

   test("Sample", () => {
      const pad = new NumericKeyPad();

      expect(pad.getPathsAsString("029A")).toStrictEqual([
         "<A^A^^>AvvvA",
         "<A^A^>^AvvvA",
         "<A^A>^^AvvvA"])

      expect(getMinLength("<A^A>^^AvvvA", 1)).toBe(28)
      expect(getMinLength("<A^A>^^AvvvA", 2)).toBe(68)

      expect (getMinForSequence("029A",2)).toBe(68)
      expect (getMinForSequence("980A",2)).toBe(60)
      expect (getMinForSequence("179A",2)).toBe(68)
      expect (getMinForSequence("456A",2)).toBe(64)
      expect (getMinForSequence("379A",2)).toBe(64)

      expect (getQuickTotal(sample)).toBe(126384)
   })

   test("Part 1", () => {
      expect(getQuickTotal(full)).toBe(202648)
   })

   test("Part 2", () => {
      expect(getQuickTotalPart2(full)).toBe(248919739734728)
   })

})