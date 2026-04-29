// --- `let` is block-scoped: only exists inside `{ ... }` ---
function demoBlockScope() {
  if (true) {
    let insideIf = "stays inside the block";
    console.log(insideIf); // Result: stays inside the block
  }
  // console.log(insideIf); // ReferenceError — not visible here (unlike `var`)
}
demoBlockScope();

// --- Temporal Dead Zone (TDZ): no reading before the declaration line runs ---
try {
  console.log(notYet); // never runs successfully
  let notYet = "too late";
} catch (e) {
  console.log("TDZ error: " + e.name); // Result: TDZ error: ReferenceError
}

// --- Reassignment is allowed (unlike `const`) ---
let score = 0;
score += 10;
console.log("Score: " + score); // Result: Score: 10

// --- No redeclaration in the same block (SyntaxError) ---
try {
  new Function("let n = 1; let n = 2;")();
} catch (e) {
  console.log("Redeclare in same scope: " + e.name); // Result: Redeclare in same scope: SyntaxError
}

// --- Shadowing: inner `let` hides outer in its block only ---
let level = "outer";
{
  let level = "inner";
  console.log("Inner block: " + level); // Result: Inner block: inner
}
console.log("After block: " + level); // Result: After block: outer

// --- `for` loop: each iteration gets its own `let` binding (safe for closures) ---
let funcs = [];
for (let i = 0; i < 3; i++) {
  funcs.push(function () {
    return i;
  });
}
console.log("Loop let: " + funcs.map((f) => f()).join(",")); // Result: Loop let: 0,1,2
