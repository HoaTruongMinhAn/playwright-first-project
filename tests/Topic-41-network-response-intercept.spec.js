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
  console.log("userId: " + userId);
  console.log("token: " + token);
});

test("Network response intercept", async ({ browser }) => {
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
    (product) => product.productName === productName,
  );
  await expect(targetProduct).toBeTruthy();
  const productId = targetProduct._id;
  console.log("productId: " + productId);

  // addToCart api
  const addToCartResponse = await apiUtils.addToCart(
    userId,
    productId,
    productName,
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
    },
  );

  // Network intercept scenario
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      // Get real response
      const realResponse = await page.request.fetch(route.request());

      // Cook response
      let cookedResponse = { data: [], message: "No Orders" };

      // Respond with the cooked response
      route.fulfill({
        response: realResponse,
        body: JSON.stringify(cookedResponse),
      });
    },
  );

  // Trigger the real request
  await page.goto(
    `https://rahulshettyacademy.com/client/#/dashboard/myorders`,
    {
      timeout: 60000,
    },
  );

  // Wait for the response
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );

  const noOrdersMessage = page.locator("//div[contains(@class,'mt-4')]");
  await expect(noOrdersMessage).toHaveText(
    "You have No Orders to show at this time. Please Visit Back Us",
  );
});
