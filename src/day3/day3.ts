// part 1
const buildMul = (instruction: string): number[] =>{
    return [ Number(instruction.substringAfter("(").substringBefore(",")), Number(instruction.substringAfter(",").substringBefore(")")) ];
}

export const extractOperations = (data: string): number[][]  => {
    let regex = RegExp('mul\\([0-9]{1,3},[0-9]{1,3}\\)', "g")
    
    const matches = data.match(regex);
    if (matches === null){
        return [];
    }
    const numbers = matches.map( buildMul)
    return numbers;
}

export const sumLine = (data: string): number => {
    return extractOperations(data).map (it => it[0] * it[1]).sum();
}

// part 2
export const extractOperationsWithInstuctions = (data: string): number[][]  => {
    const findMul = 'mul\\([0-9]{1,3},[0-9]{1,3}\\)'
    const doIns = 'do\\(\\)'
    const dontIns = 'don\'t\\(\\)'
    
    let regex = RegExp(`(${findMul}|${doIns}|${dontIns})`, "g")
    
    const matches = data.match(regex);
    if (matches === null){
        return [];
    }
    var result: number[][] = [];
    var active = true;
    for (const instruction of matches) {
        if (active && instruction.startsWith("mul")){
            result.push(buildMul(instruction))
        } else if (instruction.startsWith("don")){
            active = false;
        } else if (instruction.startsWith("do")){
            active = true;
        }
    }
    return result;
}

export const sumLinesWithInstructions = (lines: string[]): number => {
    const data = lines.join();
    return extractOperationsWithInstuctions(data).map (it => it[0] * it[1]).sum();
}