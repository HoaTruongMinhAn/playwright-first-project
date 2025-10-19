const { test } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Browser Playwright test", async (browser) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Page Playwright test", async (page) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});
