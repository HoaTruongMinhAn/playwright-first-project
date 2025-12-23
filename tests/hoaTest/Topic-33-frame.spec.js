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

  // Work with child frame
  const frame = page.frameLocator("//iframe[@id='courses-iframe']");
  // page.frame();
  // page.frames();

  const allAccessMenu = frame.locator(
    "//nav//a[@href='/all-access-subscription']"
  );
  await allAccessMenu.click();

  const allPlansLabel = frame.locator("//span[text()='Premium Access Plans']");
  await expect(allPlansLabel).toBeVisible();

  const subcriberLabel = frame.locator(
    "//div[text()='Happy Subscribers']/preceding-sibling::div[@class='text-2xl font-bold text-foreground']"
  );
  const totalSubcriber = await subcriberLabel.textContent();
  console.log("Total subcribers: " + totalSubcriber);

  // Work with main page
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
