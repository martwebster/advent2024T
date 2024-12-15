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

export enum Direction {
   Up = "^",
   Down = "v",
   Left = "<",
   Right = ">"
}
export namespace Direction{
    export const from = ( line: string) : Direction[] => {
        var row : Direction[] = []
        for (let index = 0; index < line.length; index++) {
            const element = line.charAt(index);
            row.push(element as Direction)
        }
        return row;
    }
}

export const getNextDirection = (pos: Pos, direction: Direction): Pos =>{
    switch (direction) {
        case Direction.Down:
            return {
                x: pos.x,
                y: pos.y+1
            }
        case Direction.Up:
            return {
                x: pos.x,
                y: pos.y-1
            }
        case Direction.Left:
            return {
                x: pos.x-1,
                y: pos.y,
            }
        case Direction.Right:
            return {
                x: pos.x+1,
                y: pos.y,
            }
    }
}

export const push = (map: Cell[][], pos: Pos, direction: Direction, check: boolean = false ): boolean =>{
    var next = getNextDirection(pos, direction);
    var nextCell = map[next.y][next.x]
    if (nextCell == Cell.Space){
        if (!check){
           map.swap(pos, next)
        }
        return true;
    }
    if (direction== Direction.Left || direction == Direction.Right){
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
            var nextRight = getNextDirection(next, Direction.Right)
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
            var nextLeft = getNextDirection(next, Direction.Left)
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

export const move = (map: Cell[][], pos: Pos, direction: Direction) : Pos=>{
    if (direction==Direction.Left){
        if (push(map, pos, Direction.Left)){
            return getNextDirection(pos, Direction.Left)
        }
    } else if (direction == Direction.Right){
        if (push(map, pos, Direction.Right)){
            return getNextDirection(pos, Direction.Right)
        }
    } else if (direction == Direction.Up){
        if (push(map, pos, Direction.Up, true)){
            push(map, pos, Direction.Up, false)
            return {
                x: pos.x,
                y: pos.y-1
            } as Pos
        }
    } else if (direction = Direction.Down){
        if (push(map, pos, Direction.Down, true)){
            push(map, pos, Direction.Down, false)
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