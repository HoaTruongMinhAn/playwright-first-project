// Named function
function sum(a, b) {
  return a + b;
}
console.log("Sum: " + sum(1, 2)); // Result: Sum: 3

// Function expression
const sum2 = function (a, b) {
  return a + b;
};
console.log("Sum2: " + sum2(1, 2)); // Result: Sum2: 3

// Arrow function
const sum3 = (a, b) => a + b;
console.log("Sum3: " + sum3(1, 2)); // Result: Sum3: 3

// Object method shorthand
const calculator = {
  sum(a, b) {
    return a + b;
  },
  minus(a, b) {
    return a - b;
  },
};
console.log("Calculator: " + calculator.sum(1, 2)); // Result: Calculator: 3
console.log("Calculator: " + calculator.minus(1, 2)); // Result: Calculator: -1

// Getter / setter pair — `value` reads/writes backing `_value` (setter alone would leave reads undefined)
const boxed = {
  _value: -1,
  get value() {
    return this._value;
  },
  set value(v) {
    this._value = v;
  },
  get doubled() {
    return this.value * 2;
  },
};
boxed.value = 5;
console.log("Value: " + boxed.value); // Result: Value: 5
console.log("Doubled: " + boxed.doubled); // Result: Doubled: 10

// Class method
class Adder {
  sum(a, b) {
    return a + b;
  }
}
const adder = new Adder();
console.log("Class sum: " + adder.sum(1, 2)); // Result: Class sum: 3

// Async function (returns a Promise — use await when calling from async code)
async function sumAsync(a, b) {
  return a + b;
}
sumAsync(1, 2).then((r) => console.log("Async sum: " + r)); // Result: Async sum: 3

const sumAsyncArrow = async (a, b) => a + b;
sumAsyncArrow(1, 2).then((r) => console.log("Async arrow sum: " + r)); // Result: Async arrow sum: 3
