import { Dir } from "../day16/day16";

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
    innderPad: NumericKeyPad | undefined;

    constructor(innerPad? : NumericKeyPad){
        this.innderPad = innerPad
    }

    private grid = [
        "789", 
        "456", 
        "123", 
        " 0A"]

    private activePosition : Pos = {
        y: 3,
        x: 2
    }

    public getPaths = (seq: string): string[][] =>{
        var path = "A" + seq;
        var transitions : string[][] = []
        for (let index = 0; index < path.length-1; index++) {
            const from = path.charAt(index)
            const to = path.charAt(index+1)
            transitions.push([from, to]);
        }
        var result = transitions.map (it =>{
            return this.getDirections(it[0], it[1])
        })
        return result;
    }

    //
    //A456A
    public getDirections = (from: string, to:string) : string[] =>{
        // A> 0
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


        throw Error("unkown "+from+":"+to)
    }

    public press = (): Direction| undefined =>{
        var button = this.grid[this.activePosition.y][this.activePosition.x];
        if (this.innderPad == undefined){
            return button as Direction
        }
        if (button=="A"){
            return this.innderPad.press();
        } 
        this.move(button)
        return undefined;
    }

    public move = (directions: string): void =>{
        for (let x = 0; x < directions.length; x++) {
            const element = directions.charAt(x);
            if (element == Direction.Up){
                this.activePosition = {
                    x: this.activePosition.x,
                    y: this.activePosition.y - 1
                }
            }
            else if (element == Direction.Down){
                this.activePosition = {
                    x: this.activePosition.x,
                    y: this.activePosition.y + 1
                }
            }
            else if (element == Direction.Left){
                this.activePosition = {
                    x: this.activePosition.x-1,
                    y: this.activePosition.y
                }
            }
            else if (element == Direction.Right){
                this.activePosition = {
                    x: this.activePosition.x+1,
                    y: this.activePosition.y
                }
            }
            else if (element == Direction.A){
                var result = this.press()
                if (result !== undefined){
                    var bit = directions.substring(0,x)
                    console.log(result, x, bit, element)
                }
            }
        }
    }
}


export class DirectionKeyboard {
    innderPad: DirectionKeyboard| undefined;
    level: number;

    constructor (pos: number, innderPad?: DirectionKeyboard){
        this.innderPad = innderPad
        this.level = pos
    }
    private grid = [
        " "            + Direction.Up   + Direction.A,
        Direction.Left + Direction.Down + Direction.Right
        ]

    private activePosition : Pos = {
        y: 0,
        x: 2
    }

    private currentStream = ""
    private lastAPos = 0;

    public move = (directions: string): Direction| undefined =>{
        if (!this.innderPad){
            return directions as Direction
        }

        for (let x = 0; x < directions.length; x++) {
            // if (this.level==1){
            //     console.log("Level 1 processing", directions.charAt(x))
            // }
            // if (this.level==2){
            //     console.log("Level 2 press", directions.charAt(x))
            // }
            // if (this.level==3){
            //     console.log("Level 3 press", directions.charAt(x))
            // }
            const element = directions.charAt(x);
            if (element == Direction.Up){
                this.activePosition = {
                    x: this.activePosition.x,
                    y: this.activePosition.y - 1
                }
            }
            else if (element == Direction.Down){
                this.activePosition = {
                    x: this.activePosition.x,
                    y: this.activePosition.y + 1
                }
            }
            else if (element == Direction.Left){
                this.activePosition = {
                    x: this.activePosition.x-1,
                    y: this.activePosition.y
                }
            }
            else if (element == Direction.Right){
                this.activePosition = {
                    x: this.activePosition.x+1,
                    y: this.activePosition.y
                }
            }
            else if (element == Direction.A){
                var button = this.grid[this.activePosition.y][this.activePosition.x];
                if (this.innderPad){
                    var result = this.innderPad!.move(button)
                    if (result!= undefined){
                        if (this.level ==1){
                            var bit = directions.substring(this.lastAPos,x+1)
                            if (result=="A"){
                                console.log(this.currentStream, bit)
                                this.lastAPos = x+1;
                                this.currentStream = ""
                            } else{
                                this.currentStream = this.currentStream + result
                            }

                        } else{
                            return result;
                        }
                    }
                    
                }
            }
        }
        return undefined
    }

    public getPaths = (seq: string): string[][] =>{
        var path = "A" + seq;
        var transitions : string[][] = []
        for (let index = 0; index < path.length-1; index++) {
            const from = path.charAt(index)
            const to = path.charAt(index+1)
            transitions.push([from, to]);
        }
        var result = transitions.map (it =>{
            return this.getDirections(it[0], it[1])
        })
        return result;
    }

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
        /// Backwards
    //     +---+---+
    //     | ^ | A |
    // +---+---+---+
    // | < | v | > |
    // +---+---+---+
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

    public solve = (directions: string): string =>{
        var result = ""
        
        for (let x = 0; x < directions.length; x++) {
            const element = directions.charAt(x);
            if (element == Direction.Up){
                this.activePosition = {
                    x: this.activePosition.x,
                    y: this.activePosition.y - 1
                }
            }
            if (element == Direction.Down){
                this.activePosition = {
                    x: this.activePosition.x,
                    y: this.activePosition.y + 1
                }
            }
            if (element == Direction.Left){
                this.activePosition = {
                    x: this.activePosition.x-1,
                    y: this.activePosition.y
                }
            }
            if (element == Direction.Right){
                this.activePosition = {
                    x: this.activePosition.x+1,
                    y: this.activePosition.y
                }
            }
            if (element == Direction.A){
                result = result + this.grid[this.activePosition.y][this.activePosition.x]
            }
        }
    
        return result;
    }
}


export const getPaths = (seq: string): string[][] =>{
    var path = "A" + seq;
    var transitions : string[][] = []
    for (let index = 0; index < path.length-1; index++) {
        const from = path.charAt(index)
        const to = path.charAt(index+1)
        transitions.push([from, to]);
    }
    console.log(transitions)
    const keypad = new NumericKeyPad();
    var result = transitions.map (it =>{
        return keypad.getDirections(it[0], it[1])
    })
    console.log(result)
    return result;
}

export const addOption = (soFar: string, options: string[]) : string[] => {
    return options.map (it => soFar + it)
}

export const getOptions = (seq: string): string[] =>{
    const paths = getPaths(seq)
    var results = [""]
    for (let index = 0; index < paths.length; index++) {
        const element = paths[index];
        results = results.flatMap (it => addOption(it, element))
    }
    results.forEach (it => console.log(it))
    return results;
}


export const getTransitions = (seq: string): string[][] =>{
    var path = "A" + seq;
    var transitions : string[][] = []
    for (let index = 0; index < path.length-1; index++) {
        const from = path.charAt(index)
        const to = path.charAt(index+1)
        transitions.push([from, to]);
    }
    return transitions;
}


export const getDirectionPaths = (seq: string): string[] =>{
    const transitions = getTransitions(seq)
    const keypad = new DirectionKeyboard(1);
    
    var result = transitions.map (it =>{
        return keypad.getDirections(it[0], it[1])
    })

    var results = [""]
    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        results = results.flatMap (it => addOption(it, element))
    }
    return results;
}

export const getTimes = ( seq: string, times: number) : string =>{
    var d = getDirectionPaths(seq)
    for (let index = 1; index < times; index++) {
        d = d.flatMap (it => getDirectionPaths(it))
        d.sort ( (a,b) => a.length - b.length)
        d = [d[0]]
    }

    return d[0]
}

export const getSingleScore= (seq: string, times: number): number =>{
    const pad = new NumericKeyPad(); 
    const paths = pad.getPaths(seq)
    var mins = paths.map (part => part.map (it => getTimes(it, times).length))
    const score = mins.map ( part => Math.min(...part)).sum()
    console.log (Number(seq.substring(0,3)), score)
    return Number(seq.substring(0,3)) * score
}

export const getScore =  (data: string[]): number =>{
    return data.sumOf (it => getSingleScore(it,2))
}

export const getScorePart2 =  (data: string[]): number =>{
    return data.sumOf (it => getSingleScore(it,5))
}
