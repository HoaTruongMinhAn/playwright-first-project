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

  // Go to top
  const mouseHoverButton = page.locator("//button[@id='mousehover']");
  await mouseHoverButton.focus();
  await page.waitForTimeout(2000);

  await page.pause();
  await mouseHoverButton.hover();
  await page.waitForTimeout(2000);

  const topMenu = page.locator(
    "//div[@class='mouse-hover-content']/a[text()='Top']"
  );
  await topMenu.click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/AutomationPractice/#top"
  );

  // Reload
  await mouseHoverButton.hover();
  await page.waitForTimeout(2000);

  const reloadMenu = page.locator(
    "//div[@class='mouse-hover-content']/a[text()='Reload']"
  );
  await reloadMenu.click();
  await page.waitForTimeout(2000);
  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/AutomationPractice/"
  );
});
