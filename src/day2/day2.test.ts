
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { isSafe, isSafe2, safeCount, safeCount2 } from './day2';

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
        expect(sampleData[0].toNumbers()).toStrictEqual([7, 6, 4, 2, 1]);
        expect(isSafe(sampleData[0].toNumbers())).toBe(true);
        expect(isSafe(sampleData[1].toNumbers())).toBe(false);
        expect(isSafe(sampleData[2].toNumbers())).toBe(false);
        expect(isSafe(sampleData[3].toNumbers())).toBe(false);
        expect(isSafe(sampleData[4].toNumbers())).toBe(false);
        expect(isSafe(sampleData[5].toNumbers())).toBe(true);
        expect(safeCount(sampleData)).toBe(2);
    })

    test('part1', () => {
        const data = readTestData('./src/day2/input.txt');
        // 346 too high // 345
        expect(safeCount(data)).toBe(326);

    })

    test('sample 2', () => {
        expect(sampleData[0].toNumbers()).toStrictEqual([7, 6, 4, 2, 1]);
        expect(isSafe2(sampleData[0].toNumbers())).toBe(true);
        expect(isSafe2(sampleData[1].toNumbers())).toBe(false);
        expect(isSafe2(sampleData[2].toNumbers())).toBe(false);
        expect(isSafe2(sampleData[3].toNumbers())).toBe(true);
        expect(isSafe2(sampleData[4].toNumbers())).toBe(true);
        expect(isSafe2(sampleData[5].toNumbers())).toBe(true);
        expect(safeCount2(sampleData)).toBe(4);
    })

    test('part2', () => {
        const data = readTestData('./src/day2/input.txt');
        expect(safeCount2(data)).toBe(381);

    })
})