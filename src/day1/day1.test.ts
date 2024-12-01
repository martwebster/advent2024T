
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { pairs, similarity } from './day1';

extensions.apply();

describe('day 1 - part1', () => {

    const sampleData = [
        "3   4",
        "4   3",
        "2   5",
        "1   3",
        "3   9",
        "3   3",
    ]

    test('sample', () => {
        expect(sampleData[0].toNumbers()).toStrictEqual([3, 4]);
        expect(pairs(sampleData)).toBe(11);
    })

    test('part1', () => {
        const data = readTestData('./src/day1/day1.txt');
        expect(pairs(data)).toBe(2057374);
    })

    test('sample - part 2', () => {
        expect(similarity(sampleData)).toBe(31);
    })

    test('part2', () => {
        const data = readTestData('./src/day1/day1.txt');
        expect(similarity(data)).toBe(23177084);
    })
})