export const countNumber = (cache: Map<String, number>, digit : number, maxDepth : number, depth : number = 0) : number =>{
    if (depth == maxDepth){
        return 1;
    }
    var cachkey = digit+":"+depth;
    var cachedValue = cache.get(cachkey);
    if (cachedValue){
        return cachedValue
    }

    var total = 1;
    if (digit==0){
        total = countNumber(cache, 1, maxDepth, depth+1);
    } else if (digit.toString().length %2 ==0){
        var digitStr = digit.toString()
        var length = digitStr.length;
        var pos = (length/2);
        var number1 = Number(digitStr.substring(0, pos))
        var number2 = Number(digitStr.substring(pos))
        total = countNumber(cache, number1, maxDepth, depth+1) 
            + countNumber(cache, number2, maxDepth, depth+1) 
    } else{
        total = countNumber(cache, digit* 2024, maxDepth, depth+1);
    }
    cache.set(cachkey, total);
    return total;
}

export const countNumbers = (digit : number[], maxDepth : number) : number =>{
    var cache : Map<String, number> = new Map();
    return digit.sumOf( it=> countNumber(cache, it, maxDepth))
}