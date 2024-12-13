export {};

declare global {
    interface Pos { 
        x: number;
        y: number;
    }
    

    interface Array<T> {
        last(): T | undefined
        first(): T | undefined
        sum(): number
        sumOf(attribute: (item: T) => number): number
        min(): number
        minOf(attribute: (item: T) => number): number
        max(): number
        maxOf(attribute: (item: T) => number): number
        includesObject(obj: unknown): boolean
        sortAscending(): Array<T>
        sortDescending(): Array<T>
        removeAtIndex(index: number): Array<T>
        /**
         *  Generates an array of positions, one for each row, column of a grid
         */
        scanAll(): Array<Pos>

        scan( callback: ( item: any) => boolean ): Array<Pos>
        /**
         * Split an array
         */
        split(item: T): Array<Array<T>>

        /**
         * Split the array mulitple times
         */
        splitAll(item: T): Array<Array<T>>
    }

    interface String {
        substringAfter(val: string): string
        substringBefore(val: string): string;
        substringBetween(val1: string, val2: string): string;
        substringAfterLast(val: string): string;
        substringBeforeLast(val: string): string;
        substringBetweenLast(val1: string, val2: string): string;
        isDigit(): boolean;
        /**
         * Convert string into a number array
         * @param delim defaults to " ", but can passed through
         */
        toNumbers(delim?: string): number[];
    }
}


Array.prototype.last = function () {
    if (!this.length) {
        return undefined;
    }
    return this[this.length - 1];
};
Array.prototype.first = function () {
    if (!this.length) {
        return undefined;
    }
    return this[0];
};
Array.prototype.sum = function () {
    return this.reduce((sum, current) => sum + current, 0);
};
Array.prototype.sumOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).sum();
};

Array.prototype.min = function () {
    return Math.min(...this);
};
Array.prototype.minOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).min();
};
Array.prototype.max = function () {
    return Math.max(...this);
};
Array.prototype.maxOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).max();
};

Array.prototype.maxOf = function (attribute: (item: unknown) => number) {
    return this.map(attribute).max();
};
Array.prototype.includesObject = function (obj: unknown) {
    return this.map(item => JSON.stringify(item)).includes(JSON.stringify(obj))
};
Array.prototype.sortAscending = function () {
    return this.sort((a, b) => a - b)
};
Array.prototype.sortDescending = function () {
    return this.sort((a, b) => b - a)
};
Array.prototype.removeAtIndex = function (index: number) {
    return [...this.slice(0, index), ...this.slice(index + 1)]
}
Array.prototype.scanAll = function() {
    const positions : Pos[] = []
    for (let y = 0; y < this.length; y++) {
        if (typeof this[y] === 'string'){
            const element = this[y] as string;
            for (let x = 0; x < element.length; x++) {
                positions.push( {
                    x,
                    y 
                })   
            }
        }
    }
    return positions;
}
Array.prototype.scan = function( callback: ( item: any) => boolean ): Array<Pos>{
    const positions : Pos[] = []
    for (let y = 0; y < this.length; y++) {
        if (this[y] instanceof Array){
            const ar = this[y] as Array<unknown>
            for (let x = 0; x < ar.length; x++) {
                if (callback(ar[x])){
                    positions.push( {
                        x,
                        y 
                    })   
                }
            }
        }
    }
    return positions;
}

Array.prototype.split = function(item: unknown): Array<Array<unknown>>{
    return [
        this.slice(0, this.indexOf(item)),
        this.slice(this.indexOf(item)+1)
    ]
}

Array.prototype.splitAll = function(item: unknown): Array<Array<unknown>>{
    var results : string[][] =[]
    var toChunk = [...this]
    while (toChunk.includes(item)){
        var chunkBits = toChunk.split("");
        toChunk = chunkBits[1];
        results.push(chunkBits[0])
    }
    results.push(toChunk)
    return results
}

// String
String.prototype.substringAfter = function (val: string) {
    return this.substring(this.indexOf(val) + val.length)
};
String.prototype.substringBefore = function (val: string) {
    return this.substring(0, this.indexOf(val))
};
String.prototype.substringBetween = function (val1: string, val2: string) {
    return this.substringBefore(val2).substringAfter(val1)
};
String.prototype.substringAfterLast = function (val: string) {
    return this.substring(this.lastIndexOf(val) + val.length)
};
String.prototype.substringBeforeLast = function (val: string) {
    return this.substring(0, this.lastIndexOf(val))
};
String.prototype.substringBetweenLast = function (val1: string, val2: string) {
    return this.substringBeforeLast(val2).substringAfterLast(val1)
};
String.prototype.isDigit = function () {
    return "0123456789".includes(this.charAt(0))
};
String.prototype.toNumbers = function (delim: string = " ") {
    return this.split(delim)
        .filter(it => it.length > 0)
        .map(it => Number(it));
}


