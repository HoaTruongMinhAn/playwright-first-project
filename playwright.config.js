// @ts-check
import { defineConfig, devices } from "@playwright/test";

const config = {
  testDir: "./tests/hoaTest",
  timeout: 10 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
  },
};

module.exports = config;
