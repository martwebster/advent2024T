
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { parseRules, parseAllPages, isRuleValid, isValidUpdate, getMiddle, addPages, reOrderUpdate, addInvalidPages } from './day5';

extensions.apply();

describe('day 5', () => {

    test('sample 1', () => {
      const data = readTestData('./src/day5/input.sample.txt');
      const rulesData = data.slice(0, data.indexOf(""))
      const rules = parseRules(rulesData);
      expect(rules.length).toBe(21)
      
      const pagesData = data.slice(data.indexOf("")+1)
      const pages = parseAllPages(pagesData);
      expect(pages.length).toBe(6)

      expect(isValidUpdate(pages[0], rules)).toBe(true)
      expect(isValidUpdate(pages[1], rules)).toBe(true)
      expect(isValidUpdate(pages[2], rules)).toBe(true)
      expect(isValidUpdate(pages[3], rules)).toBe(false)
      expect(isValidUpdate(pages[4], rules)).toBe(false)
      expect(isValidUpdate(pages[5], rules)).toBe(false)
      expect(addPages(rules, pages)).toBe(143)
    })

    test('middle', () => {
      expect(getMiddle([75,47,61,53,29])).toBe(61)
      expect(getMiddle([75,29,13])).toBe(29)
    })

    test('part1', () => {
         const data = readTestData('./src/day5/input.txt').split("")
         const rules = parseRules(data[0]);
         const pages = parseAllPages(data[1]);
         
         expect(addPages(rules, pages)).toBe(5091)
    })

    test('sample part 2', () => {
      const data = readTestData('./src/day5/input.sample.txt').split("")
      const rules = parseRules(data[0]);
      const pages = parseAllPages(data[1]);
      expect(addInvalidPages(rules, pages)).toBe(123)
      
    })

     test('part2', () => {
        const data = readTestData('./src/day5/input.txt').split("")
        
        const rules = parseRules(data[0]);
        const pages = parseAllPages(data[1]);

        expect(addInvalidPages(rules, pages)).toBe(4681)
   })
})