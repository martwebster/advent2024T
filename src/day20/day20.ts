
export interface Cell {
    content : string,
    stepsLeft?: number,
}

export interface Track{
    cells: Cell[][],
    start: Pos,
    end: Pos,
    baseline?: number
}

export interface Route {
    pos: Pos,
    steps : number,
    cheatCount: number,
    cheatStart?: Pos,
    cheatEnd?: Pos,
    visited: string[]
}

export const createTrack = (data: string[]) : Track =>{
    const results: Cell[][] = []
    for (let y = 0; y < data.length; y++) {
        const row: Cell[] = []
        for (let x = 0; x < data[y].length; x++) {
            row.push( {
                content: data[y].charAt(x),
            })
        }
        results.push(row)
    }

    return {
        cells: results,
        start: getStart(results),
        end: getEnd(results)
    };
}

export const getStart = (cells: Cell[][]) : Pos =>{
    return cells.scan (it => it.content == "S")[0]
}

export const getEnd = (cells: Cell[][]) : Pos =>{
    return cells.scan (it => it.content == "E")[0]
}

export const getCell = (track: Track, pos: Pos): Cell  =>{
    return track.cells[pos.y][pos.x]
}

export const canVisit = (track: Track, cell: Cell, route: Route,maxCheats: number): boolean =>{
    const {pos} = route;
    if (route.visited.includes(pos.x + ":"+ pos.y)){
        return false;
    }
    if (pos.x ==0 || pos.y==0){
        return false;
    }
    if (pos.x == track.cells[0].length-1){
        return false;
    }
    if (pos.y == track.cells.length-1){
        return false;
    }
    if (cell.content == "." || cell.content == "E"){
        if (route.cheatStart!= undefined && route.cheatEnd == undefined){
            route.cheatEnd = pos
            route.steps = route.steps + cell.stepsLeft!;
            route.pos = track.end
        }
        route.visited.push(pos.x + ":"+ pos.y)
        return true;
    }
    // if already cheated
    if (route.cheatEnd){
        return false;
    }
    if (route.cheatCount< maxCheats){
        route.cheatCount++;
        if (route.cheatStart== undefined){
            route.cheatStart = {
                x: Number(route.visited.last()?.substringBefore(":")),
                y: Number(route.visited.last()?.substringAfter(":")),
            }
        }
        route.visited.push(pos.x + ":"+ pos.y)
        return true;
    }
    return false
}

export const moveCell = (track: Track, route: Route, result: Route[], maxCheats: number) =>{
    const cell = getCell(track, route.pos)
    if (canVisit(track, cell, route, maxCheats)){
        result.push({
            ...route,
            steps : route.steps + 1,
        })
    }
}

export const moveRoute = (track: Track, route: Route, maxCheats: number): Route[] =>{
    const next: Route[] = []

    const up: Route = {
        ...route,
        visited: [...route.visited],
        pos: {
            x: route.pos.x,
            y: route.pos.y - 1
        }
    }
    moveCell(track, up, next, maxCheats)

    const down: Route = {
        ...route,
        visited: [...route.visited],
        pos: {
            x: route.pos.x,
            y: route.pos.y + 1
        }
    }
    moveCell(track, down, next, maxCheats)

    const left: Route = {
        ...route,
        visited: [...route.visited],
        pos: {
            x: route.pos.x - 1,
            y: route.pos.y
        }
    }
    moveCell(track, left, next, maxCheats)

    const right: Route = {
        ...route,
        visited: [...route.visited],
        pos: {
            x: route.pos.x + 1,
            y: route.pos.y
        }
    }
    moveCell(track, right, next, maxCheats)
    return next
}

export const getFastest = (track: Track, maxCheats: number): number =>{
    const finishers = moveToEnd(track, maxCheats)
    return finishers.minOf( it => it.steps)
}

export const getSavings = (track: Track, maxCheats: number, saving: number): number =>{
    const cheats = getCheats(track, maxCheats, saving)
    const groupedSavings = new Map<number, number>()
    for (const cheat of cheats) {
        const current = groupedSavings.get(cheat.saving);
        if (current== undefined){
            groupedSavings.set(cheat.saving, 1)
        } else{
            groupedSavings.set(cheat.saving, current+1)
        }
    }
    const ordered = groupedSavings.sort((a, b) => a[0] - b[0])
    console.log(ordered)
    return cheats.length
}

export interface Cheat{
    cheatStart: Pos,
    cheatEnd: Pos,
    saving: number
}

export const getCheats = (track: Track, maxCheats: number, saving: number): Cheat[] =>{
    const startRoute : Route  = {
        pos: track.start,
        steps: 0,
        cheatCount: 0,
        visited: [track.start.x + ":"+ track.start.y]
    }
    let routes = [startRoute]
    const cheats: Cheat[] = []
    while (routes.length>0){
        routes = routes.flatMap ( route=> moveRoute(track, route, maxCheats))
        // record a cheat
        const fin = routes.filter (it => it.pos.x ==track.end.x && it.pos.y==track.end.y)
        for (const route of fin) {
            if (route.cheatStart){
                const cheatSaving = track.baseline! - route.steps
                if (cheatSaving>= saving) {
                    let currentRecord = cheats.find(cheat => cheat.cheatStart.x == route.cheatStart!.x && cheat.cheatStart.y == route.cheatStart!.y
                       && cheat.cheatEnd.x == route.cheatEnd!.x && cheat.cheatEnd.y == route.cheatEnd!.y)
                    if (currentRecord== undefined) {
                        cheats.push({
                            cheatStart: route.cheatStart,
                            cheatEnd: route.cheatEnd!,
                            saving: cheatSaving
                        })
                    } else{
                        if (currentRecord.saving< cheatSaving){
                            currentRecord.saving = cheatSaving
                        }
                    }
                }
            }
        }
        routes = routes.filter( it => !(it.pos.x == track.end.x && it.pos.y == track.end.y))
    }
    return cheats;
}

export const moveToEnd = (track: Track, maxCheats: number): Route[] =>{
    const startRoute : Route  = {
        pos: track.start,
        steps: 0,
        cheatCount: 0,
        visited: [track.start.x + ":"+ track.start.y]
    }
    let routes = [startRoute]
    const finishers: Route[] = []
    while (routes.length>0){
        routes = routes.flatMap ( route=> moveRoute(track, route, maxCheats))
        finishers.push( ...routes.filter (it => it.pos.x ==track.end.x && it.pos.y==track.end.y) )
        routes = routes.filter( it => !(it.pos.x == track.end.x && it.pos.y == track.end.y))
    }
    return finishers;
}

export const recordBaseline = (track: Track, baseline: string[]) =>{
    var stepsLeft = baseline.length-1
    for (const posString of baseline) {
        const pos = {
            x: Number(posString.substringBefore(":")),
            y: Number(posString.substringAfter(":"))
        }
        const cell = getCell(track, pos)
        cell.stepsLeft = stepsLeft;
        stepsLeft--;
    }
    track.baseline = baseline.length-1
}

export const displayTrack= (track: Track) =>{
    const displayRow = (row: Cell[]): string => {
        return row.map( cell => {
            if (cell.content=="."){
                if (cell.stepsLeft != undefined){
                    return "-"
                } else{
                    return "."
                }
            }
            return cell.content;
        }).join("")
    }
    track.cells.forEach( it=> console.log(displayRow(it)))
}