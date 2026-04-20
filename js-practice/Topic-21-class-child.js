const { Animal } = require("./Topic-20-class-parent.js");

// Child class: inherits Animal’s constructor pattern and methods via `extends`.
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // must run before using `this` — calls Animal’s constructor
    this.breed = breed;
  }

  // Override: replaces Animal.prototype.speak for Dog instances.
  speak() {
    return `${this.name} barks!`;
  }

  // Child-only behavior (not on Animal).
  describe() {
    return `${this.name} is a ${this.breed}.`;
  }
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.describe()); // Rex is a Labrador.
console.log(dog.speak()); // Rex barks!

// `dog` is still an Animal in the inheritance sense:
console.log("dog instanceof Animal:", dog instanceof Animal); // true
console.log("dog instanceof Dog:", dog instanceof Dog); // true
