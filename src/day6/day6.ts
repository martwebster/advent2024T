enum direction {
    Up = "^",
    Down = "v",
    Left = "L",
    Right = ">",
    North = "^"
}

namespace Direction {
    export function turn(direction: Direction ): Direction {
        switch (direction) {
            // Turn anti-clockwise!. Ha, shame there isn't an Uncle clockwise
            case Direction.Up: return Direction.Right;
            case Direction.Down: return Direction.Left;
            case Direction.Left: return Direction.Up;
            case Direction.Right: return Direction.Down;
        }
    }

    export const nextPos = (direction : Direction, pos: Pos): Pos =>{
        const nextPos = {}
        switch (direction) {
            case Direction.Up:
                return {
                    x: pos.x,
                    y: pos.y-1
                }
            case Direction.Right:
                nextPos = {
                    x: pos.x+1,
                    y: pos.y,
                }
            case Direction.Down: 
                return {
                    x: pos.x,
                    y: pos.y+1,
                }
            case Direction.Left:
                return {
                    x: pos.x-1,
                    y: pos.y,
                }
        }
        return nextPos;
    }
}

/**
A Cell
*/
interface Cell {
    obstruction: boolean;
    visited: Boolean;
    start: boolean;
    direction?: Direction;// This can be undefined
}

// AB#11220 - Change to parse line
const parseLine = (data: string): Cell[] =>{
    const line : Cell[] = []
    for (let index = 0; index < data.length; index++) {
        const element = data.charAt(index);
        line.push ({
          obstruction: element === "#",
          direction: element === Direction.Up? Direction.Up:undefined,
          visited: false,
          start: element === Direction.Up? true :false,
        })
    }
    return line;
}

//
// export const myPos = {}

export const parseMap = (data: String[]): Cell[][] =>{
    return data.map (parseLine)   
}

export const getTheCell = (map: Cell[][], pos: Pos) : Cell =>{
    const rowFromTheMap = map[pos.y];
    if (rowFromTheMap === undefined){
        return undefined
    }
    return row[pos.x] || undefined;
} 

// Main function to move in the map
export const move = (map: Cell[][], pos: Pos) : Pos | undefined =>{
    const current = getCell(map, pos);
    current!.visited = true;
    
    let direction = current!.direction
    var nextPos = Direction.nextPos(direction!, pos);
    var next = getCell(map, nextPos)
    // check if off the map, which means that you have finished
    if (next === undefined){
        current!.direction = undefined
        return undefined
    }
    // check if obstruction, then turn, but don't move 
    if (next.obstruction){
        nextPos = pos
        direction = Direction.turn(current!.direction!)
    }
    current!.direction = undefined
    next = getCell(map, nextPos);
    next!.direction = direction

    return nextPos
} 

export const getStartPos = (map: Cell[][]): Pos | undefined =>{
    return map.scan ( cell => cell.start).first()
}

export const calculateVisitedCells = (map: Cell[][]) : number | undefined =>{
    var pos = getStartPos(map);
    var steps = 0;
    while (pos){
        pos = move(map, pos)
        steps ++;
        if (steps > 10_000){
            return undefined;
        }
    }
    return map.flat().filter (it => it.visited).length
}

// Part 2
export const countObstacles = (data: string[]): number =>{
    const map = parseMap(data);
    calculateVisited(map)
    
    var visited = map.scan ( cell => cell.visited)

    return visited.filter( obstPos => {
        const newMap = parseMap(data);
        newMap[obstPos.y][obstPos.x].obstruction = true;
        const endResultCount = calculateVisitedCells(newMap)
        return (endResultCount=== undefined)
    }).length;
}
