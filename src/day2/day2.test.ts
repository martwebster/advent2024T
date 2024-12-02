
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { isReportSafe, isReportSafeWithDampener, countSafeReports, countSafeReportsWithDampener } from './day2';

extensions.apply();

describe('day 2', () => {

    const sampleData = [
        "7 6 4 2 1",
        "1 2 7 8 9",
        "9 7 6 2 1",
        "1 3 2 4 5",
        "8 6 4 4 1",
        "1 3 6 7 9"
    ]

    test('sample', () => {
        expect(isReportSafe(sampleData[0].toNumbers())).toBe(true);
        expect(isReportSafe(sampleData[1].toNumbers())).toBe(false);
        expect(isReportSafe(sampleData[2].toNumbers())).toBe(false);
        expect(isReportSafe(sampleData[3].toNumbers())).toBe(false);
        expect(isReportSafe(sampleData[4].toNumbers())).toBe(false);
        expect(isReportSafe(sampleData[5].toNumbers())).toBe(true);
        expect(countSafeReports(sampleData)).toBe(2);
    })

    test('part1', () => {
        const data = readTestData('./src/day2/input.txt');
        expect(countSafeReports(data)).toBe(326);

    })

    test('sample - Part 2', () => {
        expect(sampleData[0].toNumbers()).toStrictEqual([7, 6, 4, 2, 1]);
        expect(isReportSafeWithDampener(sampleData[0].toNumbers())).toBe(true);
        expect(isReportSafeWithDampener(sampleData[1].toNumbers())).toBe(false);
        expect(isReportSafeWithDampener(sampleData[2].toNumbers())).toBe(false);
        expect(isReportSafeWithDampener(sampleData[3].toNumbers())).toBe(true);
        expect(isReportSafeWithDampener(sampleData[4].toNumbers())).toBe(true);
        expect(isReportSafeWithDampener(sampleData[5].toNumbers())).toBe(true);
        expect(countSafeReportsWithDampener(sampleData)).toBe(4);
    })

    test('part2', () => {
        const data = readTestData('./src/day2/input.txt');
        expect(countSafeReportsWithDampener(data)).toBe(381);
    })
})