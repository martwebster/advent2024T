import { modulo } from "../utility/extensions"

export const mix = (secret: number, value: number): number =>{
    return secret ^ value
}

export const prune = (secret: number): number =>{
    return modulo(secret, 16777216)
}

export const next = (initial: number): number =>{
    var secret = initial;
    secret = prune(mix(secret, secret * 64))
    secret = prune(mix(secret, secret / 32))
    return prune(mix(secret, secret * 2048))
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

// Part 2
const getPrice = (value: number): number =>{
    return Number(value.toString().lastChar())
}

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
            diffs = diffs.slice(diffs.length-4)
            var sequence = diffs.join(",")
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
    
    var top9 = sequences.filter( it => it[1]==9);

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

    return totals
        .sort( (a,b) => b[1] - a[1])
        .first()[1]
}