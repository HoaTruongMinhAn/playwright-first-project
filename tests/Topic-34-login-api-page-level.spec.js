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
  const page = await context.newPage();

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

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
});
