
export const mix = (secret: number, value: number): number =>{
    return secret ^ value
}

export const prune = (secret: number): number =>{
    return ((secret%16777216)+16777216)%16777216
}

export const mixPrune = (secret: number, value: number): number =>{
    return prune(mix(secret, value))
}


export const next = (initial: number): number =>{
    var secret = initial;

    secret = mixPrune(secret, secret * 64)
    secret = mixPrune(secret, secret / 32)
    return mixPrune(secret, secret * 2048)
}   

export const loop = (secret: number, times : number): number =>{

    var value = secret
    for (let index = 0; index < times; index++) {
        value = next(value)
    }
    return value
}

export const sumBuyers = (buyers: number[]): number =>{
    return buyers.sumOf (it => loop(it, 2000))
}

export const getPrice = (value: number): number =>{
    return Number(value.toString().charAt(value.toString().length-1))
}
// Part 2

export const getSequences = (secret: number) : Map<string, number> =>{
    var value = secret
    var lastPrice = getPrice(secret)
    var diffs : number[] = []
    var sequences : Map<string, number> = new Map();

    for (let index = 0; index < 2000; index++) {
        value = next(value)
        var price = getPrice(value)
        diffs.push(price - lastPrice)
        if (diffs.length>3){
            var sequence = [ diffs[diffs.length -4], diffs[diffs.length -3], diffs[diffs.length -2], diffs[diffs.length -1]].join(",")
            if (sequences.get(sequence)== undefined){
                sequences.set(sequence, price)
            }
        }
        lastPrice = price
    }
    return sequences
}

export const getTopSequences = (secret: number): Set<string> =>{
    var sequences = getSequences(secret)
    
    var top9 = new Map([...sequences.entries()].filter( it => it[1]==9));

    return new Set(top9.keys())
}

export const getTopBanana = (monkeys: number[]) : number=>{
    
    // create a set of all the top sequence for each monkey buyer
    var sequences = new Set<string>();
    monkeys.forEach(monkey => {
        getTopSequences(monkey).forEach (it => sequences.add(it))
    })

    // initialise total array
    var totals = new Map<string, number>();
    sequences.forEach (it => totals.set(it, 0))

    // populate totals
    monkeys.forEach (buyer => {
        var buyerSequnces = getSequences(buyer)

        sequences.forEach (sequnence =>{
            var b = buyerSequnces.get(sequnence)
            if (b!= undefined){
                totals.set(sequnence, totals.get(sequnence)!+b!)
            }
        })
    })

    // sort and return first
    var top = new Map([...totals.entries()].sort( (a,b) => b[1] - a[1]));
    var first = top.entries().next().value
    return first?.[1]!
}