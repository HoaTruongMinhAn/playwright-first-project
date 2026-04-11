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

test("Assignment 2", async ({ browser }) => {});
