
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { calculate, hackValue, hackValues, Register, runProgram } from './day17';

describe('day 17', () => {

  const start: Register ={
    A:0,
    B:0,
    C:0,
    output: []
  }

  test('Prep 1', () => {
    expect (runProgram("2,6", {
      ...start,
      C:9,
    })).toStrictEqual({
      A:0,
      B:1,
      C:9,
      output: []
    })

    expect (runProgram("5,0,5,1,5,4", {
      ...start,
      A:10,
    })).toStrictEqual({
      A:10,
      B:0,
      C:0,
      output: [0,1,2]
    })
  })

  test('Prep 2', () => {
    expect (runProgram("0,1,5,4,3,0", {
      ...start,
      A:2024,
    })).toStrictEqual({
      A:0,
      B:0,
      C:0,
      output: [4,2,5,6,7,7,7,7,3,1,0]
    })
  });

  test('Prep 3', () => {
    expect (runProgram("1,7", {
      ...start,
      B:29,
    })).toStrictEqual({
      A:0,
      B:26,
      C:0,
      output: []
    })
  });

  test('Prep 4', () => {
    expect (runProgram("4,0", {
      ...start,
      B:2024,
      C:43690
    })).toStrictEqual({
      A:0,
      B:44354,
      C:43690,
      output: []
    })
  });

  test('Sample 1', () => {
    expect (runProgram("0,1,5,4,3,0", {
      ...start,
      A: 729
    })).toStrictEqual({
      A:0,
      B:0,
      C:0,
      output: [4,6,3,5,6,3,5,2,1,0]
    })
  })

  test('Part 1', () => {
    var result = runProgram("2,4,1,5,7,5,1,6,0,3,4,6,5,5,3,0", {
      ...start,
      A: 51064159
    });
    expect (result!.output.join(",")).toBe("3,6,3,7,0,7,0,3,0")
  })

  test('Part 2 - Sample', () => {
    const prog =  "0,3,5,4,3,0";

    var values = hackValues(prog);
    var totals : number[] = []
    for (let index = 0; index < values.length; index++) {
      const element = values[index] * Math.pow(2, index*3)
      totals.push(element)
    }
    var total = totals.sum();

    expect (total).toBe(117440)
  })

  function dec2bin(dec: number) {
    return (dec >>> 0).toString(2);
  }

// 0     000 [ 3 ] // flip 2
// 1     001 [ 2 ] // flip 2
// 2     010 [ 1 ] // flip 2
// 3     011 [ 0 ] // flip 2
// 4     100 [ 5 ] 
// 5     101 [ 3 ]
// 6     110 [ 5 ]
// 7     111 [ 5 ]
// 8   1 000 [ 3, 2 ]
// 9   1 001 [ 2, 2 ]
// 10  1 010 [ 1, 2 ]
// 11  1 011 [ 0, 2 ]
// 12  1 100 [ 1, 2 ]
// 13  1 101 [ 3, 2 ]
// 14  1 110 [ 4, 2 ]
// 15  1 111 [ 7, 2 ]
// 16 10 000 [ 3, 1 ]

  test('Part 2', () => {
    const prog =  "2,4,1,5,7,5,1,6,0,3,4,6,5,5,3,0";


    var values = hackValues(prog);
    console.log(values)
    var totals : bigint[] = []
    for (let index = 0; index < values.length; index++) {
      const element = BigInt(values[index]) * BigInt(Math.pow(2, index*3))
      totals.push(element)
    }
    var total = totals.reduce((sum: bigint, current: bigint) => sum + current, 0n);

    //9007199254740991
    //108299861817585 is too low
    //108299861817585
    expect (total).toBe(108299861817585n) 

    for (let index = 0; index < 100; index++) {
      const reg = runProgram(prog, { 
          ...start,
          A: index
        })
      console.log(index, dec2bin(index),  reg?.output)
      
    }

    //64 1,000,000 [ 1, 3, 2 ]
    //65 1,000,001 [ 6, 3, 2 ]
    //66 1,000,010 [ 1, 3, 2 ]
    //67 1,000,011 [ 1, 3, 2 ]
    //68 1,000,100 [ 5, 3, 2 ]

    // expect )?.output).toStrictEqual([2]) //001 => 010

    // expect (runProgram(prog, {
    //   ...start,
    //   A: 2
    // })?.output).toStrictEqual([1]) // 010 => 001

    // expect (runProgram(prog, {
    //   ...start,
    //   A: 3
    // })?.output).toStrictEqual([0]) // 011 => 000

    // expect (runProgram(prog, {
    //   ...start,
    //   A: 4
    // })?.output).toStrictEqual([5]) // 100 => 011 => 101

    // expect (runProgram(prog, {
    //   ...start,
    //   A: 5
    // })?.output).toStrictEqual([3]) // 101 => 010 => 011

    // expect (runProgram(prog, {
    //   ...start,
    //   A: 6
    // })?.output).toStrictEqual([5]) // 110 => 001 => 101

    // expect (runProgram(prog, {
    //   ...start,
    //   A: 7
    // })?.output).toStrictEqual([5]) // 111 => 101

    // expect (runProgram(prog, {
    //   ...start,
    //   A: 8
    // })?.output).toStrictEqual([3, 2]) //1000 => 011, 010
    // 0,3,5,4,3,0

    // 117440 


    // 11 100 101 011 000 000
    // 11100101011000000
    // var result = 
    //   getAValue(start,);
    // expect(result).toBe(609)
  })
})