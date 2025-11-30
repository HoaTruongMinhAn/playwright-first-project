import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByRole("textbox", { name: "Username:" }).click();
  await page
    .getByRole("textbox", { name: "Username:" })
    .fill("rahulshettyacademy");
  await page.getByRole("textbox", { name: "Password:" }).click();
  await page.getByRole("textbox", { name: "Password:" }).fill("learning");
  await page.locator("span").nth(4).click();
  await page.getByRole("button", { name: "Okay" }).click();
  await page
    .getByRole("checkbox", { name: "I Agree to the terms and" })
    .check();
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "iphone X" }).click();
  await page.goto("https://rahulshettyacademy.com/angularpractice/shop");
  await page.getByRole("link", { name: "iphone X" }).click();
});
