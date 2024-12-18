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
    var combos : Op[] = [Op.bst, Op.out, Op.adv, Op.cdv]
    if (combos.includes(op)){
        if (operand <4){
            return operand
        }
        if (operand == 4){
            return register.A
        }
        if (operand == 5){
            return register.B
        }
        if (operand == 6){
            return register.C
        }
    } else{
        return operand
    } 
    throw Error("Invalid "+op+ " "+operand)
}

export const runProgram = (data: string, start: Register): Register | undefined =>{
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
    switch (opCode) {
        case Op.adv:
            return {
                ...reg,
                A: Math.floor(reg.A / (Math.pow(2, getOperandValue(reg, opCode, operand))))
            }
        case Op.bxl:
            return {
                ...reg,
                B: reg.B ^ operand
            }

        case Op.bst:
            return {
                ...reg,
                B: getOperandValue(reg, opCode, operand) % 8
            }
        case Op.bxc:
            return {
                ...reg,
                B: reg.B ^ reg.C
            }
        case Op.out:
            return {
                ...reg,
                output: [...reg.output, getOperandValue(reg, opCode, operand) % 8]
            }
        case Op.cdv:
            return {
                ...reg,
                C: Math.floor(reg.A / (Math.pow(2, getOperandValue(reg, opCode, operand))))
            }

        default:
            throw Error ("Invalid "+opCode)
    }
}

export const hackValues = (program: string) : number[] =>{
    return program.split(",").map (it => hackValue(program, Number(it)))
}

export const hackValue = (program: string, digit: number): number =>{
    console.log("Finding ", digit)
    for (let hackValue = 0; hackValue <100; hackValue++) {

        var register : Register = {
            A: hackValue, 
            B: 0,
            C: 0,
            output: []
        }
        var result = runProgram(program, {
            ...register,
            A:hackValue
        } as Register)
        console.log("Attemping", hackValue,  result?.output[0])
        if (digit == result?.output[0]){
            return hackValue;
        }
    }
    throw Error("Unable to hack value")

}