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

  const productTitles = await page.locator("//app-card//h4");
  console.log("productTitles: " + productTitles); //locator('//app-card//h4')

  const titles = await productTitles.allTextContents();
  console.log("Product titles are: " + titles); //["iphone X", "Samsung Note 8", "Nokia Edge", "Blackberry"]
  console.log("Product title 1: " + titles[0]); //iphone X
  console.log("Product title 2: " + titles[1]); //Samsung Note 8
  console.log("Product title 3: " + titles[2]); //Nokia Edge
  console.log("Product title 4: " + titles[3]); //Blackberry

  await expect(productTitles).toHaveCount(4);
  await expect(titles[0]).toContain("iphone X");
  await expect(titles[1]).toContain("Samsung Note 8 XXX");
  await expect(titles[2]).toContain("Nokia Edge");
  await expect(titles[3]).toContain("Blackberry");

  //Wrong
  // console.log("Product titles are: " + (await productTitles.allTextContents()));
  // console.log("Product title 1: " + (await productTitles.allTextContents()[0]));
  // console.log("Product title 2: " + (await productTitles.allTextContents()[1]));
  // console.log("Product title 3: " + (await productTitles.allTextContents()[2]));
  // console.log("Product title 4: " + (await productTitles.allTextContents()[3]));
});
