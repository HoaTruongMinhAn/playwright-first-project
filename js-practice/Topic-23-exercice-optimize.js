/*
Create an array called expenses that contains at least 5 different expense amounts.

Calculate the total expenses by summing all the elements of the array.

Find the highest and lowest individual expenses within the array.
*/
const expenses = [6, 2, 5, 1, 3, 4];

const summary = expenses.reduce(
  (accumulator, currentValue) => ({
    total: accumulator.total + currentValue,
    highest: Math.max(accumulator.highest, currentValue),
    lowest: Math.min(accumulator.lowest, currentValue),
  }),
  {
    total: 0,
    highest: Number.NEGATIVE_INFINITY,
    lowest: Number.POSITIVE_INFINITY,
  },
);

console.log("Total: " + summary.total);
console.log("Highest Value: " + summary.highest);
console.log("Lowest Value: " + summary.lowest);
