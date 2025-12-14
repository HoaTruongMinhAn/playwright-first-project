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
  const username = "hoaTest1@test.aaa.bbb.com";
  const password = "Password@1";
  await usernameTextbox.fill(username);
  await passwordTextbox.fill(password);
  await logInButton.click();

  const productTitles = await page.locator("//div[@class='card-body']//b");
  await productTitles.last().waitFor();
  console.log("productTitles: " + productTitles);

  const titles = await productTitles.allTextContents();
  console.log("Product titles are: " + titles); // ZARA COAT 3,ADIDAS ORIGINAL,iphone 13 pro
  console.log("Product title 1: " + titles[0]); // ZARA COAT 3

  // Common string comparison functions in Playwright:
  await expect(titles[0]).toContain("ZARA COAT 3"); // Checks if string contains substring

  // Add to cart
  const productName = "ZARA COAT 3";
  const item = page.locator(
    `//b[text()='${productName}']/parent::h5/following-sibling::button[i[@class='fa fa-shopping-cart']]`
  );
  await expect(item).toBeVisible();
  await expect(item).toBeEnabled();
  await item.click();
  const subItem = item.locator("//div");

  // Open Cart page
  const cartButton = page.locator("//button[@routerlink='/dashboard/cart']");
  await cartButton.click();

  const expectedItem = page.locator(
    `//div[@class='cart']/ul//h3[text()='${productName}']`
  );
  await expect(expectedItem).toBeVisible();
  await expect(expectedItem).toBeEnabled();

  // Click Checkout button
  const checkOutButton = page.locator("//button[text()='Checkout']");
  await checkOutButton.click();

  // Fill the form
  const emailTextbox = page.locator(
    "//div[@class='details__user']//input[@type='text']"
  );
  const countryTextbox = page.locator(
    "//div[@class='details__user']//input[@data-np-autofill-field-type='country']"
  );
  const placeOrderContainer = page.locator(
    "//div[@class='details__user']//div[@class='form-group']"
  );
  const placeOrderButton = page.locator(
    "//div[@class='details__user']//a[@class='btnn action__submit ng-star-inserted']"
  );

  await emailTextbox.fill(username);

  const country = "Vietnam";
  await placeOrderContainer.click();
  // await placeOrderContainer.pressSequentially(country);
  await placeOrderContainer.pressSequentially(country, { delay: 200 });
  // await countryTextbox.click();
  // await countryTextbox.pressSequentially(country);

  const countryDropdown = page.locator(
    `//span[normalize-space()='${country}']`
  );
  await countryDropdown.click();

  // await countryTextbox.fill(country);
  await placeOrderButton.click();

  // Verify the order confirmation
  const thankYouMessage = page.locator("//h1");
  await expect(thankYouMessage).toHaveText("Thankyou for the order.");

  const orderIdLabel = page.locator("//label[@class='ng-star-inserted']");
  const orderIdText = await orderIdLabel.textContent();
  const orderId = orderIdText.trim().replace(/\|/g, "").trim();
  console.log("Order ID is: " + orderId);

  const productNameOnOrder = page.locator(
    "//td[contains(@class,'line-item product-info-column')][1]/div[@class='title']"
  );
  const productQualityOnOrder = page.locator(
    "//td[contains(@class,'line-item product-info-column')][1]/div[@class='sub']"
  );
  await expect(productNameOnOrder).toHaveText(productName);
  await expect(productQualityOnOrder).toHaveText("Qty: 1");
});
