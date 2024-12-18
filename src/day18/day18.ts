
export interface Cell {
    content : string,
    visited : boolean
}

export const getBytes = (data: string[], bytesFrom: number, bytesTo?: number): Pos[] =>{
    var positions = data.map (it => ( {
        x: Number(it.substringBefore(",")),
        y: Number(it.substringAfter(","))
    }))
    if (bytesTo!= undefined){
        return positions.slice(bytesFrom,bytesTo)
    }
    return positions.slice(bytesFrom)
} 


export const createMemory = (data: string[], gridSize :number, bytes: number) : Cell[][] =>{
    var positions = getBytes(data, 0, bytes)
    var results : Cell[][] = []
    for (let y = 0; y <= gridSize; y++) {
        var row : Cell[] = []
        for (let x = 0; x <= gridSize; x++) {
            if (positions.find(it => it.x == x && it.y == y)){
                row.push( {
                    content: "#",
                    visited: false
                })
            } else{
                row.push( {
                    content: ".",
                    visited: false
                })
            }
        }
        results.push(row)
    }
    return results;
}

export const getStart = (maze: Cell[][]) : Pos =>{
    return {
        x: 0,
        y: 0
    }
}

export const getCell = (memory: Cell[][], pos: Pos): Cell | undefined =>{
    if (pos.y< 0 || pos.x< 0) {
        return undefined;
    }
    if (pos.x> memory.length-1){
        return undefined;
    }
    if (pos.y> memory.length-1){
        return undefined;
    }
    return memory[pos.y][pos.x]
}


export const move = (memory: Cell[][], pos: Pos): Pos[] =>{
    var positions : Pos[] = [];

    // up
    var up : Pos = {
        x: pos.x,
        y: pos.y -1
    }
    var upCell = getCell(memory, up);
    if (upCell !== undefined && !upCell.visited && upCell.content != '#'){
        upCell.visited = true;
        positions.push(up)
    }

    var down : Pos = {
        x: pos.x,
        y: pos.y +1
    }
    var downCell = getCell(memory, down);
    if (downCell !== undefined && !downCell.visited && downCell.content != '#'){
        downCell.visited = true;
        positions.push(down)
    }


    var left : Pos = {
        x: pos.x-1,
        y: pos.y
    }
    var leftCell = getCell(memory, left);
    if (leftCell !== undefined && !leftCell.visited && leftCell.content != '#'){
        leftCell.visited = true;
        positions.push(left)
    }

    var right : Pos = {
        x: pos.x+1,
        y: pos.y
    }    
    var rightCell = getCell(memory, right);
    if (rightCell !== undefined && !rightCell.visited && rightCell.content != '#'){
        rightCell.visited = true;
        positions.push(right)
    }
    return positions
}

export const moveStep = (memory: Cell[][], routes: Pos[]): Pos[] =>{
    return routes.flatMap ( it=> move(memory, it))
}

// part 1
export const moveToEnd = (memory: Cell[][], gridSize : number): number =>{
    var count = 0;
    var positions = [getStart(memory)]
    while (positions.length>0){
        positions = moveStep(memory, positions)
        count++
        if (positions.find (it => it.x ==gridSize && it.y==gridSize)){
            return count;
        }
    }
    return -1;
}

// part2
export const findBlock = (memory: Cell[][], extraBytes: Pos[], gridSize: number): Pos| undefined =>{

    return extraBytes.find (byte =>{
        memory.flat().forEach (it => it.visited = false)
        var cell = getCell(memory, byte);
        cell!.content = "#"
        var count = moveToEnd(memory, gridSize)
        if (count== -1){
            return byte
        }
    })
}


export const displayMemory = (memory: Cell[][]): void =>{
   console.log("")
    memory.forEach( row => {
        var line = row.map (cell =>{
            if (cell.content=="#"){
                return "#"
            }
            if (cell.visited){
                return "0"
            }
            return "."
        }).join("")
        console.log(line)
    })
}
