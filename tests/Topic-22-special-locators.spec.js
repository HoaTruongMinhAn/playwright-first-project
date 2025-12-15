const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Playwright special locators", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/angularpractice/", {
    timeout: 60000,
  });

  const checkMeCheckbox = await page.getByLabel(
    "Check me out if you Love IceCreams!"
  );
  await checkMeCheckbox.check();

  const genderDroplist = page.getByLabel("Gender");
  await genderDroplist.selectOption({ label: "Female" });

  const employedRadioButton = await page.getByLabel("Employed");
  await employedRadioButton.check();

  await page.pause();
});
