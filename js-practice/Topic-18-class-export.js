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

export { Counter };
