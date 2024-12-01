
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { diff, extract, pairs, similarity } from './day1';

extensions.apply();

describe('day 1 - part1', () => {

    test('diff', () => {
        expect(diff(3, 4)).toBe(1);
        expect(diff(9, 3)).toBe(6);
    })

    test('sample', () => {
        const data = [
            "3   4",
            "4   3",
            "2   5",
            "1   3",
            "3   9",
            "3   3",
        ]
        expect(extract(data[0])).toStrictEqual([3, 4]);
        expect(pairs(data)).toBe(11);
    })

    test('part1', () => {
        const data = readTestData('./src/day1/day1.txt');
        const result = pairs(data);
        expect(result).toBe(2057374);
    })


    test('sample', () => {
        const data = [
            "3   4",
            "4   3",
            "2   5",
            "1   3",
            "3   9",
            "3   3",
        ]
        expect(similarity(data)).toBe(31);
    })

    test('part2', () => {
        const data = readTestData('./src/day1/day1.txt');
        const result = similarity(data);
        expect(result).toBe(23177084);
    })
})