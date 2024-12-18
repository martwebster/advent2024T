
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { calculate, hackValue, hackValues, Register, runProgram, runProgram2 } from './day17';
import { runProgram3 } from './internet';





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

    const progDigits = prog.split(",").map(it => Number(it))

    const powers = prog.split(",").map( (it, index)=> {
      return Math.pow(8, index)
    })
    powers.reverse();
    
    // for (let index = 0; index < powers.length; index++) {
    //   var val = powers[index];
    //   var pos = progDigits.length - 1 - index;
    //   console.log(val)
    //    const targetResult = progDigits[pos]
    //    var reg = runProgram(prog, { 
    //         ...start,
    //         A: val
    //       })
    //    while (reg?.output[pos] != targetResult){
    //        val = val + powers[index]
    //        var reg = runProgram(prog, { 
    //         ...start,
    //         A: val
    //       })
    //    }
    //    powers[index] = val;
    // }

    let j = 0;
    for (let i = progDigits.length - 1; i >= 0; i--) {
      j *= 8;
      const currTarget = progDigits.slice(i).join(",");
      while (true) {
        var te = runProgram(prog, {
          ...start, 
          A: j,
        }as Register)
        const curr = te?.output.join(",");
        if (curr === currTarget) {
          break;
        }
        j++;
      }
    }
    console.log(j);
  })


  test('Part 2', () => {
    const prog =  "2,4,1,5,7,5,1,6,0,3,4,6,5,5,3,0"
    const progDigits = prog.split(",").map(it => Number(it))

    let j = 0;
    for (let i = progDigits.length - 1; i >= 0; i--) {
      j *= 8;
      const currTarget = progDigits.slice(i).join(",");
      while (true) {
        var te = runProgram2(progDigits, j)
        const curr = te.join(",");
        if (curr === currTarget) {
          break;
        }
        j++;
      }
    }
    console.log(j);
   //136035152741552 too low
   //709720010415022
})
test('Part 3 - Sample', () => {
  const input = readTestData("./src/day17/input.txt")
  .map((a) => a.split(": "));

  const register = new Map([
    ["A", Number(input[0][1])],
    ["B", Number(input[1][1])],
    ["C", Number(input[2][1])],
  ]);
  const program = input[4][1].split(",").map(Number);
  console.log(
    runProgram3(program, register.get("A")!, register.get("B"), register.get("C")).join(",")
  );

  let j = 0;
  for (let i = program.length - 1; i >= 0; i--) {
    j *= 8;
    const currTarget = program.slice(i).join(",");
    while (true) {
      const curr = runProgram3(program, j).join(",");
      if (curr === currTarget) {
        break;
      }
      j++;
    }
  }
  console.log(j);
  });

})