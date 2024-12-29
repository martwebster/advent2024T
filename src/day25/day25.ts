
export const isLock = (item: string[]) =>{
    return item[0] == "#####"
}

export const isKey = (item: string[]) =>{
    return item[0] == "....."
}

export const parseLock =(rows: string[]) : number[] =>{
    var result : number[] = []

    for (let col = 0; col < rows[0].length; col++) {
        const element = rows[0][col];
        var count = 0;
        
        for (let index = 1; index < rows.length; index++) {
            const char = rows[index].charAt(col);
            if (char =="#"){
                count++
            }
        }
        result.push(count)
    }
    return result;
}

export const parseKey =(rows: string[]) : number[] =>{
    var result : number[] = []

    for (let col = 0; col < rows[0].length; col++) {
        const element = rows[0][col];
        var count = 0;
        
        for (let index = 5; index >= 0; index--) {
            const char = rows[index].charAt(col);
            if (char =="#"){
                count++
            }
        }
        result.push(count)
    }
    return result;
}

export const isFit = (lock: number[], key: number[]): boolean => {
    for (let index = 0; index < lock.length; index++) {
        if (lock[index] + key[index] > 5){
            return false;
        }
    }
    return true;
}

export const getFitCount = (locks: number[][], keys: number[][]) : number =>{
    var fitCount = 0;
    for (const lock of locks) {
        fitCount += keys.countOf (key => isFit(lock, key))
    }
    return fitCount
}