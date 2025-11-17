const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("UI control - Static dropdown", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const materialLink = page.locator("//a[contains(@href,'documents-request')]");
  await expect(materialLink).toHaveAttribute("href");
  await expect(materialLink).toHaveAttribute("class", "blinkingText");
});
