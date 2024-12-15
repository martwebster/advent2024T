import './array.ext';
import './string.ext'

export {};


declare global {
    interface Pos { 
        x: number;
        y: number;
    }
}

export const repeat = (count: number, callback: () => void,  ): void=>{
    for (let index = 0; index < count; index++) {
        callback()
    }
} 
