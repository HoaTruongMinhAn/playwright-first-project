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

test("Screenshot & visual comparison", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/", {
    timeout: 60000,
  });

  const hideButton = page.locator("//input[@id='hide-textbox']");
  const dynamicTextbox = page.locator("//input[@id='displayed-text']");

  // Element screenshot
  const elementScreenshot = await dynamicTextbox.screenshot({
    path: "screenshot-partial.png",
  });

  expect(elementScreenshot).toMatchSnapshot("screenshot-partial-baseline.png");
});
