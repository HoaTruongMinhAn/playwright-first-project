const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Child window handling", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const materialLink = page.locator("//a[contains(@href,'documents-request')]");

  const [documentRequestPage, _] = await Promise.all([
    context.waitForEvent("page"),
    materialLink.click(),
  ]);

  // const documentRequestPage = await documentRequestPagePromise;
  const h1Label = documentRequestPage.locator("//h1");
  await expect(h1Label).toHaveText("Documents request");
  await documentRequestPage.waitForTimeout(3000);

  // Get the email
  const emailLabel = documentRequestPage.locator(
    "//p[@class='im-para red']//a"
  );
  const email = await emailLabel.textContent();
  const domain = email.split("@")[1];
  const domainName = domain.split(".")[0];
  console.log("Email is: " + email);
  console.log("Domain is: " + domain);
  console.log("Domain name is: " + domainName);

  // Enter email into main page
  await page.bringToFront();
  const usernameTextbox = page.locator("input#username");
  const passwordTextbox = page.locator("input#password");
  const signInButton = page.locator("input#signInBtn");
  await usernameTextbox.fill(domainName);
  await passwordTextbox.fill("learning");
  await signInButton.click();

  await expect(
    page.locator("//div[@class='container']/a[@class='navbar-brand']")
  ).toHaveText("ProtoCommerce Home");
  await page.waitForTimeout(3000);
});
