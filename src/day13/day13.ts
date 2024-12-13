interface Equation {
    a: number;
    b: number;
    tot : number;
}

export const buildEquations = (buttonA : string, buttonB: string, prize: string) : Equation[] =>{
    return [  {
        a:  Number(buttonA.substringBetween("X+", ",")),
        b: Number(buttonB.substringBetween("X+", ",")),
        tot : Number(prize.substringBetween("X=", ","))
    }, {
        a:  Number(buttonA.substringAfter("Y+")),
        b: Number(buttonB.substringAfter("Y+")),
        tot : Number(prize.substringAfter("Y="))
    }]
}

export const equalizeEquations = (base : Equation[]): Equation[] =>{
    var result : Equation[] = []
    result.push ({
        a: base[0].a * base[1].a,
        b: base[0].b * base[1].a,
        tot: base[0].tot * base[1].a,
    })

    result.push ({
        a: base[1].a * base[0].a,
        b: base[1].b * base[0].a,
        tot: base[1].tot * base[0].a,
    })
    return result;
}

export const deduct = (base : Equation[]): Equation =>{
    base.sort ( (a,b) => b.b - a.b)
    
    return {
        a: base[0].a - base[1].a,
        b: base[0].b - base[1].b,
        tot: base[0].tot - base[1].tot
    }
}

export const solve = (data: string[], uplift: number = 0): [number, number] | undefined =>{
    var equations = buildEquations(data[0],data[1], data[2])
    if (uplift>0){
        equations.forEach (it => it.tot += uplift)
    }
    const single = deduct(equalizeEquations(equations))
    const b = single.tot / single.b
    if (b %1 !=0){
        return undefined;
    }
    // substitue the value of b into the original equation
    const a = (equations[0].tot - (equations[0].b  * b))/equations[0].a
    if (a %1 !=0){
        return undefined;
    }
    return [a,b]
}

// Part 1 price of all with no uplift
export const priceAll = (data: string[], uplift: number = 0): number =>{
    return data.splitAll("").sumOf (it => price(it, uplift))
}

export const price = (data: string[], uplift: number = 0): number =>{
    var result = solve(data, uplift);
    if (result === undefined){
        return 0
    }
    return result[0]* 3 + result[1]
}
