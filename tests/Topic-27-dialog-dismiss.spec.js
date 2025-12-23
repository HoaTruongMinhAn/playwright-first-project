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

  // Dismiss dialog
  page.on("dialog", (dialog) => dialog.dismiss());

  const name = "PlayWright newbie";
  const nameTextbox = page.locator("//input[@id='name']");
  await nameTextbox.fill(name);

  const confirmButton = page.locator("//input[@id='confirmbtn']");
  await confirmButton.click();
  await page.waitForTimeout(1000);
});
