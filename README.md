# Advent of code 2024

## Day 1
That is a nice gentle introduction. Add a couple of new functions to Array, to make sorting easier:
```
        sortAscending(): Array<T>;
        sortDescending(): Array<T>;
```
I've also added a new function to a String to convert the line into a number[]. I assume this will come in handy in the following days.
```
        /**
         * Convert string into a number array
         * @param delim defaults to " ", but can passed through
         */
        toNumbers(delim?: string): number[];
```
