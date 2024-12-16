export enum Dir {
    North = "N",
    East = "E", 
    South = "S",
    West = "W",
}
export namespace Dir {
    export const turnClock= (dir : Dir) : Dir =>{
        switch (dir) {
            case Dir.North: return Dir.East
            case Dir.East: return Dir.South
            case Dir.South: return Dir.West
            case Dir.West: return Dir.North
        }
    } 

    export const turnAnti= (dir : Dir) : Dir =>{
        switch (dir) {
            case Dir.North: return Dir.West
            case Dir.West: return Dir.South
            case Dir.South: return Dir.East
            case Dir.East: return Dir.North
        }
    } 
}

export interface Route {
    cost : number,
    direction : Dir,
    positon : Pos,
    previous : string[]
}

export const createMaze = (data: string[]) : string[][] =>{
    return data.map (it => it.split("")) 
}

export const getStart = (maze: string[][]) : Route =>{
    var pos = maze.scan (it => it == "S")[0]
    return {
        cost: 0,
        direction: Dir.East,
        positon: pos, 
        previous: []
    }
}

export const getCell = (maze: string[][], pos: Pos): string =>{
    return maze[pos.y][pos.x]
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

export const move = (maze: string[][], route: Route): Route[] =>{
    var routes : Route[] = [];

    // straight
    var strPos = nextPos(route.positon, route.direction)
    var cell = getCell(maze, strPos);
    if ((cell=="." || cell=="E") && !route.previous.includes(strPos.x+ ":"+ strPos.y)){
        routes.push({
            cost: route.cost + 1,
            direction: route.direction,
            positon: strPos, 
            previous: [... route.previous,  route.positon.x + ":" + route.positon.y]
        })
    }

    // clockwise
    var clockDir = Dir.turnClock(route.direction);
    var clockPos = nextPos(route.positon, clockDir)
    var cell = getCell(maze, clockPos);
    if ((cell=="." || cell=="E") && !route.previous.includes(clockPos.x + ":"+ clockPos.y)){
        routes.push({
            cost: route.cost + 1001,
            direction: clockDir,
            positon: clockPos, 
            previous: [... route.previous,  route.positon.x + ":" + route.positon.y]
        })
    }

    // clockwise
    var antiClockDir = Dir.turnAnti(route.direction);
    var antiClockPos = nextPos(route.positon, antiClockDir)
    var cell = getCell(maze, antiClockPos);
    if ((cell=="." || cell== "E") && !route.previous.includes(antiClockPos.x + ":"+ antiClockPos.y)){
        routes.push({
            cost: route.cost + 1001,
            direction: antiClockDir,
            positon: antiClockPos, 
            previous: [... route.previous,  route.positon.x + ":" + route.positon.y]
        })
    }
    return routes
}

export const moveRoutes = (maze: string[][], routes: Route[]): Route[] =>{
    return routes.flatMap ( it=> move(maze, it))
}
export const isCheapest = (route: Route, routes: Route[]): boolean =>{
   var previus = routes.filter(it => it.previous.includes(route.positon.x + ":" + route.positon.y))
   if (previus.length==0){
     return true;
   }
   var cheaper = previus.find (it => it.cost < route.cost)
   return (cheaper!= undefined)
}

export const moveToEnd = (maze: string[][]): number =>{
    var end = Number.MAX_VALUE;
    var routes = [getStart(maze)]
    var count = 0
    while (routes.length>0){
        routes = moveRoutes(maze, routes)
        count++
        routes = routes.filter (it => it.cost < end)
        routes = routes.filter (it => isCheapest(it, routes))

        var endRoutes = routes.filter (it => getCell(maze, it.positon)=="E");
        if (endRoutes.length>0){
            end = Math.min ( end, endRoutes.minOf( it=> it.cost))
        }
        console.log(routes.length)
        if (count > 1000 || routes.length>10000){
            console.log(routes.length)
        }
    }
    return end;
}

export const displayMaze= (maze: string[][], routes: Route[]): void =>{
    
    for (let y = 0; y < maze.length; y++) {
        const line = maze[y];
        var result = ""
        for (let x = 0; x < line.length; x++) {
            var cell = getCell(maze, {
                x,
                y
            })
            if (cell!= "."){
                result += cell
            } else{
                result += routes.countOf ( it => it.positon.x ==x && it.positon.y==y)
            }
        }
        console.log(line)
    }
    console.log("--")
}