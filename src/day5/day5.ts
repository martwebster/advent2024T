interface Rule {
    first: number,
    second: number;
}

export const parseRules = (data: string[]): Rule[] =>{
    return data.map (it => { return { 
        first: Number(it.substringBefore("|")), 
        second: Number(it.substringAfter("|")) 
    }})
}

export const parsePages = (data: string): number[] =>{
    return data.split(",").map (it => Number(it));
}

export const parseAllPages = (data: string[]): number[][] =>{
    return data.map (parsePages);
}

export const isRuleValid = ( rule: Rule, pages: number[]): boolean =>{
    const pos1 = pages.indexOf(rule.first);
    const pos2 = pages.indexOf(rule.second);

    if (pos1 === -1 || pos2 === -1){
        return true;
    }
    if (pos1>= pos2){
        return false;
    }
    return true;
}

export const isValidUpdate = (pages: number[], rules : Rule[]): boolean => {
    const passes = rules.filter (rule => isRuleValid(rule, pages));
    return passes.length === rules.length;
}

export const getMiddle = (pages: number[]): number =>{
    const pos =  Math.ceil(pages.length/2)
    return pages[pos-1];
}

export const addPages = (rules: Rule[], updates: number[][]) : number => {
    return updates
        .filter(page => isValidUpdate(page, rules))
        .sumOf(getMiddle);
}

// part 2
export const reOrderUpdate = (update: number[], rules: Rule[]): number[] =>{
    const result = [...update]
    var invalidRule = rules.find (it => !isRuleValid(it, update))
    while (invalidRule){   
        // add to an array.  swap Values
        const num1 = invalidRule.first
        const num2 = invalidRule.second
    
        result[result.indexOf(num1)] = num2;
        result[result.indexOf(num2)] = num1;
    
        invalidRule = rules.find (it => !isRuleValid(it, result))
    }    
    return result;
}

export const addInvalidPages = (rules: Rule[], updates: number[][]) : number => {
    return updates
        .filter (page => !isValidUpdate(page, rules))
        .map (page => reOrderUpdate(page, rules))
        .sumOf(getMiddle)
}
