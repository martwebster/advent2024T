export interface Option{
    total: number, 
    pos: number,
}

const expandOptions = (design: string, option: Option, towels: string[]): Option[] =>{
    var towel = design.substring(0,option.pos)
    var matches = towels.map (it => towel + it).filter(it=> design.startsWith(it))

    if (matches.length==0){
        return []
    }
    var options = matches.map( match =>({
        total: option.total,
        pos: match.length
    }))
    return options
}

export const designTowel = (design : string, towels: string[]) : number =>{
    var options = [{
        total: 1,
        pos: 0
    }as Option]

    var totalMatches = 0

    while (options.length> 0){
        options = options.flatMap (it => expandOptions(design, it, towels))
        console.log("--")
        displayOptions(design, options, totalMatches)
        totalMatches = totalMatches + options.filter (it => it.pos == design.length-1).sumOf(it => it.total)
 
        options = options.filter (it => it.pos < design.length-1)

    }
    return totalMatches
}

export const displayOptions = (design: string, options: Option[], total: number) =>{
    console.log (total, options.map (it => design.substring(0,it.pos))
}

export const countDesigns = (designs: string[], towels: string[]): number =>{
    return designs.countOf (it => designTowel(it, towels)>0)
}

export const sumDesigns = (designs: string[], towels: string[]): number =>{
    return designs.sumOf (it => designTowel(it, towels))
}

