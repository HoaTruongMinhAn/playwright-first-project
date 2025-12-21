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

  const calendarToogle = page.locator(
    "//button[contains(@class,'calendar-button')]"
  );
  await calendarToogle.click();

  /*
  Pause here because I think we should not handle calendar by UI. We should input the textbox
  Udemy lecture:
  https://cbtwapac.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/42325460#overview
  https://cbtwapac.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/42325472#overview
  https://cbtwapac.udemy.com/course/playwright-tutorials-automation-testing/learn/lecture/42325558#overview
  
  */
});
