
export interface Cell {
    content : string,
    minVisited : number,
}

export interface Route {
    pos: Pos,
    cheatStart?: Pos,
    cheatEnd?: Pos, 
    cheatCount? : number
}

export const createTrack = (data: string[]) : Cell[][] =>{
    const results: Cell[][] = []
    for (let y = 0; y < data.length; y++) {
        const row: Cell[] = []
        for (let x = 0; x < data[y].length; x++) {
            row.push( {
                content: data[y].charAt(x),
                minVisited: Number.MAX_VALUE
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

export const canVisit = (cell: Cell, steps: number): boolean =>{
    if (cell.minVisited< steps){
        return false;
    }
    return cell.content == "." || cell.content == "E";
}

export const moveCell = (track: Cell[][], steps: number, route: Route, pos: Pos, result: Route[]) =>{
    const cell = getCell(track, pos)
    if (canVisit(cell, steps)){
        cell.minVisited = steps
        result.push({
            ...route,
            pos: pos
        })
    }
}

export const move = (memory: Cell[][], route: Route, steps: number): Route[] =>{
    const next: Route[] = []

    const up: Pos = {
        x: route.pos.x,
        y: route.pos.y - 1
    }
    moveCell(memory, steps, route, up, next,)

    const down: Pos = {
        x: route.pos.x,
        y: route.pos.y + 1
    }
    moveCell(memory, steps,route, down, next)

    const left: Pos = {
        x: route.pos.x - 1,
        y: route.pos.y
    }
    moveCell(memory, steps, route, left, next)

    const right: Pos = {
        x: route.pos.x + 1,
        y: route.pos.y
    }
    moveCell(memory, steps, route, right, next)
    return next
}

export const moveStep = (track: Cell[][], routes: Route[], steps: number): Route[] =>{
    return routes.flatMap ( it=> move(track, it, steps))
}

export const moveToEnd = (track: Cell[][]): number =>{
    track.flat().forEach (it=> it.minVisited = Number.MAX_VALUE)
    let count = 0
    const startRoute = {
        pos: getStart(track)
    }
    let routes = [startRoute]
    let end = getEnd(track)
    let steps = 0
    while (!routes.find (it => it.pos.x ==end.x && it.pos.y==end.y)){
        steps++
        routes = moveStep(track, routes, steps)
        count++
    }
    return count;
}

export const getInnerTrack = ( track: Cell[][]) : Pos[] =>{
    return track.scan( item => item.content=="#")
       .filter (it => it.x>0 && it.y>0 && it.x< track[0].length-1 && it.y < track.length-1)
}

export const getCounts = (track: Cell[][], inner: Pos[]) : number=>{
    const baseline = moveToEnd(track)
    const result: Map<number, number> = new Map()
    let goodOnes = 0
    for (const pos of inner) {
        getCell(track, pos).content = "."
        const count = moveToEnd(track)
        const saving = baseline - count

        if (saving>= 100){
            goodOnes++
        }

        let current = result.get(saving)
        if (current== undefined){
            current = 0
        }
        result.set(saving, current+1)
        getCell(track, pos).content = "#"
    }
    console.log(result)
    console.log(goodOnes)
    return goodOnes
}
