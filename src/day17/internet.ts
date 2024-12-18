export function runProgram3(program: number[], registerA: number, registerB = 0, registerC = 0) {
  let i = 0;
  const output = [];
  while (i >= 0 && i < program.length) {
    const instruction = program[i];
    const literalOperand = program[i + 1];
    let comboOperand;
    switch (literalOperand) {
      case 0:
      case 1:
      case 2:
      case 3:
        comboOperand = literalOperand;
        break;
      case 4:
        comboOperand = registerA;
        break;
      case 5:
        comboOperand = registerB;
        break;
      case 6:
        comboOperand = registerC;
        break;
    }
    switch (instruction) {
      case 0:
        registerA = Math.trunc(registerA! / 2 ** comboOperand!);
        break;
      case 1:
        registerB = registerB ^ literalOperand;
        break;
      case 2:
        registerB = comboOperand! & 7;
        break;
      case 3:
        if (registerA !== 0) {
          i = literalOperand;
          continue;
        }
        break;
      case 4:
        registerB = registerB ^ registerC;
        break;
      case 5:
        output.push(comboOperand! & 7);
        break;
      case 6:
        registerB = Math.trunc(registerA / 2 ** comboOperand!);
        break;
      case 7:
        registerC = Math.trunc(registerA / 2 ** comboOperand!);
        break;
      default:
        throw new Error("Unknown instruction: "+ instruction!);
    }
    i += 2;
  }
  return output;
}

