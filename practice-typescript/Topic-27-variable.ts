let message1: string = "Hello World";

message1 = 123; // Error: Type 'number' is not assignable to type 'string', but still compile and run
console.log("message1: " + message1); // 123

let number1: number = 1;
console.log("number1: " + number1); // 1

let isActive: boolean = true;
console.log("isActive: " + isActive); // true

let numArray: number[] = [1, 2, 3, 4, 5];
console.log("numArray: " + numArray); // [1, 2, 3, 4, 5]

let strArray: string[] = ["Hello", "World"];
console.log("strArray: " + strArray); // ["Hello", "World"]

let mixedArray: (number | string)[] = [1, "Hello", 2, "World"];
console.log("mixedArray: " + mixedArray); // [1, "Hello", 2, "World"]

let tuple: [number, string] = [1, "Hello"];
console.log("tuple: " + tuple); // [1, "Hello"]

let anyType: any = "Hello"; // turns off type checking for that value.
console.log("anyType: " + anyType); // Hello

let unknownType: unknown = "Hello"; // type-safe version of any (you must narrow/check before using it).
console.log("unknownType: " + unknownType); // Hello

let neverType: never = "Hello"; // this value should never exist.
console.log("neverType: " + neverType); // Hello

let objectType: object = { name: "John", age: 20 };
console.log("objectType: " + objectType); // { name: "John", age: 20 }

let functionType: () => void = () => {
  console.log("Hello");
};
console.log("functionType: " + functionType); // () => void

let promiseType: Promise<string> = new Promise((resolve, reject) => {
  resolve("Hello");
});
console.log("promiseType: " + promiseType); // Promise<string>

let arrayType: Array<number> = [1, 2, 3, 4, 5];
console.log("arrayType: " + arrayType); // [1, 2, 3, 4, 5]
