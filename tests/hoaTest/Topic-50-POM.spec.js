const { test } = require("@playwright/test");
const { LoginPage } = require("../../pages/LoginPage");

test("Browser context Playwright test", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();

  const username = "hoaTest1@test.aaa.bbb.com";
  const password = "Password@1";

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
});
