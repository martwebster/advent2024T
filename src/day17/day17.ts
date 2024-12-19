import { register } from "module"

export enum Op {
    adv = 0,
    bxl = 1,
    bst = 2,
    jnz = 3,
    bxc = 4,
    out = 5,
    bdv = 6,
    cdv = 7
}

    //64 1,000,000 [ 1, 3, 2 ]
    //65 1,000,001 [ 6, 3, 2 ]
    //66 1,000,010 [ 1, 3, 2 ]
    //67 1,000,011 [ 1, 3, 2 ]
    //68 1,000,100 [ 5, 3, 2 ]


// bst : B = A % 8 (last 3 digits)
// bxl : B = B XOR 101,
//           000 -> 101 = 5 (32)
//           001 -> 100 = 4 (16)
//           010 -> 111 = 7 (1028)
//           011 -> 110 = 6 (64)
//           100 -> 001 - 1 (2)

// cdv : C = A/ (2 to power of B), - How many ? 
// bxl : B = B XOR 110
// adv,3, // Advance by 3 digits
// bxc,6, // XOR B and C

// out : B,
// 3,0 // start again if anything in A
/**
 *
8 1000 [ 3, 2 ]
9 1001 [ 2, 2 ]
10 1010 [ 1, 2 ]
11 1011 [ 0, 2 ]
12 1100 [ 1, 2 ]
13 1101 [ 3, 2 ]
14 1110 [ 4, 2 ]
15 1111 [ 7, 2 ]

64 1000000 [ 1, 3, 2 ]
65 1000001 [ 6, 3, 2 ]
66 1000010 [ 1, 3, 2 ]
67 1000011 [ 1, 3, 2 ]
68 1000100 [ 5, 3, 2 ]
69 1000101 [ 3, 3, 2 ]
70 1000110 [ 5, 3, 2 ]
71 1000111 [ 5, 3, 2 ]
72 1001000 [ 1, 2, 2 ]



 */

export interface Register{
    A: number, 
    B: number, 
    C: number,
    output: number[]
}

export const getOperandValue = (register: Register, op: Op, operand: number): number =>{
    if (operand == 4){
        return register.A
    }
    if (operand == 5){
        return register.B
    }
    if (operand == 6){
        return register.C
    } 
    return operand
}

export const getVal = (powers: number[], digit: number): number =>{
    var result = 0;
    for (let index = 0; index <= digit; index++) {
        result += powers[index];
    }
    return result
}

export const runProgram = (data: string, start: Register): Register =>{
    var register : Register = {
        ...start
    }
    var instructions = data.split(",")
    var index = 0;
    while (index< instructions.length){
        var opCode = Number(instructions[index]) as Op
        var operand = Number(instructions[index+1])

        if (opCode==Op.jnz){
            if (register.A>0) {
                index = operand
            } else{
                index = index + 2
            }
        } else{
            register = calculate(register, opCode, operand)
            index = index + 2
        }
    }
    return register
}

export const calculate = (reg: Register, opCode: Op, operand: number): Register =>{
    const comboOperand =  getOperandValue(reg, opCode, operand);
    switch (opCode) {
        case Op.adv://0
            return {
                ...reg,
                A: Math.trunc(reg.A / 2 ** comboOperand)
            } //registerA = Math.trunc(registerA / 2 ** comboOperand);
        case Op.bxl://1
            return {
                ...reg,
                B: reg.B ^ operand
            }

        case Op.bst: //2
            return {
                ...reg,
                B: comboOperand & 7
            }
        case Op.bxc: //4
            return {
                ...reg,
                B: reg.B ^ reg.C
            }
        case Op.out: //5
            return {
                ...reg,
                output: [...reg.output, getOperandValue(reg, opCode, operand) & 7]
            }
        case Op.cdv:
            return {
                ...reg,
                C: Math.trunc(reg.A / 2 ** comboOperand)
            }

        default:
            throw Error ("Invalid "+opCode)
    }
}
