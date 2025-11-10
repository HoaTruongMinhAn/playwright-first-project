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
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const usernameTextbox = page.locator("//input[@id='username']");
  const passwordTextbox = page.locator("//input[@id='password']");
  const signInButton = page.locator("//input[@id='signInBtn']");
  await usernameTextbox.fill("rahulshettyacademy");
  await passwordTextbox.fill("learning");
  await signInButton.click();

  await expect(
    page.locator("//div[@class='container']/a[@class='navbar-brand']")
  ).toHaveText("ProtoCommerce Home");

  // Get 1st product title by locator
  const productTitle = await page.locator("//app-card[1]//h4");
  await expect(productTitle).toHaveText("iphone X");
  console.log("Product title is: " + (await productTitle.textContent()));

  // Get 1st product title by function
  const productTitle3 = await page.locator("//app-card[2]//h4");
  await expect(productTitle3).toHaveText("Samsung Note 8");
  console.log("Product title is: " + (await productTitle3.textContent()));

  const productTitle4 = await page.locator("//app-card[4]//h4");
  await expect(productTitle4).toHaveText("Blackberry");
  console.log("Product title is: " + (await productTitle4.textContent()));
});
