
const XMAS = "XMAS"

interface Pos { 
    x: number;
    y: number;
}

type Movement = (pos: Pos) => Pos;

const getValue = (rows: String[], xPos: number, yPos: number) : string | undefined =>{
    if (rows[yPos] === undefined){
        return undefined;
    }
    return rows[yPos].charAt(xPos); 
}

const checkForWord = (rows: String[], pos: Pos, word: String, move:Movement) : boolean=>{
    var currentPos = pos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentPos.x, currentPos.y)!== word.charAt(index)){
            return false;
        }
        currentPos = move(currentPos);
    }
    return true;
}

export const checkLeft = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x-1, y: pos.y}}
    return checkForWord(rows, pos, word, move);
}

export const checkRight = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x+1, y: pos.y}}
    return checkForWord(rows, pos, word, move);
}

export const checkUp = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x, y: pos.y-1}}
    return checkForWord(rows, pos, word, move);
}

export const checkDown = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x, y: pos.y+1}}
    return checkForWord(rows, pos, word, move);
}

export const checkUpLeft = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x-1, y: pos.y-1}}
    return checkForWord(rows, pos, word, move);
}

export const checkUpRight = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x+1, y: pos.y-1}}
    return checkForWord(rows, pos, word, move);
}

export const checkDownLeft = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x-1, y: pos.y+1}}
    return checkForWord(rows, pos, word, move);
}

export const checkDownRight = (rows: String[], pos: Pos, word: String = XMAS): boolean =>{
    const move = (pos: Pos): Pos => { return { x: pos.x+1, y: pos.y+1}}
    return checkForWord(rows, pos, word, move);
}

export const countPresent = (rows: String[], pos: Pos): number => {
    var count = 0;
    if (checkDown(rows, pos)) count++
    if (checkDownLeft(rows, pos)) count++
    if (checkDownRight(rows, pos)) count++
    if (checkLeft(rows, pos)) count++
    if (checkRight(rows, pos)) count++
    if (checkUp(rows, pos)) count++
    if (checkUpLeft(rows, pos)) count++
    if (checkUpRight(rows, pos)) count++
    return count;
}

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

// Part 2
export const countX = (rows: String[], xPos: number, yPos: number): number => {
    var count = 0;
    const word = "MAS"
    if (checkDownRight(rows, { x: xPos-1, y: yPos-1}, word)) count++
    if (checkDownLeft(rows, { x: xPos+1, y: yPos-1}, word)) count++
    if (checkUpLeft(rows, { x: xPos+1, y: yPos+1 }, word)) count++
    if (checkUpRight(rows,{ x: xPos-1, y: yPos+1 }, word)) count++
    if (count===2){
        return 1;
    }
    return 0;
}

export const countMasX =  (rows: String[]): number => {
    var total = 0;
    for (let yPos = 0; yPos < rows.length; yPos++) {
        for (let xPos = 0; xPos < rows[0].length; xPos++) {
            total = total + countX(rows, xPos, yPos)
        }
    }
    return total;
}