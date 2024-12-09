export interface Equation {
    result: number;
    parts: number[];
    operators: string[];
}

export const evaluateAll = (line: string[], concat: boolean = false) : number => {
    return line.sumOf ( it => evaluate(it, concat))
}

export const evaluate = (line: string, concat: boolean): number =>{
    var equations = [parseEquation(line)];
    const length = equations[0].parts.length -1

    // grrr. Which there was better syntax for this. 
    for (let index = 0; index < length; index++) {
        equations = equations
            .flatMap (it => mapEquations(it, concat))
            .filter (it => calcEquation(it) <= it.result)
            console.log(equations.length)
    }
    const answer = equations.find(evaluateEquation)
    if (answer){
        return answer.result;
    }
    return 0;
}

export const parseEquation = (line: string): Equation => {
    return {
        result : Number (line.substringBefore(":")),
        parts : line.substringAfter(": ").split(" ").map( it => Number(it)),
        operators: []
    }
}

export const mapEquations = (equation: Equation, concat : boolean = false): Equation[] => {
    var equations: Equation[] = [
        {
            ...equation,
            operators: [...equation.operators, "+"]
        },
        {
            ...equation,
            operators: [...equation.operators, "*"]
        }
    ]

    if (concat){
        equations.push(
            {
                ...equation,
                operators: [...equation.operators, "||"]
            }, 
        )
        }
   
    return equations;
}



export const calcEquation = (equation: Equation) => {
    var total = equation.parts[0];
    for (let index = 0; index < equation.operators.length; index++) {
        if (equation.operators[index]=== "+"){
            total += equation.parts[index+1]
        } else if (equation.operators[index]=== "*"){
            total *= equation.parts[index+1]
        } else { // concat
            total = Number(total.toString() + equation.parts[index+1])
        }
    }
    return total;
}

export const evaluateEquation = (equation: Equation): boolean => {
    return calcEquation(equation) === equation.result;
}