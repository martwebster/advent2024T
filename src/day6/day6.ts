interface Cell {
    obstruction: boolean;
    visited: boolean;
    direction: string;
    start: boolean;
}

const parseLine = (data: string): Cell[] =>{
    const line : Cell[] = []
    for (let index = 0; index < data.length; index++) {
        const element = data.charAt(index);
        line.push ({
          obstruction: element === "#",
          direction: element === '^'? "^" : "",
          visited: false,
          start: element === '^'? true :false,
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

export const turn = (direction: string ): string => {
    if (direction===">") return "v";
    if (direction==="v") return "<";
    if (direction==="<") return "^";
    if (direction==="^") return ">"
    throw Error("Invalid direction"+direction)
}

export const move = (map: Cell[][], pos: Pos) : Pos | undefined =>{
    const current = getCell(map, pos);
    current!.visited = true;
    
    var direction = current!.direction
    var nextPos = pos;
    if (direction=== "^") { 
        nextPos = {
            x: pos.x,
            y: pos.y-1
        }
    } else if (direction === ">"){
        nextPos = {
            x: pos.x+1,
            y: pos.y,
        }
    } else if (direction === "v"){
        nextPos = {
            x: pos.x,
            y: pos.y+1,
        }
    } else if (direction === "<"){
        nextPos = {
            x: pos.x-1,
            y: pos.y,
        }
    }

    var next = getCell(map, nextPos)
    if (next === undefined){
        current!.direction = ''
        return undefined
    }
    if (next?.obstruction){
        nextPos = pos
        direction = turn(current!.direction)
    }
    current!.direction = ''
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
        else if (it.direction.length>0) display += it.direction
        else display = display + "."
    })
    console.log(display);
}

// Helper function to print the map
export const printMap = (map: Cell[][]): void =>{
   map.forEach ( printLine)
   console.log("")
}