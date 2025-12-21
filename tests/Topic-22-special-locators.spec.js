const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("Playwright special locators", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/angularpractice/", {
    timeout: 60000,
  });

  const checkMeCheckbox = await page.getByLabel(
    "Check me out if you Love IceCreams!"
  );
  await checkMeCheckbox.check();

  const genderDroplist = page.getByLabel("Gender");
  await genderDroplist.selectOption({ label: "Female" });

  const employedRadioButton = await page.getByLabel("Employed");
  await employedRadioButton.check();

  // const emailTextbox = await page.getByAltText("Email");
  // await emailTextbox.fill("justARandomEmail@aaa.com");

  const passwordTextbox = await page.getByPlaceholder("Password");
  await passwordTextbox.fill("justARandomString");

  const submitButton = await page.getByRole("button", { name: "Submit" });
  await submitButton.click();

  const successMessage = await page.getByText(
    "Success! The Form has been submitted successfully!."
  );
  await expect(successMessage).toBeVisible();

  const shopMenu = await page.getByRole("link", { name: "Shop" });
  await shopMenu.click();

  const nokiaAddButton = await page
    .locator("app-card")
    .filter({ has: page.getByRole("heading", { name: "Nokia Edge" }) })
    .getByRole("button", { name: "Add" });
  await expect(nokiaAddButton).toBeVisible();
  await nokiaAddButton.click();

  await page.pause();
});
