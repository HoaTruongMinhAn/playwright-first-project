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

  const usernameTextbox = page.locator("input#username");
  const passwordTextbox = page.locator("input#password");
  const signInButton = page.locator("input#signInBtn");
  await usernameTextbox.fill("rahulshettyacademy");
  await passwordTextbox.fill("learning");
  await signInButton.click();

  await expect(
    page.locator("div[class='container']>a[class='navbar-brand']")
  ).toHaveText("ProtoCommerce Home");

  // Get 1st product title by locator
  const productTitle = await page.locator("app-card:nth-of-type(1) h4");
  await expect(productTitle).toHaveText("iphone X");
  console.log("Product title is: " + (await productTitle.textContent()));

  // Get 1st product title by function
  const productTitle2 = await page.locator("app-card h4").first();
  // const productTitle2 = await page.locator("app-card h4").nth(0);
  await expect(productTitle2).toHaveText("iphone X");
  console.log("Product title is: " + (await productTitle2.textContent()));

  const productTitle3 = await page.locator("app-card h4").nth(1);
  await expect(productTitle3).toHaveText("Samsung Note 8");
  console.log("Product title is: " + (await productTitle3.textContent()));

  const productTitle4 = await page.locator("app-card h4").last();
  await expect(productTitle4).toHaveText("Blackberry");
  console.log("Product title is: " + (await productTitle4.textContent()));
});
