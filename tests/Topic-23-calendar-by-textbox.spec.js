const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Playwright calendar", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers", {
    timeout: 60000,
  });

  const day = "31";
  const month = "03";
  const year = "2000";

  const monthTextbox = page.locator("//input[@name='month']");
  await monthTextbox.fill(month);

  const dayTextbox = page.locator("//input[@name='day']");
  await dayTextbox.fill(day);

  const yearTextbox = page.locator("//input[@name='year']");
  await yearTextbox.fill(year);
});
