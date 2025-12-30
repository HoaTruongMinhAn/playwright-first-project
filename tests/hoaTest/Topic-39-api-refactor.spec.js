const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../utils/ApiUtils");

/** @type {ApiUtils} */
let apiUtils;
const username = "hoaTest1@test.aaa.bbb.com";
const password = "Password@1";
const loginPayload = {
  userEmail: username,
  userPassword: password,
};
let userId;
let token;

test.beforeAll(async () => {
  // login api
  const apiContext = await request.newContext();
  apiUtils = new ApiUtils(apiContext);
  const loginResult = await apiUtils.login(username, password);
  userId = loginResult.userId;
  token = loginResult.token;
});

test("Web api", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // get-all-products api
  const allProductResponse = await apiUtils.getAllProducts();
  await expect(allProductResponse).toBeOK();

  // Get product Id
  const allProductResponseJson = await allProductResponse.json();
  const products = await allProductResponseJson.data;
  const productName = "ZARA COAT 3";
  const targetProduct = products.find(
    (product) => product.productName === productName
  );
  await expect(targetProduct).toBeTruthy();
  const productId = targetProduct._id;
  console.log("productId: " + productId);

  // addToCart api
  const addToCartResponse = await apiUtils.addToCart(
    userId,
    productId,
    productName
  );
  await expect(addToCartResponse).toBeOK();

  const addToCartResponseJson = await addToCartResponse.json();
  const message = await addToCartResponseJson.message;
  await expect(message).toBe("Product Added To Cart");

  // createOrder api

  const createOrderResponse = await apiUtils.createOrder(productId);
  await expect(createOrderResponse).toBeOK();
  const createOrderResponseJson = await createOrderResponse.json();
  const orderId = createOrderResponseJson.orders;
  console.log("orderId: " + orderId);

  // Verify "Thankyou for the order" page
  await page.goto(
    `https://rahulshettyacademy.com/client/#/dashboard/thanks?prop=%5B%22${orderId}%22%5D`,
    {
      timeout: 60000,
    }
  );

  // Verify the order confirmation
  const thankYouMessage = page.locator("//h1");
  await expect(thankYouMessage).toHaveText("Thankyou for the order.");

  let orderIdLabel = page.locator(`//label[contains(text(),'${orderId}')]`);
  await expect(orderIdLabel).toBeVisible();

  const productNameOnOrder = page.locator(
    "//td[contains(@class,'line-item product-info-column')][1]/div[@class='title']"
  );
  const productQualityOnOrder = page.locator(
    "//td[contains(@class,'line-item product-info-column')][1]/div[@class='sub']"
  );
  await expect(productNameOnOrder).toHaveText(productName);
  await expect(productQualityOnOrder).toHaveText("Qty: 1");

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
