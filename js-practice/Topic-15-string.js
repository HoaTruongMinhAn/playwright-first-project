// --- Creating strings: quotes, template literals, and `String()` ---
const doubleQuoted = "Hello";
const singleQuoted = "World";
const template = `Hi, ${doubleQuoted} — count: ${1 + 1}`; // embed expressions
const fromNumber = String(42);
const fromBool = String(true);
console.log("Template: " + template); // Result: Template: Hi, Hello — count: 2
console.log("String from number: " + fromNumber + ", from bool: " + fromBool); // Result: String from number: 42, from bool: true

// --- `length` and character access (index, `charAt`, `at`) ---
let myName = "Tuesday Steve";
console.log("name: " + myName); // Result: name: Tuesday Steve
console.log("length: " + myName.length); // Result: length: 13
console.log("first letter: " + myName[0]); // Result: first letter: T
console.log("last letter: " + myName[myName.length - 1]); // Result: last letter: e
console.log("charAt(3): " + myName.charAt(3)); // Result: charAt(3): s
console.log("at(-3) (from end): " + myName.at(-3)); // Result: at(-3) (from end): e

// --- Case changes ---
console.log("uppercase: " + myName.toUpperCase()); // Result: uppercase: TUESDAY STEVE
console.log("lowercase: " + myName.toLowerCase()); // Result: lowercase: tuesday steve

// --- Search: `indexOf`, `lastIndexOf`, `includes`, `startsWith`, `endsWith` ---
console.log("indexOf 'day': " + myName.indexOf("day")); // Result: indexOf 'day': 4
console.log("lastIndexOf 'e': " + myName.lastIndexOf("e")); // Result: lastIndexOf 'e': 12
console.log("search 'T': " + myName.search("T")); // Result: search 'T': 0
console.log("search 'u': " + myName.search("u")); // Result: search 'u': 1
console.log("search 'z': " + myName.search("z")); // Result: search 'z': -1
console.log("search 'day': " + myName.search("day")); // Result: search 'day': 4
console.log("search /S[a-z]+/: " + myName.search(/S[a-z]+/)); // Result: search /S[a-z]+/: 8
console.log("includes 'day': " + myName.includes("day")); // Result: includes 'day': true
console.log("startsWith 'Tuesday': " + myName.startsWith("Tuesday")); // Result: startsWith 'Tuesday': true
console.log("endsWith 'Steve': " + myName.endsWith("Steve")); // Result: endsWith 'Steve': true

// --- Extract substrings: `substring`, `slice` (slice supports negative indices) ---
console.log("substring(0, 3): " + myName.substring(0, 3)); // Result: substring(0, 3): Tue
console.log("substring(3): " + myName.substring(3)); // Result: substring(3): sday Steve
console.log("slice(0, 3): " + myName.slice(0, 3)); // Result: slice(0, 3): Tue
console.log("slice(0, -1): " + myName.slice(0, -1)); // Result: slice(0, -1): Tuesday Stev
console.log("slice(-3): " + myName.slice(-3)); // Result: slice(-3): eve

// --- Whitespace: `trim`, `trimStart`, `trimEnd` ---
let padded = "   Tuesday Steve   ";
console.log("trim: '" + padded.trim() + "'"); // Result: trim: 'Tuesday Steve'
console.log("trimStart: '" + padded.trimStart() + "'"); // Result: trimStart: 'Tuesday Steve   '
console.log("trimEnd: '" + padded.trimEnd() + "'"); // Result: trimEnd: '   Tuesday Steve'

// --- Replace and repeat ---
console.log("replace: " + myName.replace("Steve", "John")); // Result: replace: Tuesday John
console.log("replaceAll 'e'→'a': " + myName.replaceAll("e", "a")); // Result: replaceAll 'e'→'a': Tuasday Stava
console.log("repeat: " + "ha".repeat(3)); // Result: repeat: hahaha

// --- Split, join, concat ---
console.log("split: " + JSON.stringify(myName.split(" "))); // Result: split: ["Tuesday","Steve"]
console.log("join: " + myName.split(" ").join("_")); // Result: join: Tuesday_Steve
console.log("concat: " + myName.concat("!", " ✓")); // Result: concat: Tuesday Steve! ✓

// --- Padding (fixed width, often for numbers or alignment) ---
console.log("padStart: '" + myName.padStart(20, "x") + "'"); // Result: padStart: 'xxxxxxxTuesday Steve'
console.log("padEnd: '" + myName.padEnd(20, "x") + "'"); // Result: padEnd: 'Tuesday Stevexxxxxxx'
console.log("numeric pad: '" + "7".padStart(3, "0") + "'"); // Result: numeric pad: '007'

// --- Locale-aware comparison (sorting user-visible text) ---
console.log("localeCompare b vs a: " + "b".localeCompare("a")); // Result: localeCompare b vs a: 1

// --- Convert string to number ---
let day = "20";
let gap = 1;
let nextDay = parseInt(day) + gap;
console.log("nextDay: " + nextDay); // Result: nextDay: 21

// --- Convert number to string ---
let number = 21;
let numberString = number.toString();
console.log(
  "numberString: " + numberString + ", length: " + numberString.length,
); // Result: numberString: 21, length: 2
