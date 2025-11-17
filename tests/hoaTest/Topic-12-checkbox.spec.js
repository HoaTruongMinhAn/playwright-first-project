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
  const termsCheckbox = page.locator("//input[@id='terms']");
  await expect(termsCheckbox).not.toBeChecked();
  await page.pause();

  await termsCheckbox.check();
  await expect(termsCheckbox).toBeChecked();
  expect(await termsCheckbox.isChecked()).toBeTruthy();
  await page.pause();

  await termsCheckbox.uncheck();
  await expect(termsCheckbox).not.toBeChecked();
  expect(await termsCheckbox.isChecked()).toBeFalsy();
  await page.pause();
});
