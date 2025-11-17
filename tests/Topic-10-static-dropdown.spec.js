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
  await roleDroplist.selectOption({ value: "consult" });
  await expect(roleDroplist).toHaveValue("consult");
  await page.pause();

  await roleDroplist.selectOption({ label: "Teacher" });
  await expect(roleDroplist).toHaveValue("teach");
  await page.pause();

  await roleDroplist.selectOption({ index: 0 });
  await expect(roleDroplist).toHaveValue("stud");
  await page.pause();
});
