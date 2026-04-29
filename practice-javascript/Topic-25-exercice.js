/*
You have an array called productPrices with various product prices.

Apply a 10% discount to all prices using the map method and store the results in a new array called discountedPrices.

Use the filter method to create a new array called affordableProducts containing only products priced below $200

Calculate the total cost of all items in the affordableProducts array using the reduce method.
*/
let productPrices = [100, 200, 300, 400, 500];
let discountedPrices = productPrices.map((price) => price * 0.9);
console.log("Discounted Prices: " + discountedPrices);
let affordableProducts = discountedPrices.filter((price) => price < 200);
console.log("Affordable Products: " + affordableProducts);
let totalCost = affordableProducts.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log("Total Cost: " + totalCost);
