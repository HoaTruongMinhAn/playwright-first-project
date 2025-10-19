const { test } = require("@playwright/test");
const { availableMemory } = require("process");

// test("First Playwright test", async function () {});

test("Browser Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test.only("Page Playwright test", async ({ page }) => {
  await page.goto("https://www.demoblaze.com/");
});
