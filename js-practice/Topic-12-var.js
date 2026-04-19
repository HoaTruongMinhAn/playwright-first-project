// --- var is function-scoped (not block-scoped) ---
// `let`/`const` live only inside `{ }` blocks; `var` attaches to the whole function or script.
function demoBlockScope() {
  if (true) {
    var insideIf = "I leak to the function";
    // let trapped = "only here"; // would not exist outside the block
  }
  console.log(insideIf); // Result: I leak to the function
}
demoBlockScope();

// --- Hoisting: the name exists for the whole scope; assignment runs in place ---
console.log(hoistedName); // Result: undefined (declaration hoisted, not the value)
var hoistedName = "assigned later";
console.log(hoistedName); // Result: assigned later

// Roughly equivalent mental model:
// var hoistedName;
// console.log(hoistedName); // undefined
// hoistedName = "assigned later";

// --- Redeclaration in the same scope is allowed (unlike let/const) ---
var counter = 1;
var counter = 2; // valid with var
console.log("Counter: " + counter); // Result: Counter: 2

// --- Loop gotcha: one shared binding when you need a new value per iteration ---
var funcs = [];
for (var i = 0; i < 3; i++) {
  funcs.push(function () {
    return i; // all closures see the same `i` after the loop finishes
  });
}
console.log("Loop var: " + funcs.map((f) => f()).join(",")); // Result: Loop var: 3,3,3

// Fix: capture in a function scope (IIFE) or use `let` in the for-loop
var funcsFixed = [];
for (var j = 0; j < 3; j++) {
  (function (n) {
    funcsFixed.push(function () {
      return n;
    });
  })(j);
}
console.log("IIFE capture: " + funcsFixed.map((f) => f()).join(",")); // Result: IIFE capture: 0,1,2

// --- Top-level `var`: scripts vs modules ---
// Classic browser <script> (no type="module"): top-level `var x` adds `window.x` / `globalThis.x`.
// Node wraps each `.js` file in a module — top-level `var` stays module-local (not on globalThis).
var moduleScopedLike = 42;
console.log("Same file sees var: " + moduleScopedLike); // Result: Same file sees var: 42
console.log("globalThis.moduleScopedLike (Node module): " + globalThis.moduleScopedLike); // Result: globalThis.moduleScopedLike (Node module): undefined
