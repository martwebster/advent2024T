type Movement = (pos: Pos) => Pos;

export const moveLeft = (pos: Pos): Pos => { return { x: pos.x-1, y: pos.y}}
export const moveRight = (pos: Pos): Pos => { return { x: pos.x+1, y: pos.y}}
export const moveUp = (pos: Pos): Pos => { return { x: pos.x, y: pos.y-1}}
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
export const countXmas =  (rows: String[]): number => {
    var total = 0;
    for (let yPos = 0; yPos < rows.length; yPos++) {
        for (let xPos = 0; xPos < rows[0].length; xPos++) {
            total = total + countPresent(rows, {
                x: xPos, 
                y: yPos
            })
        }
    }
    return total;
}

export const countX = (rows: String[], xPos: number, yPos: number, word: string): number => {
    var count = 0;
    if (checkForWord(rows, { x: xPos-1, y: yPos-1 }, word, moveDownRight)) count++
    if (checkForWord(rows, { x: xPos+1, y: yPos-1 }, word, moveDownLeft)) count++
    if (checkForWord(rows, { x: xPos+1, y: yPos+1 }, word, moveUpLeft)) count++
    if (checkForWord(rows, { x: xPos-1, y: yPos+1 }, word, moveUpRight)) count++
    if (count===2){
        return 1;
    }
    return 0;
}

// Part 2
export const countMasX =  (rows: String[]): number => {
    var total = 0;
    for (let yPos = 0; yPos < rows.length; yPos++) {
        for (let xPos = 0; xPos < rows[0].length; xPos++) {
            total = total + countX(rows, xPos, yPos, "MAS")
        }
    }
    return total;
}