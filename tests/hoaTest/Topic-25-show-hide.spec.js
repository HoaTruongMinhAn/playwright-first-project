const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Playwright show/hide element", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/", {
    timeout: 60000,
  });

  const dynamicTextbox = page.locator("//input[@id='displayed-text']");
  await expect(dynamicTextbox).toBeVisible();

  const hideButton = page.locator(
    "//input[@type='submit' and @id='hide-textbox']"
  );
  await hideButton.click();
  await expect(dynamicTextbox).toBeHidden();

  const showButton = page.locator(
    "//input[@type='submit' and @id='show-textbox']"
  );
  await showButton.click();
  await expect(dynamicTextbox).toBeVisible();
});
