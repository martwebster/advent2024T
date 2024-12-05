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
### Day 2
Day 2 tool longer than it should. I tried to refactor the code after getting the sample tests passing, however, the simplificaiton introduced a bug.
Grrr!. When the samples all work, and the input produces an error!.

My answer, was too high, so it looks like that it was incorrectly marking lines safe which were not.
Looking at the input, I found
```
7 6 7 6 7
```
Breakthrough.
### Day 3
For the first 20 seconds, I considered to try and not use Regular expressions. Was a pain, so switched to Regular expressisons.

Documentation doesn't seem that clear in typescript, but finally was able to get something working:
```
const buildMul = (instruction: string): number[] =>{
    return [ Number(instruction.substringAfter("(").substringBefore(",")), Number(instruction.substringAfter(",").substringBefore(")")) ];
}

export const extractMultiplications = (data: string): number[][]  => {
    const matches = data.match(RegExp('mul\\([0-9]{1,3},[0-9]{1,3}\\)', "g"))
    if (matches === null){
        return [];
    }
    return matches.map(buildMul);
}

```
### Day 4
Wordsearch. I thought this was quite easy, if you don't rush and plan accordingly. 

Just repeat how you do Wordsearches.

Added a new Interface to Global - positions in a grid.
```
    interface Pos { 
        x: number;
        y: number;
    }
```
Also, added a new function to an array, to generate a lost of positions for a simple grid.
```
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
```
### Day 5
A good day 5. Slightly tricky, but what you expect on day 5.
