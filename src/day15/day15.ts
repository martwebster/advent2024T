export enum Cell {
    Space = ".",
    Wall = "#",
    Box = "O",
    Current = "@",
    LeftBox = "[",
    RightBox = "]"
}

export namespace Cell{
    export const from = (data: string[]) : Cell[][] =>{
        var cells : Cell[][] = []
        data.map ( line =>{
            var row : Cell[] = []
            for (let index = 0; index < line.length; index++) {
                const element = line.charAt(index);
                row.push(element as Cell)
            }
            cells.push(row)
        })
        return cells;
    }
}

export enum Movement {
   Up = "^",
   Down = "v",
   Left = "<",
   Right = ">"
}
export namespace Movement{
    export const from = ( line: string) : Movement[] => {
        var row : Movement[] = []
        for (let index = 0; index < line.length; index++) {
            const element = line.charAt(index);
            row.push(element as Movement)
        }
        return row;
    }
}

export const getNextPosition = (pos: Pos, movement: Movement): Pos =>{
    switch (movement) {
        case Movement.Down:
            return {
                x: pos.x,
                y: pos.y+1
            }
        case Movement.Up:
            return {
                x: pos.x,
                y: pos.y-1
            }
        case Movement.Left:
            return {
                x: pos.x-1,
                y: pos.y,
            }
        case Movement.Right:
            return {
                x: pos.x+1,
                y: pos.y,
            }
    }
}

export const push = (map: Cell[][], pos: Pos, direction: Movement, check: boolean = false ): boolean =>{
    var next = getNextPosition(pos, direction);
    var nextCell = map[next.y][next.x]
    if (nextCell == Cell.Space){
        if (!check){
           map.swap(pos, next)
        }
        return true;
    }
    if (direction== Movement.Left || direction == Movement.Right){
        if ((nextCell == Cell.Box || nextCell == Cell.RightBox || nextCell == Cell.LeftBox)  
            && push(map, next, direction)){
            if (!check){
               map.swap(pos, next)
            }
            return true;
        }
    } else { 
        if (nextCell == Cell.Box && push(map, next ,direction)){
            if (!check){
                map.swap(pos, next)
            }
            return true;
        }
        if (nextCell == Cell.LeftBox){
            var nextRight = getNextPosition(next, Movement.Right)
            // check if can push both
            var canPush = push( map, next, direction, true) && push( map, nextRight, direction, true)
            if (!check && canPush){
                push( map, next, direction, check) 
                push( map, nextRight, direction, check)
                map.swap(pos, next)
            }
            return canPush;
        }
        if (nextCell == Cell.RightBox){
            var nextLeft = getNextPosition(next, Movement.Left)
            var canPush = push( map, next, direction,true) && push( map, nextLeft, direction,true)
            if (!check && canPush){
                push( map, next, direction,check) 
                push( map, nextLeft, direction, check)
                map.swap(pos, next)
            }
            return canPush;
        }
    }
    return false;
}

export const move = (map: Cell[][], pos: Pos, direction: Movement) : Pos=>{
    if (direction==Movement.Left){
        if (push(map, pos, Movement.Left)){
            return getNextPosition(pos, Movement.Left)
        }
    } else if (direction == Movement.Right){
        if (push(map, pos, Movement.Right)){
            return getNextPosition(pos, Movement.Right)
        }
    } else if (direction == Movement.Up){
        if (push(map, pos, Movement.Up, true)){
            push(map, pos, Movement.Up, false)
            return {
                x: pos.x,
                y: pos.y-1
            } as Pos
        }
    } else if (direction = Movement.Down){
        if (push(map, pos, Movement.Down, true)){
            push(map, pos, Movement.Down, false)
            return {
                x: pos.x,
                y: pos.y+1
            } as Pos
        }
    }
    return pos;
}
export const displayMap = ( map: Cell[][]) =>{
    map.forEach( row =>{
        var line = "";
        for (let index = 0; index < row.length; index++) {
            const element = row[index];
            line += element
        }
        console.log(line)
    })
    console.log()
} 

export const supersize = (line: string) =>{
    return line.replaceAll("#",'##')
        .replaceAll("O",'[]')
        .replaceAll(".",'..')
        .replaceAll("@",'@.')
} 

// part 2
export const buildSuperMap = (data: string[]): Cell[][] =>{
    return Cell.from(data.map (line => supersize(line)))
}