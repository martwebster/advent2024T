import { repeat } from "../utility/extensions"

export interface Robot {
    pos: Pos, 
    vel : Pos,
}

export namespace Robot {
    export const from = (line: string) : Robot =>{
        return {
            pos : {
                x: Number(line.substringBetween("p=", ",")),
                y: Number(line.substringBetween(",", " "))
            }, 
            vel : {
                x: Number(line.substringAfter("v=").substringBefore(",")),
                y: Number(line.substringAfterLast(","))
            }
        }
    }
    export const fromArray = (data: string[]):Robot[] =>{
        return data.map (Robot.from)
    }
}

export const moveRobot = (grid: Pos, robot: Robot) =>{
    var nextPos : Pos = {
      x: robot.pos.x + robot.vel.x, 
      y: robot.pos.y + robot.vel.y
    } 
    if (nextPos.y< 0) {
        nextPos.y = grid.y + nextPos.y +1
    }
    if (nextPos.x< 0) {
        nextPos.x = grid.x + nextPos.x +1
    }
    if (nextPos.y > grid.y) {
        nextPos.y = nextPos.y - grid.y -1
    }
    if (nextPos.x > grid.x) {
        nextPos.x = nextPos.x - grid.x -1
    }
    robot.pos = nextPos;
}

export const moveRobots = (grid: Pos, robots: Robot[], times: number) => {
    repeat(times, () => {
        robots.forEach (it => moveRobot(grid, it))
    })
    displayRobots(grid, robots)
}

export const buildDisplay = (grid: Pos, robots : Robot[]): string[] =>{
    var display : string[] = []
    for (let y = 0; y <= grid.y; y++) {
        var line = "";
        for (let x = 0; x<= grid.x; x++) {
            const robAtPos = robots.countOf(it => it.pos.x == x && it.pos.y == y)
            line += robAtPos == 0? ".": robAtPos
        }
        display.push(line)
    }
    return display;
}
export const displayRobots = (grid: Pos, robots: Robot[]) =>{
    buildDisplay(grid, robots).forEach (it => console.log(it))
    console.log("")
}

interface Quad {
    start: Pos, 
    end : Pos
}

export const buildQuads = (grid: Pos) : Quad[] =>{
    return [
        {
            start: {
                x:0,
                y:0
            }, 
            end : {
                x: grid.x/2- 1,
                y: grid.y/2 -1
            }
        },
        {
            start: {
                x:grid.x/2+1,
                y:0
            }, 
            end : {
                x: grid.x,
                y: grid.y/2 -1
            }
        },
        {
            start: {
                x:0,
                y:grid.y/2 + 1
            }, 
            end : {
                x: grid.x/2 -1,
                y: grid.y
            }
        },
        {
            start: {
                x:grid.x/2 + 1,
                y:grid.y/2 + 1
            }, 
            end : {
                x: grid.x,
                y: grid.y
            }
        },  
    ]
}

export const countQuad = (quad: Quad, robots: Robot[]): number =>{
    var { start, end } = quad;
    var total =0
    
    for (let y = start.y ; y<= end.y; y++) {
        for (let x = start.x ; x<= end.x; x++) {
            total += robots.countOf (it => it.pos.x == x && it.pos.y == y)
        }
    }
    return total;
}

export const safetyFactor = ( grid: Pos, robots: Robot[]): number =>{
    var total = 1;
    buildQuads(grid).forEach (quad => { 
        total = total * countQuad(quad, robots)
    })
    return total;
}

// Part 2
// reused the display - complete over-engineered, when easier to order by x, and y, then look for consecutive x's
export const isTree = (grid: Pos, robots: Robot[] ): boolean =>{
    var toCheckFor = "1".repeat(30)
    var display = buildDisplay(grid, robots)
    return display.some ( it => it.includes(toCheckFor))
}

export const findTree = (grid: Pos, robots: Robot[]): number =>{
  var tree = false;
  var moves = 0
  while (!tree){
     moves++
     robots.forEach (it => moveRobot(grid, it))
     tree = isTree(grid, robots)
  }
  displayRobots(grid, robots)
  return moves;
}