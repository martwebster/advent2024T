export interface Region{
    positions: Pos[],
    perimeter: number,
    plant : string,
    topPerim : Pos[], 
    bottomPerim : Pos[],
    leftPerim : Pos[],
    rightPerim : Pos[]
}

export const buildRegions = (garden: string[]):  Region[]=>{
    var regions : Region[] =[]
    for (let y = 0; y < garden.length; y++) {
       for (let x = 0; x < garden[y].length; x++) {
         var currentPos = { x, y }
         const found = regions.map (it => it.positions)
             .flat()
             .find(it => it.x == currentPos.x && it.y==currentPos.y) 
         if (!found){
             regions.push(discoverRegion(garden, currentPos))
         }
       } 
    }
    return regions;
}

const getPlant = (garden: string[], pos : Pos) :string| undefined =>{
    if (pos.y<0 ||  pos.y >= garden.length){
        return undefined
    }
    return garden[pos.y][pos.x]
}

export const flood = (garden: string[], currentPos: Pos, region: Region) =>{
    // move up
    var up : Pos = {
        x: currentPos.x,
        y: currentPos.y-1
    }
    var exists = region.positions.find( it => it.x == up.x && it.y == up.y)
    if (!exists){
        var nextPlant =  getPlant(garden, up)
        if (nextPlant == undefined || nextPlant !== region.plant){
            region.perimeter = region.perimeter+1
            region.topPerim.push(currentPos)
        } else{ 
            region.positions.push(up)
            flood(garden, up, region)
        }
    }
    // move down
    var down : Pos = {
        x: currentPos.x,
        y: currentPos.y+1
    }
    var exists = region.positions.find( it => it.x == down.x && it.y == down.y)
    if (!exists){
        var nextPlant =  getPlant(garden, down)
        if (nextPlant == undefined || nextPlant !== region.plant){
            region.perimeter = region.perimeter+1
            region.bottomPerim.push(currentPos)
        } else{ 
            region.positions.push(down)
            flood(garden, down, region)
        }
    }

    // move left
    var left : Pos = {
        x: currentPos.x-1,
        y: currentPos.y
    }
    var exists = region.positions.find( it => it.x == left.x && it.y == left.y)
    if (!exists){
        var nextPlant =  getPlant(garden, left)
        if (nextPlant == undefined || nextPlant !== region.plant){
            region.perimeter = region.perimeter+1
            region.leftPerim.push(currentPos)
        } else{ 
            region.positions.push(left)
            flood(garden, left, region)
        }
    }

    // move right
    var right : Pos = {
        x: currentPos.x+1,
        y: currentPos.y
    }
    var exists = region.positions.find( it => it.x == right.x && it.y == right.y)
    if (exists){
        return;
    }
    var nextPlant =  getPlant(garden, right)
    if (nextPlant == undefined || nextPlant !== region.plant){
        region.perimeter = region.perimeter+1
        region.rightPerim.push(currentPos)
    } else{ 
        region.positions.push(right)
        flood(garden, right, region)
    }
}

export const discoverRegion = (garden: string[], currentPos : Pos) : Region =>{
    var region : Region = {
        positions : [currentPos],
        perimeter: 0,
        plant: getPlant(garden, currentPos)!, 
        bottomPerim: [],
        topPerim: [],
        leftPerim : [],
        rightPerim : [],
    }
    flood(garden, currentPos, region)

    return region;
}

export const getPrice = (regions: Region[]): number =>{
    return regions.sumOf (it => it.positions.length * it.perimeter)
}

// part 2
export const sides =  (region : Region): number =>{
    return horizontal(region.bottomPerim)+
           horizontal(region.topPerim) +
           vertical(region.leftPerim) +
           vertical(region.rightPerim)
}

export const horizontal = (pos: Pos[]): number =>{
    var minX = pos.minOf ( it => it.x)
    var maxX = pos.maxOf ( it => it.x)
    
    var minY = pos.minOf ( it => it.y)
    var maxY = pos.maxOf ( it => it.y)
    
    var count = 0;
    var current = false
    for (let yPos = minY; yPos <= maxY; yPos++) {
       for (let xPos = minX; xPos <= maxX; xPos++) {
            var found = pos.find (it => it.x == xPos && it.y == yPos)
            if (!found && current){
               // gap
               count++
               current = false
            } else if (found && !current){
                current = true
            }
        }
        // end of the row
        if (current){
            count++
            current = false
        }
    }
    return count
}

export const vertical = (pos: Pos[]): number =>{
    var minX = pos.minOf ( it => it.x)
    var maxX = pos.maxOf ( it => it.x)
    
    var minY = pos.minOf ( it => it.y)
    var maxY = pos.maxOf ( it => it.y)
    
    var count = 0;
    var current = false
    for (let xPos = minX; xPos <= maxX; xPos++) {
        for (let yPos = minY; yPos <= maxY; yPos++) {
            var found = pos.find (it => it.x == xPos && it.y == yPos)
            if (!found && current){
               // gap
               count++
               current = false
            } else if (found && !current){
               current = true
            }
        }
        // end of the column
        if (current){
            count++
            current = false
        }
    }
    return count
}

export const getDiscountPrice = (regions: Region[]): number =>{
    return regions.sumOf (it => it.positions.length * sides(it))
}