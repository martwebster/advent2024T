import { readFileSync } from "fs"

const buildLine = (line: string): number[] =>{
    var result : number[] = []
    for (let index = 0; index < line.length; index++) {
        const element = line[index];
        result.push (Number(element))
    }
    return result
}

export const createMap = (data: string[]) : number[][] =>{
    return data.map (buildLine)
}

export const readTestData = (fileName: string): string[] => {
    const file = readFileSync(fileName).toString();
    const data = file.split("\r\n");
    if (data.length==1){
        return file.split("\n");
    }
    return data;
}        
