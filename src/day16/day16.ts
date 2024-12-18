export enum Dir {
    North = "N",
    East = "E", 
    South = "S",
    West = "W",
}

export namespace Dir {
    export const clockwise= (dir : Dir) : Dir =>{
        switch (dir) {
            case Dir.North: return Dir.East
            case Dir.East: return Dir.South
            case Dir.South: return Dir.West
            case Dir.West: return Dir.North
        }
    } 

    export const antiClockwise= (dir : Dir) : Dir =>{
        switch (dir) {
            case Dir.North: return Dir.West
            case Dir.West: return Dir.South
            case Dir.South: return Dir.East
            case Dir.East: return Dir.North
        }
    }

    export const nextPos = (pos: Pos, dir: Dir): Pos =>{
        switch (dir) {
            case Dir.South: {
                return {
                    x: pos.x,
                    y: pos.y +1
                }
            }
            case Dir.North: {
                return {
                    x: pos.x,
                    y: pos.y-1
                }
            }
            case Dir.East: {
                return {
                    x: pos.x+1,
                    y: pos.y,
                }
            }
            case Dir.West: {
                return {
                    x: pos.x-1,
                    y: pos.y,
                }
            }
        }
    }
    
}

export interface Cell {
    content : string,
    minPos : Map<Dir, number>
}

export interface Route {
    cost : number,
    direction : Dir,
    positon : Pos,
    previous : string[]
}

export const createMaze = (data: string[]) : Cell[][] =>{
    return data.map (it => it.split("").map( it => ({
        content: it, 
        minPos: new Map<Dir, number>()
    })))
}

export const getStart = (maze: Cell[][]) : Route =>{
    var pos = maze.scan (it => it.content == "S")[0]
    return {
        cost: 0,
        direction: Dir.East,
        positon: pos, 
        previous: []
    }
}

export const getCell = (maze: Cell[][], pos: Pos): Cell =>{
    return maze[pos.y][pos.x]
}


export const isSetMin = (cell: Cell, dir: Dir,cost: number) : boolean =>{
    var val = cell.minPos.get(dir);
    if (val == undefined || val >= cost) {
        cell.minPos.set(dir, cost)
        return true;
    }
    return false;
}

export const move = (maze: Cell[][], route: Route): Route[] =>{
    var routes : Route[] = [];

    // straight
    var strPos = Dir.nextPos(route.positon, route.direction)
    var cell = getCell(maze, strPos);
    if ((cell.content=="." || cell.content=="E")){
        var next = {
            cost: route.cost + 1,
            direction: route.direction,
            positon: strPos, 
            previous: [... route.previous,  route.positon.x + ":" + route.positon.y]
        }
        if (isSetMin(cell, next.direction, next.cost)){
            routes.push(next)
        }
    }

    // clockwise
    var clockDir = Dir.clockwise(route.direction);
    var clockPos = Dir.nextPos(route.positon, clockDir)
    var cell = getCell(maze, clockPos);
    if ((cell.content=="." || cell.content=="E")){
        var next = {
            cost: route.cost + 1001,
            direction: clockDir,
            positon: clockPos, 
            previous: [... route.previous, route.positon.x + ":" + route.positon.y]
        }
        if (isSetMin(cell, next.direction, next.cost)){
            routes.push(next)
        }
    }

    // anti -clockwise
    var antiClockDir = Dir.antiClockwise(route.direction);
    var antiClockPos = Dir.nextPos(route.positon, antiClockDir)
    var cell = getCell(maze, antiClockPos);
    if ((cell.content=="." || cell.content== "E")){
        var next = {
            cost: route.cost + 1001,
            direction: antiClockDir,
            positon: antiClockPos, 
            previous: [... route.previous,  route.positon.x + ":" + route.positon.y]
        }
        if (isSetMin(cell, next.direction, next.cost)){
            routes.push(next)
        }
    }
    return routes
}

export const moveRoutes = (maze: Cell[][], routes: Route[]): Route[] =>{
    return routes.flatMap ( it=> move(maze, it))
}

// part 1
export const moveToEnd = (maze: Cell[][]): number =>{
    var end = Number.MAX_VALUE;
    var routes = [getStart(maze)]
    while (routes.length>0){
        routes = 
            moveRoutes(maze, routes)
                 .filter (it => it.cost < end)
                
        var endRoutes = routes.filter (it => getCell(maze, it.positon).content=="E");
        if (endRoutes.length>0){
           end = Math.min(end, endRoutes.minOf(it => it.cost))
           routes = routes.filter ( it =>  getCell(maze, it.positon).content!="E")
        }
    }
    return end;
}

export const part2 = (maze: Cell[][]): number =>{
    var end = Number.MAX_VALUE;
    var bestRoutes : Route[] = []
    var routes = [getStart(maze)]
    while (routes.length>0){
        routes = moveRoutes(maze, routes).filter (it => it.cost < end)
        var endRoutes = routes.filter (it => getCell(maze, it.positon).content=="E");
        if (endRoutes.length>0){
            endRoutes.forEach (it => {
                if (it.cost< end){
                    end = it.cost
                    bestRoutes = [it]
                } else if (it.cost == end){
                    bestRoutes.push(it)
                }
            })
           routes = routes.filter ( it =>  getCell(maze, it.positon).content!="E")
        }
    }
    var positions = new Set(bestRoutes.flatMap( it => it.previous))
    return positions.size+1;
}


export const displayMaze= (maze: Cell[][], routes: Route[]): void =>{
    for (let y = 0; y < maze.length; y++) {
        const line = maze[y];
        var result = ""
        for (let x = 0; x < line.length; x++) {
            var cell = getCell(maze, {
                x,
                y
            })
            if (cell.content!= "."){
                result += cell.content
            } else{
                var count = routes.countOf ( it => it.positon.x ==x && it.positon.y==y);
                if (count ==0){
                    result += "."
                } else{
                    result += count
                }
            }
        }
        console.log(result)
    }
    console.log("--")
}

export const displayRoute= (maze: Cell[][], route: Route): void =>{
    for (let y = 0; y < maze.length; y++) {
        const line = maze[y];
        var result = ""
        for (let x = 0; x < line.length; x++) {
            var cell = getCell(maze, {
                x,
                y
            })
            if (cell.content!= "."){
                result += cell.content
            } else{
                if (route.previous.includes(x + ":" + y) || (route.positon.x== x && route.positon.y == y)  ){
                    result += "0"
                } else{
                    result += "."
                }
                
            }
        }
        console.log(result)
    }
    console.log("--")
}