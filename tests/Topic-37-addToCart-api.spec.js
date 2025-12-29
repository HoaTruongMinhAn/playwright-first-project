const { test, expect, request } = require("@playwright/test");
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
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  await expect(loginResponse).toBeOK();

  const loginResponseJson = await loginResponse.json();
  userId = loginResponseJson.userId;
  token = loginResponseJson.token;
});

test("Web api", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();

  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // get-all-products api
  const apiContext = await request.newContext();
  const allProductPayload = {
    productName: "",
    minPrice: null,
    maxPrice: null,
    productCategory: [],
    productSubCategory: [],
    productFor: [],
  };
  const header = { Authorization: token };
  const allProductResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/product/get-all-products",
    { data: allProductPayload, headers: header }
  );
  await expect(allProductResponse).toBeOK();

  // Get product Id
  const allProductResponseJson = await allProductResponse.json();
  const products = await allProductResponseJson.data;
  const productName = "ZARA COAT 3";
  const targetProduct = products.find(
    (product) => product.productName === productName
  );
  await expect(targetProduct).toBeTruthy();
  const productId = targetProduct._id;
  console.log("productId: " + productId);

  // addToCart api
  const addToCartPayload = {
    _id: userId,
    product: {
      _id: productId,
      productName: productName,
      productCategory: "electronics",
      productSubCategory: "mobiles",
      productPrice: 11500,
      productDescription: "Apple phone",
      productImage:
        "https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg",
      productRating: "0",
      productTotalOrders: "0",
      productStatus: true,
      productFor: "women",
      productAddedBy: "admin",
      __v: 0,
    },
  };
  const addToCartResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/user/add-to-cart",
    { data: addToCartPayload, headers: header }
  );
  await expect(addToCartResponse).toBeOK();

  const addToCartResponseJson = await addToCartResponse.json();
  const message = await addToCartResponseJson.message;
  await expect(message).toBe("Product Added To Cart");
});
