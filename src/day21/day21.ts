enum Direction {
    Up = "^",
    Down = "v", 
    Left = "<",
    Right = ">",
    A = "A"
}

/**
 +---+---+---+
| 7 | 8 | 9 |
+---+---+---+
| 4 | 5 | 6 |
+---+---+---+
| 1 | 2 | 3 |
+---+---+---+
    | 0 | A |
    +---+---+
 */
export class NumericKeyPad {

    public getPaths = (seq: string): string[][] =>{
        const path = "A" + seq
        const transitions: string[][] = []
        for (let index = 0; index < path.length-1; index++) {
            const from = path.charAt(index)
            const to = path.charAt(index+1)
            transitions.push([from, to]);
        }
        return transitions.map(it => {
            return this.getDirections(it[0], it[1])
        });
    }

    public getPathsAsString( seq: string ): string[] {
        let result = [""]
        const paths = this.getPaths(seq)
        for (const path of paths) {
            result = path.flatMap( bit => result.map( ot => ot + bit))
        }
        return result;
    }

    public getDirections = (from: string, to:string) : string[] =>{
        if (from == "A" && to=="0"){
            return [Direction.Left + Direction.A]
        }
        else if (from == "A" && to=="1"){
            return [
                Direction.Left + Direction.Up + Direction.Left + Direction.A,
                Direction.Up + Direction.Left + Direction.Left + Direction.A
            ]
        }
        else if (from == "1" && to=="4"){
            return [Direction.Up + Direction.A]
        }
        else if (from == "1" && to=="7"){
            return [Direction.Up + Direction.Up + Direction.A]
        }
        else if (from == "1" && to=="3"){
            return [
                Direction.Right + Direction.Right+ Direction.A,
            ]
        }
        else if (from == "7" && to=="9"){
            return [Direction.Right + Direction.Right + Direction.A]
        }
        else if (from == "0" && to=="A"){
            return [Direction.Right + Direction.A]
        }
        else if (from == "0" && to=="2"){
            return [Direction.Up + Direction.A]
        }
        else if (from == "0" && to=="5"){
            return [Direction.Up + Direction.Up + Direction.A]
        }
        else if (from == "0" && to=="8"){
            return [Direction.Up + Direction.Up + Direction.Up + Direction.A]
        }
        else if (from == "8" && to=="0"){
            return [Direction.Down + Direction.Down + Direction.Down + Direction.A]
        }
        else if (from == "2" && to=="9"){
            return [
                Direction.Up + Direction.Up + Direction.Right + Direction.A, 
                Direction.Up + Direction.Right + Direction.Up + Direction.A, 
                Direction.Right + Direction.Up + Direction.Up + Direction.A, 
            ]
        }
        else if (from == "4" && to=="9"){
            return [
                Direction.Up + Direction.Right + Direction.Right + Direction.A, 
                Direction.Right + Direction.Up + Direction.Right + Direction.A, 
                Direction.Right + Direction.Right + Direction.Up + Direction.A, 
            ]
        }
        else if (from == "9" && to=="A"){
            return [
                Direction.Down + Direction.Down + Direction.Down + Direction.A,
            ]
        }
        else if (from == "9" && to=="8"){
            return [
                Direction.Left + Direction.A,
            ]
        }
        else if (from == "A" && to=="9"){
            return [
                Direction.Up + Direction.Up + Direction.Up + Direction.A,
            ]
        }
        else if (from == "A" && to=="3"){
            return [
                Direction.Up + Direction.A,
            ]
        }
        else if (from == "5" && to=="8"){
            return [
                Direction.Up + Direction.A,
            ]
        }
        else if (from == "8" && to=="2"){
            return [
                Direction.Down + Direction.Down + Direction.A,
            ]
        }
        else if (from == "2" && to=="A"){
            return [
                Direction.Down + Direction.Right + Direction.A,
                Direction.Right + Direction.Down + Direction.A,
                
            ]
        }
        else if (from == "A" && to=="4"){
            return [
                Direction.Up + Direction.Up + Direction.Left + Direction.Left + Direction.A,
                Direction.Up + Direction.Left + Direction.Up + Direction.Left + Direction.A,
                Direction.Up + Direction.Left + Direction.Left + Direction.Up + Direction.A,
                Direction.Left + Direction.Up + Direction.Up + Direction.Left + Direction.A,
                Direction.Left + Direction.Up + Direction.Left + Direction.Up + Direction.A,
            ]
        }
        else if (from == "A" && to=="8"){
            return [
                Direction.Up + Direction.Up + Direction.Up + Direction.Left + Direction.A,
                Direction.Up + Direction.Up + Direction.Left + Direction.Up + Direction.A,
                Direction.Up + Direction.Left + Direction.Up + Direction.Up + Direction.A,
                Direction.Left + Direction.Up + Direction.Up + Direction.Up + Direction.A,
            ]
        }
        else if (from == "A" && to=="5"){
            return [
                Direction.Up + Direction.Up + Direction.Left + Direction.A,
                Direction.Up + Direction.Left + Direction.Up + Direction.A,
                Direction.Left + Direction.Up + Direction.Up + Direction.A,
            ]
        }
        else if (from == "3" && to=="7"){
            return [
                Direction.Up + Direction.Up + Direction.Left + Direction.Left + Direction.A,
                Direction.Up + Direction.Left + Direction.Up + Direction.Left + Direction.A,
                Direction.Up + Direction.Left + Direction.Left + Direction.Up + Direction.A,
                Direction.Left + Direction.Left + Direction.Up + Direction.Up + Direction.A,
                Direction.Left + Direction.Up + Direction.Up + Direction.Left + Direction.A,
                Direction.Left + Direction.Up + Direction.Left + Direction.Up + Direction.A,
            ]
        }
        else if (from == "4" && to=="5"){
            return [
                Direction.Right + Direction.A,
            ]
        }
        else if (from == "5" && to=="6"){
            return [
                Direction.Right + Direction.A,
            ]
        }
        else if (from == "3" && to=="A"){
            return [
                Direction.Down + Direction.A,
            ]
        }
        else if (from == "4" && to=="1"){
            return [
                Direction.Down + Direction.A,
            ]
        }
        else if (from == "5" && to=="A"){
            return [
                Direction.Right + Direction.Down + Direction.Down +  Direction.A,
                Direction.Down + Direction.Right + Direction.Down +  Direction.A,
                Direction.Down + Direction.Down + Direction.Right +  Direction.A,
            ]
        }
        else if (from == "8" && to=="3"){
            return [
                Direction.Right + Direction.Down + Direction.Down +  Direction.A,
                Direction.Down + Direction.Right + Direction.Down +  Direction.A,
                Direction.Down + Direction.Down + Direction.Right +  Direction.A,
            ]
        }
        else if (from == "6" && to=="A"){
            return [Direction.Down + Direction.Down + Direction.A]
        }
        throw Error("unknown "+from+":"+to)
    }
}

//      +---+---+
//      | ^ | A |
//  +---+---+---+
//  | < | v | > |
//  +---+---+---+
export class DirectionKeyboard {

    public getDirections = (from: string, to:string) : string[]=>{
        if (from == Direction.Left && to==Direction.Up){
            return [Direction.Right + Direction.Up + Direction.A]
        }
        if (from == Direction.Down && to==Direction.Left){
            return [Direction.Left + Direction.A]
        }
        if (from == Direction.Left && to==Direction.Down){
            return [Direction.Right + Direction.A]
        }
        if (from == Direction.A && to==Direction.Up){
            return [Direction.Left + Direction.A]
        }
        if (from == Direction.A && to==Direction.Right){
            return [Direction.Down + Direction.A]
        }
        if (from == Direction.A && to==Direction.Down){
            return [
                Direction.Left + Direction.Down + Direction.A,
                Direction.Down + Direction.Left + Direction.A
            ]
        }
        if (from == Direction.A && to==Direction.Left){
            return [
                Direction.Left + Direction.Down + Direction.Left + Direction.A,
                Direction.Down + Direction.Left + Direction.Left + Direction.A,
            ]
        }
        if (from == Direction.Up && to==Direction.A ){
            return [Direction.Right + Direction.A]
        }
        if (from == Direction.Up && to==Direction.Left ){
            return [Direction.Down + Direction.Left + Direction.A]
        }
        if (from == Direction.Down && to==Direction.Right ){
            return [Direction.Right + Direction.A]
        }
        if (from == Direction.Right && to==Direction.Down ){
            return [Direction.Left + Direction.A]
        }

        if (from == Direction.Right && to==Direction.A ){
            return [Direction.Up + Direction.A]
        }
        if (from == Direction.Down && to== Direction.A ){
            return [
                Direction.Right + Direction.Up + Direction.A,
                Direction.Up + Direction.Right + Direction.A
            ]
        }
        if (from == Direction.Left && to==Direction.A ){
            return [
                Direction.Right + Direction.Right + Direction.Up + Direction.A,
                Direction.Right + Direction.Up + Direction.Right + Direction.A,
            ]
        }
        
        if (from == Direction.Right && to==Direction.Up){
            return [
                Direction.Left + Direction.Up + Direction.A,
                Direction.Up + Direction.Left + Direction.A]
            
        }
        if (from == Direction.Up && to==Direction.Right){
            return [
                Direction.Down + Direction.Right + Direction.A,
                Direction.Right + Direction.Down + Direction.A
            ]
        }
    
        if (from == to){
            return [Direction.A]
        }
    
        throw Error("unknown Direction - "+from+":"+to)
    }
}

export const addOption = (soFar: string, options: string[]) : string[] => {
    return options.map (it => soFar + it)
}

export const getTransitions = (seq: string): string[][] =>{
    const path = "A" + seq
    const transitions: string[][] = []
    for (let index = 0; index < path.length-1; index++) {
        const from = path.charAt(index)
        const to = path.charAt(index+1)
        transitions.push([from, to]);
    }
    return transitions;
}

export const getDirectionPaths = (seq: string): string[] =>{
    const transitions = getTransitions(seq)
    const keypad = new DirectionKeyboard();

    const result = transitions.map(it => {
        return keypad.getDirections(it[0], it[1])
    })

    var results = [""]
    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        results = results.flatMap (it => addOption(it, element))
    }
    return results;
}

const cache = new Map<string, number>();

export const getMinLength = (seq: string, depth: number): number =>{
    const cacheKey = seq + ":" + depth
    if (cache.has(cacheKey)) return cache.get(cacheKey)!

    const parts = seq.split("A")
    var total : number =0;
    for (let i = 0; i < parts.length; i++){
        let part = parts[i]
        if (i != parts.length-1){
            part = part + "A"
        }
        if (part.length>0){
            if (depth==1){
                total = total + getDirectionPaths(part).minOf(it => it.length)
            } else{
                total = total + getDirectionPaths(part).map( it => getMinLength(it, depth-1)).min()
            }
        }
    }
    cache.set(cacheKey, total)
    return total;
}

export const getMinForSequence = (seq: string, depth: number): number =>{
    const pad = new NumericKeyPad();
    const paths = pad.getPathsAsString(seq)
    return paths.minOf( it => getMinLength(it,depth))
}

export const getQuickScore=  ( seq: string, depth: number): number =>{
    const score = getMinForSequence(seq, depth)
    return Number(seq.substring(0,3)) * score
}

export const getQuickTotal = ( items: string[]): number =>{
    return items.sumOf( it => getQuickScore(it, 2))
}

export const getQuickTotalPart2 = ( items: string[]): number =>{
    return items.sumOf( it => getQuickScore(it, 25))
}
