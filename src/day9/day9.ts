import { LargeNumberLike } from "crypto";

export interface File {
    id: number;
}

export const parseLine = (line: string) : string[] =>{

    var input = line.split("").map( x=> +x)
    var free = false;
    var id = 0;
    var disk: string[] = []

    for (let index = 0; index < input.length; index++) {
        const element = input[index];
        if (!free){
            for (let j = 0; j < element; j++) {
                disk.push(id.toString());
            }
            id++
        } else {
            for (let j = 0; j < element; j++) {
                disk.push(".");
            }
        }
        free = !free
    }
    return disk
}

export const getNextFree = (line: string[]): number| undefined =>{
    var nextFree : number|undefined;
    for (let index = 0; index < line.length; index++) {
        const element = line[index];
        if (element=== "."){
            nextFree = index;
            break;
        }
    }
    if (nextFree!== undefined){
        const toDo = line.slice(nextFree).some(it => it!==".")
        if (toDo){
            return nextFree
        }
    }
    return undefined
}

export const defrag = (disk: string[]) : string[] =>{

    var nextFree = getNextFree(disk) 
    var index = disk.length -1;
    while (nextFree && index>=0) {
        const element = disk[index];
        if (element!== "."){
            disk[nextFree!] = element;
            disk[index] = "."
            var nextFree = getNextFree(disk) 
        }
        index--;
    }
    return disk;
}

export const calculateCheckSum= (disk : string[]) : number =>{

    var total =0;
    var id = 0;

    for (let index = 0; index < disk.length; index++) {
        const element = disk[index];
        if (element!== "."){
            total += Number(element)*id;
        }
        id++;
    }
    return total;
}

export const part1= (line: string): number =>{
    var fullLine = parseLine(line)
    var defragLine = defrag(fullLine)
    return calculateCheckSum(defragLine);
}

interface Chunk {
    startPos: number;
    length: number;
    id : string;
}

export const getFiles = ( disk: string[]): Array<Chunk> =>{
    var chunks : Chunk[] = []
    var chunk : Chunk | undefined
    for (let index = 0; index < disk.length; index++) {
        const element = disk[index];
        if (element!= ".") {
            if (!chunk || ( element!= chunk.id)){
                chunk = {
                    startPos: index,
                    length :1,
                    id : element
                }
                chunks.push(chunk)
            } else{
                chunk.length = chunk.length +1
            }
        } else {
            chunk = undefined;
        }
    }
    return chunks;
}

export const getNextFileSpace = ( disk: string[], length: number ): number| undefined =>{
    // find the index of first position, that is free space
    var currentSize = 0;
    for (let index = 0; index < disk.length; index++) {
        const element = disk[index];
        if (element == "."){
            currentSize++
            if (currentSize==length){
                return index -length + 1;
            }
        } else {
            currentSize = 0;
        }
    }
    return undefined;

}


export const defrag2 = (disk: string[]) : string[] =>{
    var files = getFiles(disk);
    while (files.length>0){
        var file = files.pop();
        var space = getNextFileSpace(disk, file!.length);
        if (space && space < file!.startPos){
            for (let index = 0; index < file!.length; index++) {
                disk[space + index] = file!.id
                disk[file!.startPos + index] = "."
            }
        }
    }
    return disk;
}

export const part2= (line: string): number =>{
    var fullLine = parseLine(line)
    var defragLine = defrag2(fullLine)
    return calculateCheckSum(defragLine);
}