// Declare an array
let marks = Array(6);
console.log("marks: " + marks); // Result: marks: ,,,,,,

let genders = new Array("male", "female", "other");
console.log("genders: " + genders); // Result: genders: male,female,other

let numbers = [1, 2, 3, 4, 5];
console.log("numbers: " + numbers); // Result: numbers: 1,2,3,4,5

// Accessing array elements
console.log("numbers[0]: " + numbers[0]); // Result: numbers[0]: 1
console.log("numbers[1]: " + numbers[1]); // Result: numbers[1]: 2
console.log("numbers[2]: " + numbers[2]); // Result: numbers[2]: 3
console.log("numbers[3]: " + numbers[3]); // Result: numbers[3]: 4
console.log("numbers[4]: " + numbers[4]); // Result: numbers[4]: 5

// Accessing array length
console.log("numbers.length: " + numbers.length); // Result: numbers.length: 5

// Changing array elements
numbers[0] = 10;
console.log("After changing numbers[0]: numbers: " + numbers); // Result: numbers: 10,2,3,4,5

numbers.push(6);
console.log("After pushing 6: numbers: " + numbers); // Result: numbers: 10,2,3,4,5,6

numbers.pop();
console.log("After popping: numbers: " + numbers); // Result: numbers: 10,2,3,4,5

numbers.shift();
console.log("After shifting: numbers: " + numbers); // Result: numbers: 2,3,4,5

numbers.unshift(7);
console.log("After unshifting 7: numbers: " + numbers); // Result: numbers: 7,2,3,4,5

numbers.splice(2, 1);
console.log("After splicing 2,1: numbers: " + numbers); // Result: numbers: 7,2,4,5

numbers.splice(2, 1, 9);
console.log("After splicing 2,1,9: numbers: " + numbers); // Result: numbers: 7,2,9,5

numbers.splice(2, 1, 3, 4);
console.log("After splicing 2,1,3,4: numbers: " + numbers); // Result: numbers: 7,2,3,4,5

// Finding elements
numbers = [1, 2, 3, 4, 5, 3];
console.log("IndexOf 99: " + numbers.indexOf(99)); // Result: IndexOf 99: -1
console.log("IndexOf 3: " + numbers.indexOf(3)); // Result: IndexOf 3: 2
console.log("Last IndexOf 3: " + numbers.lastIndexOf(3)); // Result: Last IndexOf 3: 5

// Checking if elements are present
console.log("Includes 99? " + numbers.includes(99)); // Result: Includes 99? false
console.log("Includes 3? " + numbers.includes(3)); // Result: Incudes 3? true
console.log("Includes '3'? " + numbers.includes("3")); // Result: Incudes '3'? false

// Get sub-array
console.log("Slice 0,3: " + numbers.slice(0, 3)); // Result: Slice 0,3: 1,2,3
console.log("Slice 2,2: " + numbers.slice(2, 2)); // Result: Slice 2,2: empty array
console.log("Slice 2,3: " + numbers.slice(2, 3)); // Result: Slice 2,3: 3
console.log("Slice 2,4: " + numbers.slice(2, 4)); // Result: Slice 2,4: 3,4
console.log("Slice 2,5: " + numbers.slice(2, 5)); // Result: Slice 2,5: 3,4,5
console.log("Slice 2,6: " + numbers.slice(2, 6)); // Result: Slice 2,6: 3,4,5,3
console.log("Slice 2,7: " + numbers.slice(2, 7)); // Result: Slice 2,7: 3,4,5,3
console.log("Slice 2,-1: " + numbers.slice(2, -1)); // Result: Slice 2,-1: 3,4,5
console.log("Slice 2: " + numbers.slice(2)); // Result: Slice 2: 3,4,5,3
