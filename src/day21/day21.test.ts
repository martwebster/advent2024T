
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import {  DirectionKeyboard, getDirectionPaths, getTimes, getScore, getTransitions, NumericKeyPad, getScorePart2 } from './day21';

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

describe('day 21', () => {

  /**
 +---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+
 */

//      +---+---+
//      | ^ | A |
//  +---+---+---+
//  | < | v | > |
//  +---+---+---+


test ('Part 1', () =>{

  
    
  expect (getTimes("<A",2)).toBe("<vA<AA>>^AvAA<^A>A")
  expect (getTimes(">A",2)).toBe("<vA>^A<A>A")
  expect (getTimes("^A",2)).toBe("<v<A>>^AvA^A")
  expect (getTimes("vA",2)).toBe("<v<A>A>^AvA<^A>A")

  const pad = new NumericKeyPad(); 
  const paths = pad.getPaths("582A")

  expect (getScore(sample)).toBe(126384)
  expect (getScore(full)).toBe(202648)


  expect (getScorePart2(sample)).toBe(126384)

 })

})