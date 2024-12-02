declare global {
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

export const apply = () => {
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
}

