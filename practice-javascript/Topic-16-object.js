// --- Object literals: keys, values, comma placement ---
let person = {
  name: "John",
  age: 30,
  city: "New York",
};
console.log("person: " + JSON.stringify(person)); // Result: person: {"name":"John","age":30,"city":"New York"}

// --- Read properties: dot notation vs bracket notation ---
console.log("name (dot): " + person.name); // Result: name (dot): John
console.log("city (bracket): " + person["city"]); // Result: city (bracket): New York

let prop = "age";
console.log("dynamic key [" + prop + "]: " + person[prop]); // Result: dynamic key [age]: 30

person.name = "Jane";
console.log("after assign: " + person.name); // Result: after assign: Jane

// --- Add, update, and remove properties ---
person.email = "jane@example.com";
console.log("after add: " + person.email); // Result: after add: jane@example.com

delete person.city;
console.log("after delete city: " + ("city" in person)); // Result: after delete city: false

// --- Shorthand properties and computed property names ---
const x = 10;
const y = 20;
const shorthand = { x, y }; // same as { x: x, y: y }
console.log("shorthand: " + JSON.stringify(shorthand)); // Result: shorthand: {"x":10,"y":20}

const keyName = "label";
const computed = {
  [keyName]: "computed key",
  [`prefix_${keyName}`]: "another key",
};
console.log("computed: " + JSON.stringify(computed)); // Result: computed: {"label":"computed key","prefix_label":"another key"}

// --- Methods on objects ---
const calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this.value;
  },
  reset() {
    this.value = 0;
  },
};
calculator.add(5);
console.log("calculator.value after add(5): " + calculator.value); // Result: calculator.value after add(5): 5
calculator.reset();
console.log("after reset: " + calculator.value); // Result: after reset: 0

// --- Check keys: `in`, `hasOwn`, optional chaining ---
console.log("'name' in person: " + ("name" in person)); // Result: 'name' in person: true
console.log("hasOwn age: " + Object.hasOwn(person, "age")); // Result: hasOwn age: true

let maybe = null;
console.log("optional (?.) : " + maybe?.nested); // Result: optional (?.) : undefined

// --- Iterate: `Object.keys`, `values`, `entries`, `for...in` ---
person.country = "USA";
console.log("keys: " + JSON.stringify(Object.keys(person))); // Result: keys: ["name","age","email","country"]
console.log("values sample: " + Object.values(person).slice(0, 2)); // Result: values sample: Jane,30
console.log(
  "entries (first): " + JSON.stringify(Object.entries(person)[0]),
); // Result: entries (first): ["name","Jane"]

let keysViaForIn = [];
for (const k in person) {
  keysViaForIn.push(k);
}
console.log("for...in keys: " + JSON.stringify(keysViaForIn)); // Result: for...in keys: ["name","age","email","country"]

// --- Copy and merge: spread and `Object.assign` ---
const base = { a: 1, b: 2 };
const mergedAssign = Object.assign({}, base, { b: 99, c: 3 });
console.log("assign merge: " + JSON.stringify(mergedAssign)); // Result: assign merge: {"a":1,"b":99,"c":3}

const mergedSpread = { ...base, b: 99, c: 3 };
console.log("spread merge: " + JSON.stringify(mergedSpread)); // Result: spread merge: {"a":1,"b":99,"c":3}

const shallowCopy = { ...person };
console.log("shallow copy name: " + shallowCopy.name); // Result: shallow copy name: Jane

// --- Destructuring (pick and rename) ---
const { name: userName, age: userAge } = person;
console.log("destructured: " + userName + ", " + userAge); // Result: destructured: Jane, 30

const { email = "unknown" } = { email: undefined };
console.log("default in destructuring: " + email); // Result: default in destructuring: unknown

// --- Nested objects (reference semantics) ---
let outer = {
  inner: { count: 1 },
};
let outerCopy = { ...outer };
outerCopy.inner.count = 42;
console.log("outer.inner.count after shallow copy tweak: " + outer.inner.count); // Result: outer.inner.count after shallow copy tweak: 42
