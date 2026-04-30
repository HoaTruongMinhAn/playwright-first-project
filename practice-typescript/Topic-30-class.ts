import { type Locator, type Page } from "@playwright/test";

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

const person = new Person("John", 20);
console.log("Person: " + JSON.stringify(person)); // Person: {"name":"John","age":20}

class CartPage {
  page: Page;
  submitButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator("//button[text()='Submit']");
  }
}

export {};
