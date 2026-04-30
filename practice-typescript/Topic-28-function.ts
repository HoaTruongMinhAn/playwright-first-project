function add(a: number, b: number): number {
  return a + b;
}

console.log("Add: " + add(1, 2));
console.log("Add: " + add(1, "a")); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
function add2(a: number, b: number): number {
  return a + b + " Hello"; // Error: Type 'string' is not assignable to type 'number'.
}
console.log("Add2: " + add2(1, 2));
console.log("Add2: " + add2(1, "a")); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
