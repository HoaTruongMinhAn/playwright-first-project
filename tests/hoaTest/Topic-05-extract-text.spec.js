const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Browser context Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  console.log("Title is:", title);
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  // await page.waitForTimeout(2000);

  await page.locator("input#username").fill("admin");
  await page.locator("input#password").fill("password");
  await page.locator("input#signInBtn").click();
  // await page.waitForTimeout(3000);

  const messageElement = await page.locator("div[class*='alert-danger']");
  const errorMessage = await messageElement.textContent();
  console.log("Error message is: " + errorMessage);

  await expect(messageElement).toHaveText("Incorrect username/password.");
  await expect(messageElement).toContainText("Incorrect");
});
