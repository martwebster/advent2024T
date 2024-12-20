
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

export const canVisit = (cell: Cell, pos: Pos, nuclear: Pos[]): boolean =>{
    if (cell.visited){
        return false;
    }
    if (cell.content == "." || cell.content=="E"){
        return true;
    }
    if (nuclear.includesObject(pos)){
        return true;
    }

    return false;

    //return (cell.content=="." || cell.content=="E")  && !cell.visited
}

export const moveCell = (track: Cell[][], nuclear: Pos[], route: Route, pos: Pos, result: Route[]) =>{
    var cell = getCell(track, pos);
    if (canVisit(cell, pos, nuclear)){
        cell.visited = true;
        
        result.push({
            ...route,
            pos: pos
        })
    }
}

export const move = (memory: Cell[][], route: Route, nuclear: Pos[]): Route[] =>{
    var next : Route[] = [];

    // up
    var up : Pos = {
        x: route.pos.x,
        y: route.pos.y -1
    }
    moveCell(memory, nuclear, route, up, next,)


    var down : Pos = {
        x: route.pos.x,
        y: route.pos.y +1
    }
    moveCell(memory, nuclear,route, down, next)

    var left : Pos = {
        x: route.pos.x-1,
        y: route.pos.y
    }
    moveCell(memory, nuclear, route, left, next)

    var right : Pos = {
        x: route.pos.x+1,
        y: route.pos.y
    }    
    moveCell(memory, nuclear, route, right, next)
    return next
}

export const moveStep = (track: Cell[][], routes: Route[], nuclear: Pos[]): Route[] =>{
    return routes.flatMap ( it=> move(track, it, nuclear))
}

export const moveToEnd = (track: Cell[][], nuclear: Pos[]): number =>{
    track.flat().forEach (it=> it.visited = false)
    var count = 0;
    var startRoute = {
        pos:  getStart(track)
    }
    var routes = [ startRoute]
    var end = getEnd(track)
    while (!routes.find (it => it.pos.x ==end.x && it.pos.y==end.y)){
        routes = moveStep(track, routes, nuclear)
        count++
    }
    return count;
}

export const getInnerTrack = ( track: Cell[][]) : Pos[] =>{
    return track.scan( item => item.content=="#")
       .filter (it => it.x>0 && it.y>0 && it.x< track[0].length-1 && it.y < track.length-1)
}

export const getCounts = (track: Cell[][], inner: Pos[]) : number=>{
    var baseline = moveToEnd(track, [])
    var result : Map<number, number> = new Map();
    var goodOnes = 0;
    inner.forEach (pos =>{
        var nuclear : Pos[] = [pos]
        var count = moveToEnd(track, nuclear)
        var saving = baseline - count;

        if (saving>= 100){
            goodOnes++
        }

        var current = result.get(saving);
        if (current== undefined){
            current = 0
        }
        result.set(saving, current+1)
    })
    console.log(result)
    console.log(goodOnes)
    return goodOnes

}
