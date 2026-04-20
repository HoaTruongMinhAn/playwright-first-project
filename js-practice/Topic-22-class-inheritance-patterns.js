/**
 * Common uses and mistakes with parent / child (extends) classes.
 * Run: node Topic-22-class-inheritance-patterns.js
 */

const { Animal } = require("./Topic-20-class-parent.js");

// --- Common good uses ---

// 1) Forward constructor arguments with `super(...)` so the parent stays in charge of its own fields.
class Cat extends Animal {
  constructor(name, indoor) {
    super(name);
    this.indoor = indoor;
  }
}

// 2) Extend parent behavior with `super.method()` instead of copy-pasting the parent’s string logic.
class LoudDog extends Animal {
  constructor(name) {
    super(name);
  }
  speak() {
    return super.speak().toUpperCase() + " AND BARKS!";
  }
}

// 3) Polymorphism: code that accepts `Animal` works with any subclass instance.
function announce(animal) {
  console.log("[announce]", animal.speak());
}

console.log("--- good patterns ---");
announce(new Cat("Mimi", true));
announce(new LoudDog("Buddy"));

// --- Common mistakes (shown safely) ---

function demoThisBeforeSuper() {
  class Base {
    constructor() {
      this.ok = true;
    }
  }
  class Bad extends Base {
    constructor() {
      // Mistake: using `this` before `super()` — ReferenceError
      this.x = 1;
      super();
    }
  }
  try {
    new Bad();
  } catch (e) {
    console.log("\n[mistake] this before super →", e.name + ":", e.message);
  }
}

function demoNoSuperCall() {
  class Base {}
  class Bad extends Base {
    constructor() {
      // Mistake: derived constructor never calls `super()` — ends up invalid
      // (engines throw when the constructor finishes without having called super).
    }
  }
  try {
    new Bad();
  } catch (e) {
    console.log("\n[mistake] constructor without super() →", e.name + ":", e.message);
  }
}

function demoForgotPassArgsToSuper() {
  class Person {
    constructor(first, last) {
      this.full = `${first} ${last}`;
    }
  }
  class Student extends Person {
    constructor(first, last, id) {
      super(); // Mistake: forgot `super(first, last)` — parent fields wrong / undefined
      this.id = id;
    }
  }
  const s = new Student("An", "Truong", 42);
  console.log("\n[mistake] super() without parent args → full is:", JSON.stringify(s.full), "id:", s.id);
}

function demoInstanceofVsTypeof() {
  const cat = new Cat("Nya", false);
  console.log("\n[good] instanceof Cat:", cat instanceof Cat);
  console.log("[good] instanceof Animal:", cat instanceof Animal);
  console.log("[gotcha] typeof cat:", typeof cat, "(always 'object' for class instances)");
}

demoThisBeforeSuper();
demoNoSuperCall();
demoForgotPassArgsToSuper();
demoInstanceofVsTypeof();
