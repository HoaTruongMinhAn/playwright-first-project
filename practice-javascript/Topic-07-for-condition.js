console.log("########## for loop with condition ##########");
for (let count = 0; count < 10; count++) {
  if (count % 2 === 0) {
    console.log("count is: " + count);
  }
}

/* Result:
count is: 0
count is: 2
count is: 4
count is: 6
count is: 8
*/

console.log("########## for loop with AND condition ##########");
for (let count = 0; count < 10; count++) {
  if (count % 2 === 0 && count % 3 === 0) {
    console.log("count is: " + count);
  }
}
/* Result:
count is: 0
count is: 6
*/

console.log("########## for loop with OR condition ##########");
for (let count = 0; count < 10; count++) {
  if (count % 2 === 0 || count % 3 === 0) {
    console.log("count is: " + count);
  }
}
/* Result:
count is: 0
count is: 2
count is: 3
count is: 4
count is: 6
count is: 8
count is: 9
*/

console.log("########## for loop with BREAK statement ##########");
let totalPrinted = 0;

for (let count = 0; count < 10; count++) {
  if (count % 2 === 0) {
    console.log("count is: " + count);
    totalPrinted++;
    if (totalPrinted === 2) {
      break;
    }
  }
}
/* Result:
count is: 0
count is: 2
*/
