// Array iteration with For loop
let numbers = [1, 2, 3, 4, 5];

let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log("Sum: " + sum); // Result: Sum: 15

// Calculate the sum of the array using reduce method
let total = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log("Total: " + total); // Result: Total: 15

let total2 = numbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log("Total2: " + total2); // Result: Total2: 15

// Create a sub-array with number multiple of 2
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = [];

for (i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    result.push(numbers[i]);
  }
}
console.log("Result: " + result); // Result: 2,4,6,8,10

// Create a sub-array with number multiple of 2 using filter method
let result2 = numbers.filter((number) => number % 2 === 0);
console.log("Result2: " + result2); // Result2: 2,4,6,8,10

// Create a sub-array with each number multiplied by 10 using map method
let result3 = numbers.map((number) => number * 10);
console.log("Result3: " + result3); // Result3: 20,40,60,80,100

// Create a sub-array with number multiple of 2, then multiple each of them by 10, then sum all values
let result4 = numbers
  .filter((number) => number % 2 === 0)
  .map((number) => number * 10)
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Result4: " + result4); // Result4: 300
