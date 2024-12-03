export const buildMul = (instruction: string): number[] =>{
    return [ Number(instruction.substringAfter("(").substringBefore(",")), Number(instruction.substringAfter(",").substringBefore(")")) ];
}

