// Sort a Number array in ascending order
let numbers = [10, 5, 6, 3, 4, 100, 20, 15];
numbers.sort((a, b) => a - b);
console.log("Numbers sort ascending: " + numbers); // Result: Numbers: 3,4,5,6,10,15,20

// Sort a Number array in descending order
numbers = [10, 5, 6, 3, 4, 100, 20, 15];
numbers.sort((a, b) => b - a);
console.log("Numbers sort descending: " + numbers); // Result: Numbers: 20,15,10,6,5,4,3

// Sort a String array in ascending order
let strings = [
  "dog",
  ,
  "yellow",
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  5,
  7,
  6,
  "5 apple",
];
console.log("Strings: " + strings.sort()); // Result: 5,5 apple,6,7,apple,banana,cherry,date,dog,elderberry,yellow

// Sort a String array in descending order
strings = [
  "dog",
  ,
  "yellow",
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  5,
  7,
  6,
  "5 apple",
];
console.log("Strings reversed: " + strings.sort().reverse()); // Result: ,yellow,elderberry,dog,date,cherry,banana,apple,7,6,5 apple,5
