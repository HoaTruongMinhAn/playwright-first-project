let user1: { name: string; age: number } = { name: "John", age: 20 };
console.log("User: " + JSON.stringify(user1)); // User: {"name":"John","age":20}

let user2: { name: string; age: number } = { name: "John", age: "20" }; // Error: Type 'string' is not assignable to type 'number'.
console.log("User: " + JSON.stringify(user2)); // User: {"name":"John","age":"20"}

user1.location = "New York"; // Error: Property 'location' does not exist in type { name: string; age: number }.
console.log("User: " + JSON.stringify(user1)); // User: {"name":"John","age":20,"location":"New York"}
