export interface Option{
    total: number, 
    pos: number,
}

const expandOptions = (towel: string, towels: string[]): string[] =>{
    return towels.map (it => towel + it);
}

export const designTowel = (design : string, towels: string[]) : boolean =>{
    var options = [""]

    while (options.length> 0){
        options = options.flatMap (it => expandOptions(it, towels))

        options = Array.from(new Set(options))

        options = options.filter (it => design.startsWith(it))
        if (options.find (it => it== design)){
            return true;
        }
    }
    return false
}

export const countDesigns = (designs: string[], towels: string[]): number =>{
    return designs.countOf (it => designTowel(it, towels))
}