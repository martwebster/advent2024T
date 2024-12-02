
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { isSafe, safeCount } from './day2';

extensions.apply();

describe('day 1 - part1', () => {

    const sampleData = [
        "7 6 4 2 1",
        "1 2 7 8 9",
        "9 7 6 2 1",
        "1 3 2 4 5",
        "8 6 4 4 1",
        "1 3 6 7 9"
    ]

    test('sample', () => {
        // expect(sampleData[0].toNumbers()).toStrictEqual([7, 6, 4, 2, 1]);
        // expect(isSafe(sampleData[0])).toBe(true);
        // expect(isSafe(sampleData[1])).toBe(false);
        // expect(isSafe(sampleData[2])).toBe(false);
        // expect(isSafe(sampleData[3])).toBe(false);
        // expect(isSafe(sampleData[4])).toBe(false);
        // expect(isSafe(sampleData[5])).toBe(true);
        // expect(safeCount(sampleData)).toBe(2);
        // expect(isSafe("7 6 4 2 1 0")).toBe(true);
        // expect(isSafe("4 4 5 6 7")).toBe(false);
        // expect(isSafe("52 52 51 49 47 45 42 38")).toBe(false);
        expect(isSafe("20 18 19 22 25 30")).toBe(false)
    })

    test('part1', () => {
        const data = readTestData('./src/day2/input.txt');
        // 346 too high // 345
        expect(safeCount(data)).toBe(2);

    })

    // test('sample - part 2', () => {
    //     expect(similarity(sampleData)).toBe(31);
    // })

    // test('part2', () => {
    //     const data = readTestData('./src/day2/input.txt');
    //     expect(similarity(data)).toBe(23177084);
    // })
})