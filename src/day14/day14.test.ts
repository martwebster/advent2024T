
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { countQuad, displayRobots, findTree, moveRobot, moveRobots, buildQuads, Robot, safetyFactor } from './day14';

const data = readTestData('./src/day10/input.txt');
describe('day 14', () => {
  test('sample 1- move down', () => {
    var grid: Pos = { x: 3, y:3}
    var roboto : Robot = {
      pos: { x: 0, y:3},
      vel: { x: 0, y:1} // moving down
    }
    moveRobot(grid, roboto);
    expect (roboto.pos).toStrictEqual( { x: 0, y: 0})
  })
  test('sample 1- move up', () => {
    var grid: Pos = { x: 3, y:3}
    var roboto : Robot = {
      pos: { x: 0, y:0},
      vel: { x: 0, y:-1} // moving up
    }
    moveRobot(grid, roboto);
    expect (roboto.pos).toStrictEqual( { x: 0, y: 3})
  })
  test('sample 1- move left', () => {
    var grid: Pos = { x: 3, y:3}
    var roboto : Robot = {
      pos: { x: 0, y:0},
      vel: { x: -1, y:0} // moving down
    }
    moveRobot(grid, roboto);
    expect (roboto.pos).toStrictEqual( { x: 3, y: 0})
  })
  test('sample 1- move right', () => {
    var grid: Pos = { x: 3, y:3}
    var roboto : Robot = {
      pos: { x: 3, y:0},
      vel: { x: 1, y:0} // moving down
    }
    moveRobot(grid, roboto);
    expect (roboto.pos).toStrictEqual( { x: 0, y: 0})
  })

  test('sample 1- parse', () => {
    var grid: Pos = { x: 3, y:3}
    var roboto : Robot = {
      pos: { x: 3, y:0},
      vel: { x: 1, y:0} // moving down
    }
    expect (Robot.from("p=3,0 v=1,0")).toStrictEqual(roboto)
  })

  test('sample 1- samole', () => {
    var grid: Pos = { x: 10, y:6}
    var roboto = Robot.from("p=2,4 v=2,-3")
    displayRobots(grid, [roboto])
    moveRobot(grid, roboto);
    displayRobots(grid, [roboto])

    moveRobot(grid, roboto);
    displayRobots(grid, [roboto])

    moveRobot(grid, roboto);
    displayRobots(grid, [roboto])
    moveRobot(grid, roboto);
    displayRobots(grid, [roboto])
    moveRobot(grid, roboto);
    displayRobots(grid, [roboto])
  })
 
  test('sample 1- Big samole', () => {
    var grid: Pos = { x: 10, y:6}

    const data = readTestData('./src/day14/input.sample.txt');
    var robots = Robot.fromArray(data)
    displayRobots(grid, robots)

    moveRobots(grid, robots, 100)
    var quas = buildQuads(grid)
    expect(countQuad(quas[0], robots)).toBe(1)
    expect(countQuad(quas[1], robots)).toBe(3)
    expect(countQuad(quas[2], robots)).toBe(4)
    expect(countQuad(quas[3], robots)).toBe(1)
    expect(safetyFactor(grid, robots)).toBe(12)
    
  })

  test('part 1', () => {
    const data = readTestData('./src/day14/input.txt');
    // 101, 103
    var grid: Pos = { x: 100, y:102}
    var robots = data.map (it => Robot.from(it))
    displayRobots(grid, robots)

    moveRobots(grid, robots, 100)
    expect(safetyFactor(grid, robots)).toBe(228690000)
  });

  test('part 2', () => {
    const data = readTestData('./src/day14/input.txt');

    var grid: Pos = { x: 100, y:102}
    var robots = data.map (it => Robot.from(it))
    var count = findTree(grid, robots)

    expect (count).toBe(7093)
  });
})