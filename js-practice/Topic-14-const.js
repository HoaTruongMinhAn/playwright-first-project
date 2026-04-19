// --- `const` must have an initializer (SyntaxError if missing) ---
try {
  new Function("const x;")();
} catch (e) {
  console.log("Missing initializer: " + e.name); // Result: Missing initializer: SyntaxError
}

// --- The binding cannot be reassigned (TypeError) ---
const baseUrl = "https://api.example.com";
try {
  new Function('const u = "a"; u = "b";')();
} catch (e) {
  console.log("Reassign const: " + e.name); // Result: Reassign const: TypeError
}
console.log("baseUrl: " + baseUrl); // Result: baseUrl: https://api.example.com

// --- Block-scoped, same as `let` (and same TDZ: no use before the line) ---
{
  const local = 1;
  console.log("Block const: " + local); // Result: Block const: 1
}
// console.log(local); // ReferenceError — not outside the block

// --- Object / array: the *reference* is fixed; *contents* can still change ---
const user = { name: "Ana" };
user.name = "Bo"; // OK — mutating the object
user.age = 30; // OK — adding a property
console.log("User: " + JSON.stringify(user)); // Result: User: {"name":"Bo","age":30}

const nums = [1, 2];
nums.push(3); // OK — mutating the array
console.log("Nums: " + nums.join(",")); // Result: Nums: 1,2,3

try {
  new Function("const o = {}; o = {};")();
} catch (e) {
  console.log("Reassign object variable: " + e.name); // Result: Reassign object variable: TypeError
}

// --- Truly immutable values: primitives freeze the value at assignment ---
const PI = 3.14159;
console.log("PI: " + PI); // Result: PI: 3.14159

// --- No redeclaration in the same scope ---
try {
  new Function("const k = 1; const k = 2;")();
} catch (e) {
  console.log("Redeclare const: " + e.name); // Result: Redeclare const: SyntaxError
}

// --- `for...of`: fresh `const` binding each iteration ---
const labels = [];
for (const ch of "ab") {
  labels.push(function () {
    return ch;
  });
}
console.log("for-of const: " + labels.map((f) => f()).join(",")); // Result: for-of const: a,b
