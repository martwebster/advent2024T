// part 1
export const extractOperations = (data: string): number[][]  => {
    const findMul = 'mul\\([0-9]{1,3},[0-9]{1,3}\\)'
    let regex = RegExp(findMul, "g")
    
    const result = data.match(regex);
    if (result === null){
        return [];
    }
    const numbers = result?.map( it => [ Number(it.substringAfter("(").substringBefore(",")), Number(it.substringAfter(",").substringBefore(")")) ])
    
    return numbers!;
}

export const sumLine = (data: string): number => {
    return extractOperations(data).map (it => it[0] * it[1]).sum();
}


export const extractOperationsWithInstuctions = (data: string): number[][]  => {
    
    const findMul = 'mul\\([0-9]{1,3},[0-9]{1,3}\\)'
    const doIns = 'do\\(\\)'
    const dontIns = 'don\'t\\(\\)'
    
    let regex = RegExp(`(${findMul}|${doIns}|${dontIns})`, "g")
    
    const matches = data.match(regex);
    if (matches === null){
        return [];
    }
    var  result: number[][] = [];
    var active = true;
    for (const instruction of matches) {
        if (active && instruction.startsWith("mul")){
            result.push([ Number(instruction.substringAfter("(").substringBefore(",")), Number(instruction.substringAfter(",").substringBefore(")")) ])
        } else if (instruction.startsWith("don")){
            active = false;
        } else if (instruction.startsWith("do")){
            active = true;
        }
    }
    return result;
}

export const sumLineWithInstructions = (lines: string[]): number => {

    const data = lines.join();

    return extractOperationsWithInstuctions(data).map (it => it[0] * it[1]).sum();
}