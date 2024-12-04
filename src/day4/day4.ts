type Movement = (pos: Pos) => Pos;

export const moveUp = (pos: Pos): Pos => { return { x: pos.x, y: pos.y-1}}
export const moveLeft = (pos: Pos): Pos => { return { x: pos.x-1, y: pos.y}}
export const moveRight = (pos: Pos): Pos => { return { x: pos.x+1, y: pos.y}}
export const moveDown = (pos: Pos): Pos => { return { x: pos.x, y: pos.y+1}}

export const moveUpLeft = (pos: Pos): Pos => { return { x: pos.x-1, y: pos.y-1}}
export const moveUpRight = (pos: Pos): Pos => { return { x: pos.x+1, y: pos.y-1}}
export const moveDownLeft = (pos: Pos): Pos => { return { x: pos.x-1, y: pos.y+1}}
export const moveDownRight = (pos: Pos): Pos => { return { x: pos.x+1, y: pos.y+1}}

export const checkForWord = (grid: String[], startPos: Pos, word: String, move: Movement) : boolean=>{
    var pos = startPos;
    for (let index = 0; index < word.length; index++) {
        const letter = grid[pos.y]?.charAt(pos.x)
        if (letter!== word.charAt(index)){
            return false;
        }
        pos = move(pos);
    }
    return true;
}

export const countPresent = (grid: String[], pos: Pos, word: String = "XMAS"): number => {
    var count = 0;
    if (checkForWord(grid, pos, word, moveDown)) count++
    if (checkForWord(grid, pos, word, moveDownLeft)) count++
    if (checkForWord(grid, pos, word, moveDownRight)) count++
    if (checkForWord(grid, pos, word, moveLeft)) count++
    if (checkForWord(grid, pos, word, moveRight)) count++
    if (checkForWord(grid, pos, word, moveUp)) count++
    if (checkForWord(grid, pos, word, moveUpLeft)) count++
    if (checkForWord(grid, pos, word, moveUpRight)) count++
    return count;
}

// part 1
export const countXmas = (grid: String[]): number => {
    return grid
        .scanAll() // generates an array of positions, one for each row, column of a grid
        .sumOf( pos => countPresent(grid, pos))
}

export const countX = (grid: String[], pos: Pos, word: string): number => {
    var count = 0;
    if (checkForWord(grid, { x: pos.x-1, y: pos.y-1 }, word, moveDownRight)) count++
    if (checkForWord(grid, { x: pos.x+1, y: pos.y-1 }, word, moveDownLeft)) count++
    if (checkForWord(grid, { x: pos.x+1, y: pos.y+1 }, word, moveUpLeft)) count++
    if (checkForWord(grid, { x: pos.x-1, y: pos.y+1 }, word, moveUpRight)) count++
    return count===2? 1:0
}

// Part 2
export const countMasX =  (grid: String[]): number => {
    return grid.scanAll().sumOf( pos => countX(grid, pos, "MAS"))
}