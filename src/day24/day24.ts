export enum GateType {
  AND = "AND",
  OR = "OR",
  XOR = "XOR"
}

export class Gate {

  input1: string
  gateType: GateType
  input2: string
  output: string

  constructor(input1: string, gateType: GateType, input2: string, output: string) {
    this.input1 = input1
    this.input2 = input2
    this.gateType = gateType
    this.output = output
  }

  public evaluate = (values: Map<string, number>): [string, number] | undefined => {

    if (values.get(this.input1) != undefined && values.get(this.input2) != undefined) {
      const val1 = values.get(this.input1)!
      const val2 = values.get(this.input2)!
      if (this.gateType == GateType.AND) {
        return [this.output, val1 & val2]
      }
      if (this.gateType == GateType.OR) {
        return [this.output, val1 | val2]
      }
      return [this.output, val1 ^ val2]
    }
    return undefined
  }
}

export namespace Gate {
  export const from = (lines: string[]): Gate[] => {
    return lines.map(it =>
      new Gate(
        it.split(" ")[0],
        it.split(" ")[1] as GateType,
        it.split(" ")[2],
        it.split(" ")[4]
      ))
  }
}

export const parseValues = (data: string[]): Map<string, number> => {
  let values: Map<string, number> = new Map()
  data.forEach(line => {
    values.set(line.substringBefore(":"), Number(line.substringAfter(": ")))
  })
  return values
}

export const evalGate = (gate: Gate, values: Map<string, number>): boolean => {
  const result = gate.evaluate(values)
  if (result != undefined) {
    values.set(result[0], result[1])
    return true
  }
  return false
}

export const extractNumber = (prefix: string, values: Map<string, number>): number => {
  let z = values.filter(it => it[0].startsWith(prefix))

  z = z.sort((a, b) => Number(a[0].substringAfter(prefix)) - Number(b[0].substringAfter(prefix)))
  let result = ""
  z.forEach(it => {
    result = it + result
  })
  return parseInt(result, 2)
}

export const evalGates = (gates: Gate[], values: Map<string, number>) => {
  let gatesToProcess = [...gates]
  while (gatesToProcess.length > 0) {
    gatesToProcess = gatesToProcess.filter(it => !evalGate(it, values))
  }
  return extractNumber("z", values)
}

export const rule1 = (gate: Gate): boolean => {
  if (gate.gateType != GateType.XOR) {
    return true
  }
  return (
    (gate.input1.startsWith("x") || gate.input2.startsWith("y")
      &&
      gate.input1.startsWith("y") || gate.input2.startsWith("x")
    ) || (
      gate.output.startsWith("z")
    )
  )
}


export const rule2 = (gate: Gate): boolean => {
  if (gate.output.startsWith("z")) {
    return (gate.gateType == GateType.XOR)
  }
  return true
}

export const findInvalidRule1 = (gates: Gate[]): Gate[] => {
  return gates.filter(it => !rule1(it))
}

export const findInvalidRule2 = (gates: Gate[]): Gate[] => {
  return gates.filter(it => !rule2(it))
}

export const swap = (gates: Gate[], line1: string, line2: string): string[] => {
  const result: string[] = []
  const gate1 = gates.find(it => line1 == it.input1 + " " + it.gateType + " " + it.input2)!
  const gate2 = gates.find(it => line2 == it.input1 + " " + it.gateType + " " + it.input2)!

  const temp = gate1?.output
  gate1!.output! = gate2?.output
  gate2!.output! = temp

  result.push(gate1.output)
  result.push(gate2.output)
  return result

}