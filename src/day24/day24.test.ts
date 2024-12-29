
import '../utility/extensions';
import { test, describe, expect } from 'vitest'
import { readTestData } from '../utility/fileHelper';
import { evalGates, extractNumber, findInvalidRule1, findInvalidRule2, Gate, parseValues, swap } from './day24';


describe('day 24', () => {
   test ('Sample 1', () =>{

      const data = [
         "x00: 1",
         "x01: 1",
         "x02: 1",
         "y00: 0",
         "y01: 1",
         "y02: 0",
         "",
         "x00 AND y00 -> z00",
         "x01 XOR y01 -> z01",
         "x02 OR y02 -> z02"
      ]

      var section1 = data.split("")[0]
      var section2 = data.split("")[1]
      
      const gates = Gate.from(section2);
      expect (gates.length).toBe(3)

      const values = parseValues(section1)
      var z00 = gates[0].evaluate(values)!;
      expect (z00).toStrictEqual(["z00", 0])
      values.set(z00[0],z00[1] )

      var z01 = gates[1].evaluate(values)!;
      expect (z01).toStrictEqual(["z01", 0])
      values.set(z01[0],z01[1] )

      var z02 = gates[2].evaluate(values)!;
      expect (z02).toStrictEqual(["z02", 1])
      values.set(z02[0],z02[1] )
   })

   test ('Sample 1 Full', () =>{
      const data = [
         "x00: 1",
         "x01: 1",
         "x02: 1",
         "y00: 0",
         "y01: 1",
         "y02: 0",
         "",
         "x00 AND y00 -> z00",
         "x01 XOR y01 -> z01",
         "x02 OR y02 -> z02"
      ]

      var section1 = data.split("")[0]
      var section2 = data.split("")[1]
      
      const gates = Gate.from(section2);
      const values = parseValues(section1)
      
      expect(evalGates(gates, values)).toBe(4)
   })

   test ('Sample 2', () =>{
      const data = readTestData('./src/day24/input.sample.txt')

      var section1 = data.split("")[0]
      var section2 = data.split("")[1]
      
      const gates = Gate.from(section2);
      const values = parseValues(section1)
      
      expect(evalGates(gates, values)).toBe(2024)
   })

   test ('Part 1', () =>{
      const data = readTestData('./src/day24/input.txt')

      var section1 = data.split("")[0]
      var section2 = data.split("")[1]
      
      const gates = Gate.from(section2);
      //222 gates
      const values = parseValues(section1)
      
      expect(evalGates(gates, values)).toBe(56620966442854)
   })

   test ('Part 2 = Sample', () =>{
      const data = readTestData('./src/day24/input.sample2.txt')

      var section1 = data.split("")[0]
      var section2 = data.split("")[1]
      
      const gates = Gate.from(section2);

      //x00 AND y00  -> z05 (0) and x05 AND y05 -> z00 (4)
      //x-1 AND y01 -> z02 (1) and x02 AND y02(2) -> z01
      gates[0].output = "z00"
      gates[1].output = "z01"
      gates[2].output = "z02"
      gates[5].output = "z05"
      
      const values = parseValues(section1)
      
      expect (extractNumber("x", values)).toBe(42)
      expect (extractNumber("y", values)).toBe(44)

      const z = evalGates(gates, values)
      expect (z).toBe(40)
   })

   test ('Part 2', () =>{
      const data = readTestData('./src/day24/input.txt')

      var section2 = data.split("")[1]
      
      const gates = Gate.from(section2);
      var result: string[] = []
      result = [...result, ...swap(gates,"cds XOR rkv","sdj OR nph")]
      result = [...result,  ...swap(gates,"ksn XOR nft","ksn AND nft")]
      result = [...result,  ...swap(gates,"bvp XOR gdb","x26 AND y26")]
      result = [...result,  ...swap(gates,"x34 XOR y34","y34 AND x34")]
      result.sort();
      console.log("Swaps", result.join(","))

      var values = initialiseValues();
      values.set("x00", 1)
      values.set("y00", 1)
      expect(evalGates(gates, values)).toBe(2)

      for (let index = 1; index < 45; index++) {

         // check carry over from previous
         values = initialiseValues();
         values.set("x"+ formatIndex(index-1), 1)
         values.set("y"+ formatIndex(index-1), 1)
         values.set("x"+ formatIndex(index), 0)
         values.set("y"+ formatIndex(index), 0)
         var test1 = evalGates(gates, values) == Math.pow(2,index)  
         
         // check x=1, y=0 with no previous carry over
         values = initialiseValues();
         values.set("x"+ formatIndex(index-1), 0)
         values.set("y"+ formatIndex(index-1), 0)
         values.set("x"+ formatIndex(index), 1)
         values.set("y"+ formatIndex(index), 0)
         var test2 = evalGates(gates, values) == Math.pow(2,index)  
         
         // check x=1, y=1 with no previous
         values = initialiseValues();
         values.set("x"+ formatIndex(index-1), 0)
         values.set("y"+ formatIndex(index-1), 0)
         values.set("x"+ formatIndex(index), 1)
         values.set("y"+ formatIndex(index), 1)
         var test3 = evalGates(gates, values) == Math.pow(2,index+1)  
         
         // check x=1, y=1 with carry over
         values = initialiseValues();
         values.set("x"+ formatIndex(index-1), 1)
         values.set("y"+ formatIndex(index-1), 1)
         values.set("x"+ formatIndex(index), 1)
         values.set("y"+ formatIndex(index), 1)

         var test4 = evalGates(gates, values) == Math.pow(2,index) + Math.pow(2,index+1)
         console.log(index, test1, test2, test3, test4)
      }

      console.log ("Rule 1" ,findInvalidRule1(gates))

      console.log ("Rule 2" ,findInvalidRule2(gates))


   })
   // 7 false false false true
   // 8 false true true false

   // result
   // x01 XOR y01 -> jjd (bit result)
   // jjd XOR whb -> z01 (result)

   // carry over
   // x01 AND y01 -> bdf (bit carry over)
   // jjd AND whb -> wbw ()
   // bdf OR wbw -> qkf

   // 34 result
   //x34 XOR y34 -> vvw (swap)
   //chv XOR fqf -> z34

   // 34 carry over
   //y34 AND x34 -> chv (swap)
   //fqf AND chv -> cwh
   // cwh OR vvw -> ttb
   

   //y35 AND x35 -> bbh
})

export const formatIndex = (index: number): string =>{
   if (index<10){
      return "0"+index;
   }
   return "" + index;

}

export const initialiseValues = () : Map<string,number> =>{
   const result : Map<string, number> = new Map();
   for (let index = 0; index < 48; index++) {
      result.set("x"+formatIndex(index), 0)
      result.set("y"+formatIndex(index), 0)
   }
   return result;
}