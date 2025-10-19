// @ts-check
import { defineConfig, devices } from "@playwright/test";

const config = {
  testDir: "./tests",
  timeout: 10 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
  },
};

module.exports = config;
