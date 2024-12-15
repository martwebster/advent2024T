export {};

declare global {
    interface Array<T> {
        /**
         * Return the last item in the array. Undefined returned for empty arrays
         */
        last(): T | undefined
        /**
         * Return the first item in the array. Undefined return for empty arrays
         */
        first(): T | undefined
        /**
         * Sum up all the elements in the array
         */
        sum(): number
        /**
         * Sum up the results of the function. This is generally used to map to a property in an object
         * @param attribute function passed through to extract a number to sum
         */
        sumOf(attribute: (item: T) => number): number
        min(): number
        minOf(attribute: (item: T) => number): number
        max(): number
        maxOf(attribute: (item: T) => number): number
        /**
         * Count the number of times a predicate is true
         */
        countOf(filter: (item: T) => boolean): number
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
        /**
         * Swap two elements in an array
         */
        swap( from: Pos, to:Pos): void
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

/**
 * Count the number of times a predicate is true
 */
Array.prototype.countOf = function (filter: (item: any) => boolean): number {
    return this.filter(filter).length;
}

Array.prototype.swap = function (from: Pos, to: Pos ) : void {
    var temp = this[to.y][to.x]
    this[to.y][to.x] = this[from.y][from.x]
    this[from.y][from.x] = temp;
}
 
