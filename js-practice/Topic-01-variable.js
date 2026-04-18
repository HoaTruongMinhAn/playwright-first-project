console.log("Hello World!!!!!!!!!!");

// This is a comment

/*
This is a...
...multi-line comment
*/

// Variables
let studentName = "John";
console.log("name: " + studentName + ", type: " + typeof studentName); // name: John, type: string
studentName = 99;
console.log("name: " + studentName + ", type: " + typeof studentName); // name: 99, type: number

let studentAge = 20;
console.log("age: " + studentAge + ", type: " + typeof studentAge); // age: 20, type: number

let isStudent = true;
console.log("isStudent: " + isStudent + ", type: " + typeof isStudent); // isStudent: true, type: boolean
console.log(
  "isStudent reversed: " + !isStudent + ", type: " + typeof !isStudent,
); // isStudent reversed: false, type: boolean

let balance = null;
console.log("balance: " + balance + ", type: " + typeof balance); // balance: null, type: object

let undefinedValue;
console.log(
  "undefinedValue: " + undefinedValue + ", type: " + typeof undefinedValue,
); // undefinedValue: undefined, type: undefined

// Constants
const PI = 3.14;
console.log("PI: " + PI + ", type: " + typeof PI); // PI: 3.14, type: number

const STUDENT_NAME = "John";
console.log("STUDENT_NAME: " + STUDENT_NAME + ", type: " + typeof STUDENT_NAME); // STUDENT_NAME: John, type: string
