
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { buildSuperMap, Cell, Movement, displayMap, move } from './day15';

describe('day 15', () => {
  test('sample 1- move up', () => {
    const data = readTestData('./src/day15/input.sample.txt');
    var bits = data.split("")
    var map = Cell.from(bits[0])
    var instructions = Movement.from( bits[1].join(""))
    displayMap(map)
    var pos = map.scan (it => it == Cell.Current)[0]
    instructions.forEach (dir =>{
      console.log("Moviong", dir)
      pos = move(map, pos, dir)
      displayMap(map)
    })
    var total = map.scan( it=> it == Cell.Box).sumOf ( it => it.y* 100 + it.x)
    expect (total).toBe(2028)
  })

  test('sample 1- large', () => {
    const data = readTestData('./src/day15/input.sample2.txt');
    var bits = data.split("")
    var map = Cell.from(bits[0])
    var instructions = Movement.from( bits[1].join(""))
    displayMap(map)
    var pos = map.scan (it => it == Cell.Current)[0]
    instructions.forEach (dir =>{
      console.log("Moviong", dir)
      pos = move(map, pos, dir)
      displayMap(map)
    })
    var total = map.scan( it=> it == Cell.Box).sumOf ( it => it.y* 100 + it.x)
    expect (total).toBe(10092)
  })
  
  test('part 1', () => {
    const data = readTestData('./src/day15/input.txt');
    var bits = data.split("")
    var map = Cell.from(bits[0])
    var instructions = Movement.from( bits[1].join(""))
    displayMap(map)
    var pos = map.scan (it => it == Cell.Current)[0]
    instructions.forEach (dir =>{
      console.log("Moviong", dir)
      pos = move(map, pos, dir)
    })
    displayMap(map)
    var total = map.scan( it=> it == Cell.Box).sumOf ( it => it.y* 100 + it.x)
    expect (total).toBe(1479679)
  });

  test('sample 2- large', () => {
    const data = readTestData('./src/day15/input.sample2.txt');
    var bits = data.split("")
    var map = buildSuperMap(bits[0])
    var instructions = Movement.from( bits[1].join(""))
    displayMap(map)
  })

  test('sample 3', () => {
    const data = readTestData('./src/day15/input.sample3.txt');
    var bits = data.split("")
    var map = buildSuperMap(bits[0])
    var instructions = Movement.from( bits[1].join(""))
    displayMap(map)
    var pos = map.scan (it => it == Cell.Current)[0]
    var pos = move(map, pos, Movement.Left)
    displayMap(map)
    
    var pos = move(map, pos, Movement.Down)
    var pos = move(map, pos, Movement.Down)
    var pos = move(map, pos, Movement.Left)
    var pos = move(map, pos, Movement.Left)
    var pos = move(map, pos, Movement.Left)
    displayMap(map)
    var pos = move(map, pos, Movement.Up)
    displayMap(map)
    var pos = move(map, pos, Movement.Up)
    displayMap(map)
  })
  test('sample 4', () => {
    const data = readTestData('./src/day15/input.sample4.txt');
    var bits = data.split("")
    var map = buildSuperMap(bits[0])
    var instructions = Movement.from( bits[1].join(""))
    displayMap(map)
    var pos = map.scan (it => it == Cell.Current)[0]
    var pos = move(map, pos, Movement.Left)
    displayMap(map)
    
    var pos = move(map, pos, Movement.Down)
    var pos = move(map, pos, Movement.Down)
    var pos = move(map, pos, Movement.Left)
    var pos = move(map, pos, Movement.Left)
    var pos = move(map, pos, Movement.Left)
    displayMap(map)
    var pos = move(map, pos, Movement.Up)
    displayMap(map)
  })

  test('Part 2 - sample large', () => {
    const data = readTestData('./src/day15/input.sample2.txt');
    var bits = data.split("")
    var map = buildSuperMap(bits[0])
    var directions = Movement.from( bits[1].join(""))
    displayMap(map)
    var pos = map.scan (it => it == Cell.Current)[0]
    directions.forEach (dir =>{
      console.log("Moviong", dir)
      pos = move(map, pos, dir)
      displayMap(map)
    })
    var total = map.scan( it=> it == Cell.LeftBox).sumOf ( it => it.y* 100 + it.x)
    expect (total).toBe(9021)
  })

  test('Part 2', () => {
    const data = readTestData('./src/day15/input.txt');
    var bits = data.split("")
    var map = buildSuperMap(bits[0])
    var instructions = Movement.from( bits[1].join(""))
    
    var pos = map.scan (it => it == Cell.Current)[0]
    instructions.forEach (dir =>{
      pos = move(map, pos, dir)
    })
    var total = map.scan( it=> it == Cell.LeftBox).sumOf ( it => it.y* 100 + it.x)
    expect (total).toBe(1509780)
  })
})