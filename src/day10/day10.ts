
const buildLine = (line: string): number[] =>{
    var result : number[] = []
    for (let index = 0; index < line.length; index++) {
        const element = line[index];
        result.push (Number(element))
    }
    return result
}

export const buildMap=  (data: string[]): number[][] =>{
    return data.map (buildLine)
} 

export const getStartPositions = (map : number[][]): Pos[] =>{
    return map.scan (it => it=== 0)
}

export const isOnMap = (map: number[][], position: Pos, hill: number): boolean =>{
    if (position.x< 0 || position.y < 0){
        return false;
    }
    if (position.y>= map.length){
        return false
    }
    if (position.x>= map[0].length){
        return false
    }
    return map[position.y][position.x] == hill;
}

export const move = (map: number[][], position: Pos, hill: number) : Pos[] =>{
    var result : Pos[] = []
    // move left
    var left : Pos =  {
        x: position.x-1,
        y: position.y
    }
    if (isOnMap(map, left, hill)){
        result.push(left)
    }
    var right : Pos =  {
        x: position.x+1,
        y: position.y
    }
    if (isOnMap(map, right, hill)){
        result.push(right)
    }
    // move up
    var up : Pos =  {
        x: position.x,
        y: position.y-1
    }
    if (isOnMap(map, up, hill)){
        result.push(up)
    }
    // move down
    var down : Pos =  {
        x: position.x,
        y: position.y+1
    }
    if (isOnMap(map, down, hill)){
        result.push(down)
    }
    return result;
}

export const countTrails = (data: string[]): number =>{
    const map = buildMap(data);
    var trails = getStartPositions(map);
    return trails.sumOf (it => countTrailsFromPos(map, it))
}

export const countTrailsFromPos = (map: number[][], startPos: Pos): number =>{
    var trails = [startPos]
    for (let index = 1; index < 10; index++) {
        trails = trails.flatMap (it => move(map, it, index))
    }
    var result : Pos[] = [];
    
    trails.forEach( trail => {
        if (! result.find (it => it.x == trail.x && it.y== trail.y)){
            result.push(trail)
        }
    })

    // for each distinct position.
    // count the numnber of 
    var rating = 
        result.sumOf (it => trails.filter( trail => trail.x == it.x && trail.y== it.y ).length)

    return result.length;
}

export const countRaitingFromPos = (map: number[][], startPos: Pos): number =>{
    var trails = [startPos]
    for (let index = 1; index < 10; index++) {
        trails = trails.flatMap (it => move(map, it, index))
    }
    var result : Pos[] = [];
    
    trails.forEach( trail => {
        if (! result.find (it => it.x == trail.x && it.y== trail.y)){
            result.push(trail)
        }
    })

    // for each distinct position.
    // count the numnber of 
    var rating = 
        result.sumOf (it => trails.filter( trail => trail.x == it.x && trail.y== it.y ).length)

    return rating;
}

export const part2 = (data: string[]): number =>{
    const map = buildMap(data);
    var trails = getStartPositions(map);
    return trails.sumOf (it => countRaitingFromPos(map, it))
}