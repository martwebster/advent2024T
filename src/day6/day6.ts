enum Direction {
    Up = "^",
    Down = "v",
    Left = "<",
    Right = ">"
}

namespace Direction {
    export const turn = (direction: Direction ): Direction => {
        switch (direction) {
            case Direction.Right: return Direction.Down;
            case Direction.Down: return Direction.Left;
            case Direction.Left: return Direction.Up;
            case Direction.Up: return Direction.Right;
        }
    }

    export const nextPos = (direction : Direction, pos: Pos): Pos =>{
        switch (direction) {
            case Direction.Up:
                return {
                    x: pos.x,
                    y: pos.y-1
                }
            case Direction.Right:
                return {
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
    }
}

interface Cell {
    obstruction: boolean;
    visited: boolean;
    start: boolean;
    direction?: Direction;
}

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

export const parseMap = (data: string[]): Cell[][] =>{
    return data.map (parseLine)   
}

export const getCell = (map: Cell[][], pos: Pos) : Cell| undefined =>{
    const row = map[pos.y];
    if (row === undefined){
        return undefined
    }
    return row[pos.x];
} 

// Main function to move in the map
export const move = (map: Cell[][], pos: Pos) : Pos | undefined =>{
    const current = getCell(map, pos);
    current!.visited = true;
    
    var direction = current!.direction
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
    calculateVisitedCells(map)
    
    var visited = map.scan ( cell => cell.visited)

    return visited.filter( obstPos => {
        const newMap = parseMap(data);
        newMap[obstPos.y][obstPos.x].obstruction = true;
        const endResultCount = calculateVisitedCells(newMap)
        return (endResultCount=== undefined)
    }).length;
}

const printLine = (line : Cell[]) : void =>{
    var display = "";
    line.forEach ( it=> {
        if (it.obstruction) display += "#"
        else if (it.visited) display += "X"
        else if (it.direction) display += it.direction
        else display = display + "."
    })
    console.log(display);
}

// Helper function to print the map
export const printMap = (map: Cell[][]): void =>{
   map.forEach ( printLine)
   console.log("")
}