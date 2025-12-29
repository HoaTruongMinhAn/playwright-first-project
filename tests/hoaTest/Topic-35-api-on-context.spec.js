const { test, expect, request } = require("@playwright/test");
const username = "hoaTest1@test.aaa.bbb.com";
const password = "Password@1";
const loginPayload = {
  userEmail: username,
  userPassword: password,
};
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  await expect(loginResponse).toBeOK();

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log("Token before test: " + token);
});

test("Web api", async ({ browser }) => {
  console.log("Token in test: " + token);

  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);

  // REQUIRED: Inject token into browser's localStorage before any page loads
  // Using context.addInitScript (better than page.addInitScript) - applies to all pages in context
  await context.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/client", {
    timeout: 60000,
  });

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

  // Verify email label and textbox
  const emailLabel = page.locator("//div[contains(@class,'user__name')]/label");
  const placeOrderEmailTextbox = page.locator(
    "//div[contains(@class,'user__name')]/input"
  );

  await expect(emailLabel).toHaveText(username);
  await expect(placeOrderEmailTextbox).toHaveValue(username);

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

  let orderIdLabel = page.locator("//label[@class='ng-star-inserted']");
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

  // Go to Orders page
  const ordersMenu = page.locator(
    "//button[@routerlink='/dashboard/myorders']"
  );
  await ordersMenu.click();

  // Verify the new order exists
  const newOrderCell = page.locator(`//th[text()='${orderId}']`);
  await expect(newOrderCell).toBeVisible();

  // View the new order
  const viewButton = page.locator(
    `//th[text()='${orderId}']/following-sibling::td/button[text()='View']`
  );
  await viewButton.click();

  // Verify the new order id opened for review
  const orderSummaryLabel = page.locator("//div[@class='email-title']");
  await expect(orderSummaryLabel).toBeVisible();

  orderIdLabel = page.locator(
    "//small[text()='Order Id']/following-sibling::div"
  );
  await expect(orderIdLabel).toHaveText(orderId);
});
