const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Browser context Playwright test", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
    timeout: 60000,
  });

  const usernameTextbox = page.locator("//input[@id='userEmail']");
  const passwordTextbox = page.locator("//input[@id='userPassword']");
  const logInButton = page.locator("//input[@id='login']");
  await usernameTextbox.fill("hoaTest1@test.aaa.bbb.com");
  await passwordTextbox.fill("Password@1");
  await logInButton.click();

  const productTitles = await page.locator("//div[@class='card-body']//b");
  // await productTitles.first().waitFor();
  await productTitles.last().waitFor();
  console.log("productTitles: " + productTitles);

  const titles = await productTitles.allTextContents();
  console.log("Product titles are: " + titles); // ZARA COAT 3,ADIDAS ORIGINAL,iphone 13 pro
  console.log("Product title 1: " + titles[0]); // ZARA COAT 3

  // Common string comparison functions in Playwright:
  await expect(titles[0]).toContain("ZARA COAT 3"); // Checks if string contains substring
});
