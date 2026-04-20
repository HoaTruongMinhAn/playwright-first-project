// --- Basic class: field declarations, constructor, instances ---
class Person {
  name;
  age;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const alice = new Person("Alice", 30);
console.log("alice: " + JSON.stringify({ name: alice.name, age: alice.age })); // Result: alice: {"name":"Alice","age":30}

const bob = new Person("Bob", 25);
bob.age = 26;
console.log("bob after assign age: " + bob.age); // Result: bob after assign age: 26

// --- Instance methods and `this` ---
class Counter {
  value = 0;

  increment(n = 1) {
    this.value += n;
    return this.value;
  }

  reset() {
    this.value = 0;
  }
}

const c = new Counter();
c.increment(3);
console.log("counter after increment(3): " + c.value); // Result: counter after increment(3): 3
c.reset();
console.log("counter after reset: " + c.value); // Result: counter after reset: 0

// --- Getters and setters ---
class Rectangle {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }

  get area() {
    return this.w * this.h;
  }

  set dimensions({ w, h }) {
    this.w = w;
    this.h = h;
  }
}

const rect = new Rectangle(4, 5);
console.log("rect.area (getter): " + rect.area); // Result: rect.area (getter): 20
rect.dimensions = { w: 3, h: 10 };
console.log("after setter area: " + rect.area); // Result: after setter area: 30

// --- Static members: shared across all instances ---
class MathHelper {
  static description = "small helpers";

  static add(a, b) {
    return a + b;
  }
}

console.log("static field: " + MathHelper.description); // Result: static field: small helpers
console.log("static method: " + MathHelper.add(2, 3)); // Result: static method: 5

// --- Private fields (#): not visible outside the class ---
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
    return this.#balance;
  }

  getBalance() {
    return this.#balance;
  }
}

const acc = new BankAccount();
acc.deposit(100);
console.log("balance via method: " + acc.getBalance()); // Result: balance via method: 100

// --- Inheritance: `extends` and `super` ---
class Employee extends Person {
  role;

  constructor(name, age, role) {
    super(name, age);
    this.role = role;
  }

  describe() {
    return this.name + " (" + this.age + "), " + this.role;
  }
}

const emp = new Employee("Carol", 40, "Engineer");
console.log("employee describe: " + emp.describe()); // Result: employee describe: Carol (40), Engineer
console.log("emp instanceof Employee: " + (emp instanceof Employee)); // Result: emp instanceof Employee: true
console.log("emp instanceof Person: " + (emp instanceof Person)); // Result: emp instanceof Person: true

// --- Method overriding and `super` in methods ---
class Greeter {
  greet() {
    return "Hello";
  }
}

class LoudGreeter extends Greeter {
  greet() {
    return super.greet().toUpperCase() + "!";
  }
}

console.log(new LoudGreeter().greet()); // Result: HELLO!

// --- Class expression (assignable name) ---
const NamedBox = class {
  constructor(label) {
    this.label = label;
  }
};
const box = new NamedBox("docs");
console.log("class expression instance: " + box.label); // Result: class expression instance: docs
