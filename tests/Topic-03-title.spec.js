const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Browser Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const title = await page.title();
  console.log("Title is:", title);
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await page.waitForTimeout(2000);
});

test("Page Playwright test", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
  const title = await page.title();
  console.log("Title is:", title);
  await expect(page).toHaveTitle("STORE");
  await page.waitForTimeout(2000);
});
