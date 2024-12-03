// part 1
const buildMul = (instruction: string): number[] =>{
    return [ Number(instruction.substringAfter("(").substringBefore(",")), Number(instruction.substringAfter(",").substringBefore(")")) ];
}

export const extractMultiplications = (data: string): number[][]  => {
    const matches = data.match(RegExp('mul\\([0-9]{1,3},[0-9]{1,3}\\)', "g"))
    if (matches === null){
        return [];
    }
    return matches.map(buildMul);
}

export const sumLine = (data: string): number => {
    return extractMultiplications(data).map (it => it[0] * it[1]).sum();
}

// part 2
export const extractOperationsWithInstuctions = (data: string): number[][]  => {
    const findMul = 'mul\\([0-9]{1,3},[0-9]{1,3}\\)'
    const doIns = 'do\\(\\)'
    const dontIns = 'don\'t\\(\\)'
    
    const matches = data.match(RegExp(`(${findMul}|${doIns}|${dontIns})`, "g"));
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