/*
Create an array named studentNames with the names of your students.

Add a new student name to the beginning of the array.

Remove the last student name from the array.

Alphabetize the student names within the array.
*/
let studentNames = ["John", "Tom", "Alan", "Xeno", "Aaron"];
studentNames.unshift("Jane");
console.log("Student Names: " + studentNames);
studentNames.pop();
console.log("Student Names: " + studentNames);
studentNames.sort();
console.log("Student Names: " + studentNames);
