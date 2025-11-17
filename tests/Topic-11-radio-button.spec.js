const { test } = require("@playwright/test");
const { expect } = require("@playwright/test");

// test("First Playwright test", async function () {});

test("UI control - Static dropdown", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const roleDroplist = page.locator("//form[@id='login-form']//select");
  await roleDroplist.selectOption({ label: "Teacher" });
  await expect(roleDroplist).toHaveValue("teach");

  const adminRadioButton = page.locator(
    "//input[@id='usertype' and @value='admin']"
  );
  const userRadioButton = page.locator(
    "//input[@id='usertype' and @value='user']"
  );
  await userRadioButton.click();
  await expect(adminRadioButton).not.toBeChecked();
  await expect(userRadioButton).toBeChecked();
  console.log(
    "adminRadioButton is checked: " + (await adminRadioButton.isChecked())
  );
  console.log(
    "userRadioButton is checked: " + (await userRadioButton.isChecked())
  );
  await page.pause();

  await page.locator("//button[@id='okayBtn']").click();

  await adminRadioButton.click();
  await expect(adminRadioButton).toBeChecked();
  await expect(userRadioButton).not.toBeChecked();
  console.log(
    "adminRadioButton is checked: " + (await adminRadioButton.isChecked())
  );
  // Result:
  // adminRadioButton is checked: false
  // userRadioButton is checked: true
  console.log(
    "userRadioButton is checked: " + (await userRadioButton.isChecked())
  );
  await page.pause();
});
