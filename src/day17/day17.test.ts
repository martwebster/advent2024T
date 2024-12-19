
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { calculate, getVal, hackValue, hackValues, Register, runProgram, runProgram2 } from './day17';
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
    
    for (let index = 0; index < powers.length; index++) {
      var val = powers[index];
      if (index > 0){
        val = val + powers[index-1]
      }
      var pos = progDigits.length - 1 - index;
      console.log(val)
       const targetResult = progDigits[pos]
       var reg = runProgram(prog, { 
            ...start,
            A: val
          })
       while (reg?.output[pos] != targetResult){
           val = val + powers[index]
           var reg = runProgram(prog, { 
            ...start,
            A: val
          })
       }
       powers[index] = val;
    }
    expect (powers.last()).toBe(117441)
  })


  test('Part 2', () => {
    const prog =  "2,4,1,5,7,5,1,6,0,3,4,6,5,5,3,0"
    const progDigits = prog.split(",").map(it => Number(it))
    const powers = prog.split(",").map( (it, index)=> {
      return Math.pow(8, index)
    })
    powers.reverse();
    console.log(powers)

    var options : number[] = [0]
    for (let index = 0; index < powers.length; index++) {
       console.log()
       
       var pos = progDigits.length - 1 - index;
       const targetResult = progDigits[pos]

       var result : number[] = []
       for (var x = 0; x<= 7;x++){
         options.forEach(it =>{
          var val = it + (powers[index] * x)
          if (val>0){
              var reg = runProgram(prog, { 
                ...start,
                A: val
              })
              if (reg?.output[pos] == targetResult){
                result.push(val)
                console.log(pos, x, targetResult, val, reg.output)
              }
           }
         })
        } 
        options = result
    }
    var big = options.min()
    expect(big).toBe(136904920099226) //136904920099226
    var reg = runProgram(prog, { 
      ...start,
      A: big
    })
    console.log(Number.MAX_SAFE_INTEGER)
    expect (reg?.output.join(",")).toBe("2,4,1,5,7,5,1,6,0,3,4,6,5,5,3,0")

//136904921131418
//136904921196954
//136904921295258
  
   //136035152741552 too low
   //114914688313754
   //709720010415022
})

test('Part 2 - Hack', () => {
  const prog =  "2,4,1,5,7,5,1,6,0,3,4,6,5,5,3,0"
  const progDigits = prog.split(",").map(it => Number(it))

  var x = 0

  var result = runProgram(prog, { 
    ...start,
    A: x
  })
  var lengths : number[] = [];
  while (x< 1_000_000){
    x++;
    var result = runProgram(prog, { 
      ...start,
      A: x
    })
    if (lengths[result.output.length]== undefined){
      lengths[result.output.length]= x;
    }
  }
  console.log(lengths)
});


})

105690555219968