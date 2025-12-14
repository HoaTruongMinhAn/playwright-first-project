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

  // Add to cart
  // await page.waitForTimeout(3000);

  const productName = "ZARA COAT 3";
  const item = page.locator(
    `//b[text()='${productName}']/parent::h5/following-sibling::button[i[@class='fa fa-shopping-cart']]`
  );
  await expect(item).toBeVisible();
  await expect(item).toBeEnabled();
  await item.click();
  // await page.waitForTimeout(3000);

  const subItem = item.locator("//div");

  // Open Cart page
  const cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
  await cartButton.click();

  const myCartTitle = page.locator("//div[@class='heading cf']/h1");
  console.log("My Cart title is: " + (await myCartTitle.textContent()));

  // Method 1: get list items
  const itemTitles = page.locator("//div[@class='cart']/ul//h3");
  await itemTitles.last().waitFor();
  console.log("Item titles are: " + (await itemTitles.allTextContents()));
  const firstItemTitle = await itemTitles.first();
  const firstItemTitleText = await firstItemTitle.textContent();
  await expect(firstItemTitleText).toContain(productName);

  // Method 2: get single item
  const expectedItem = page.locator(
    `//div[@class='cart']/ul//h3[text()='${productName}']`
  );
  await expect(expectedItem).toBeVisible();
  await expect(expectedItem).toBeEnabled();

  // Method 3: get single item by locator and text
  const expectedItem3 = page.getByText(productName);
  await expect(expectedItem3).toBeVisible();
  await expect(expectedItem3).toBeEnabled();
});
