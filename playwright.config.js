// @ts-check
import { defineConfig, devices } from "@playwright/test";

const config = {
  testDir: "./tests/hoaTest",
  timeout: 60 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
};

module.exports = config;
