// Parent (base) class: shared state and behavior for all “kinds” of this type.
class Animal {
  constructor(name) {
    this.name = name;
  }

  // Instance method — child classes can reuse or override this.
  speak() {
    return `${this.name} makes a sound.`;
  }
}

module.exports = { Animal };
