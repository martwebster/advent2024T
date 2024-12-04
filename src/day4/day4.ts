
const XMAS = "XMAS"

const getValue = (rows: String[], xPos: number, yPos: number) : string | undefined =>{
    if (rows[yPos] === undefined){
        return undefined;
    }
    return rows[yPos].charAt(xPos); 
}

export const isLeft = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if ( getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentX--;
    }
    return true;
}

export const isRight = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentX++;
    }
    return true;
}

export const isUp = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentY--;
    }
    return true;
}

export const isDown = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentY++;
    }
    return true;
}

export const isUpLeft = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentX--;
        currentY--;
    }
    return true;
}

export const isUpRight = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentX++;
        currentY--;
    }
    return true;
}

export const isDownLeft = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentX--;
        currentY++;
    }
    return true;
}

export const isDownRight = (rows: String[], xPos: number, yPos: number, word: String = XMAS): boolean =>{
    var currentX = xPos;
    var currentY = yPos;
    for (let index = 0; index < word.length; index++) {
        if (getValue(rows, currentX, currentY)!== word.charAt(index)){
            return false;
        }
        currentX++;
        currentY++;
    }
    return true;
}

export const countPresent = (rows: String[], xPos: number, yPos: number): number => {
    var count = 0;
    if (isDown(rows, xPos, yPos)) count++
    if (isDownLeft(rows, xPos, yPos)) count++
    if (isDownRight(rows, xPos, yPos)) count++
    if (isLeft(rows, xPos, yPos)) count++
    if (isRight(rows, xPos, yPos)) count++
    if (isUp(rows, xPos, yPos)) count++
    if (isUpLeft(rows, xPos, yPos)) count++
    if (isUpRight(rows, xPos, yPos)) count++
    return count;
}

export const countXmas =  (rows: String[]): number => {
    var total = 0;
    for (let yPos = 0; yPos < rows.length; yPos++) {
        for (let xPos = 0; xPos < rows[0].length; xPos++) {
            total = total + countPresent(rows, xPos, yPos)
        }
    }
    return total;
}

export const countX = (rows: String[], xPos: number, yPos: number): number => {
    var count = 0;
    const word = "MAS"
    if (isDownRight(rows, xPos-1, yPos-1, word)) count++
    if (isDownLeft(rows, xPos+1, yPos-1, word)) count++
    if (isUpLeft(rows, xPos+1, yPos+1, word)) count++
    if (isUpRight(rows, xPos-1, yPos+1, word)) count++
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