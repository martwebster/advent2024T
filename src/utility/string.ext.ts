export {};

declare global {
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
        lastChar(): string
    }
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
String.prototype.lastChar = function () {
    return this.charAt(this.length-1)
}