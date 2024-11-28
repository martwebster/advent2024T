
import * as extensions from '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { exampleFunction } from './day1';

extensions.apply();

describe('day 1 - part1', () => {
    test('sample', () => {
        expect(exampleFunction('1')).toBe(1);
    })

    test('part1', () => {
        const data = readTestData('./src/day1/day1.txt');
        const sum = data.map(line => exampleFunction(line)).sum();
        expect(sum).toBe(6);
    })
})