const { Counter } = require("./Topic-18-class-export.js");

const c = new Counter();
c.increment(3);
console.log("counter after increment(3): " + c.value); // Result: counter after increment(3): 3
c.reset();
console.log("counter after reset: " + c.value); // Result: counter after reset: 0
