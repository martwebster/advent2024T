import { readFileSync } from "fs"

export const readTestData = (fileName: string): string[] => {
    const file = readFileSync(fileName).toString();
    const data = file.split("\r\n");
    if (data.length==1){
        return file.split("\n");
    }
    return data;
}        
