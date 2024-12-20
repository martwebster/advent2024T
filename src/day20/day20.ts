
export interface Cell {
    content : string,
    visited : boolean
}

export interface Route {
    pos: Pos,
    cheatStart?: Pos,
    cheatEnd?: Pos, 
    cheatCount? : number
}

export const createTrack = (data: string[]) : Cell[][] =>{
    var results : Cell[][] = []
    for (let y = 0; y < data.length; y++) {
        var row : Cell[] = []
        for (let x = 0; x < data[y].length; x++) {
            var item = data[y].charAt(x)
            row.push( {
                content: item,
                visited: false
            })
        }
        results.push(row)
    }
    return results;
}

export const getStart = (track: Cell[][]) : Pos =>{
    return track.scan (it => it.content == "S")[0]
}

export const getEnd = (track: Cell[][]) : Pos =>{
    return track.scan (it => it.content == "E")[0]
}


export const getCell = (track: Cell[][], pos: Pos): Cell  =>{
    return track[pos.y][pos.x]
}

export const canVisit = (cell: Cell, cheat: boolean): boolean =>{
    if (cell.visited){
        return false;
    }
    if (cell.content == "." || cell.content=="E"){
        return true;
    }
    return false;

    //return (cell.content=="." || cell.content=="E")  && !cell.visited
}

export const moveCell = (track: Cell[][], cheat: boolean, route: Route, pos: Pos, result: Route[]) =>{
    var cell = getCell(track, pos);
    if (canVisit(cell, cheat)){
        cell.visited = true;
        result.push({
            ...route,
            pos: pos
        })
    }
}

export const move = (memory: Cell[][], route: Route, cheat: boolean): Route[] =>{
    var next : Route[] = [];

    // up
    var up : Pos = {
        x: route.pos.x,
        y: route.pos.y -1
    }
    moveCell(memory, cheat, route, up, next,)


    var down : Pos = {
        x: route.pos.x,
        y: route.pos.y +1
    }
    moveCell(memory, cheat,route, down, next)

    var left : Pos = {
        x: route.pos.x-1,
        y: route.pos.y
    }
    moveCell(memory, cheat, route, left, next)

    var right : Pos = {
        x: route.pos.x+1,
        y: route.pos.y
    }    
    moveCell(memory, cheat, route, right, next)
    return next
}

export const moveStep = (track: Cell[][], routes: Route[], cheat: boolean): Route[] =>{
    return routes.flatMap ( it=> move(track, it, cheat))
}

export const moveToEnd = (track: Cell[][], cheat: boolean = false): number =>{
    track.flat().forEach (it=> it.visited = false)
    var count = 0;
    var startRoute = {
        pos:  getStart(track)
    }
    var routes = [ startRoute]
    var end = getEnd(track)
    while (!routes.find (it => it.pos.x ==end.x && it.pos.y==end.y)){
        routes = moveStep(track, routes, cheat)
        count++
    }
    return count;
}

export const getInnerTrack = ( track: Cell[][]) : Pos[] =>{
    return track.scan( item => item.content=="#")
       .filter (it => it.x>0 && it.y>0 && it.x< track[0].length-1 && it.y < track.length-1)
}

export const getCounts = (track: Cell[][], inner: Pos[]) : number=>{
    var baseline = moveToEnd(track)
    var result : Map<number, number> = new Map();
    var goodOnes = 0;
    inner.forEach (pos =>{
        getCell(track, pos).content = "."
        var count = moveToEnd(track)
        var saving = baseline - count;

        if (saving>= 100){
            goodOnes++
        }

        var current = result.get(saving);
        if (current== undefined){
            current = 0
        }
        result.set(saving, current+1)
        getCell(track, pos).content = "#"
    })
    console.log(result)
    console.log(goodOnes)
    return goodOnes

}
