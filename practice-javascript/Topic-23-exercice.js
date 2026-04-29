/*
Create an array called expenses that contains at least 5 different expense amounts.

Calculate the total expenses by summing all the elements of the array.

Find the highest and lowest individual expenses within the array.
*/
let expenses = [6, 2, 5, 1, 3, 4];
let total = expenses.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log("Total: " + total);

let highestValue = expenses.reduce((accumulator, currentValue) => {
  if (currentValue > accumulator) {
    accumulator = currentValue;
  }
  return accumulator;
}, 0);

console.log("Highest Value: " + highestValue);

let lowestValue = expenses.reduce((accumulator, currentValue) => {
  if (accumulator == null) {
    accumulator = currentValue;
  }
  if (currentValue < accumulator) {
    accumulator = currentValue;
  }
  return accumulator;
}, null);

console.log("Lowest Value: " + lowestValue);
