/**
 * API utility class for handling API requests
 * @class ApiUtils
 */
class ApiUtils {
  /**
   * @param {import('@playwright/test').APIRequestContext} apiContext - Playwright API request context
   */
  constructor(apiContext) {
    this.apiContext = apiContext;
  }

  commonHeaders = { Authorization: null, "Content-Type": "application/json" };

  /**
   * Login and get user credentials
   * @param {string} username - User email
   * @param {string} password - User password
   * @returns {Promise<{userId: string, token: string}>}
   */
  async login(username, password) {
    const loginPayload = {
      userEmail: username,
      userPassword: password,
    };

    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: loginPayload,
      }
    );

    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    this.commonHeaders.Authorization = token;
    return {
      userId: loginResponseJson.userId,
      token: token,
    };
  }

  /**
   * Get all products
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async getAllProducts() {
    const allProductPayload = {
      productName: "",
      minPrice: null,
      maxPrice: null,
      productCategory: [],
      productSubCategory: [],
      productFor: [],
    };
    const allProductResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/product/get-all-products",
      { data: allProductPayload, headers: this.commonHeaders }
    );
    return allProductResponse;
  }

  /**
   * Add product to cart
   * @param {string} userId - User ID
   * @param {string} productId - Product ID
   * @param {string} productName - Product name
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async addToCart(userId, productId, productName) {
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
    const addToCartResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/user/add-to-cart",
      { data: addToCartPayload, headers: this.commonHeaders }
    );
    return addToCartResponse;
  }

  /**
   * Create an order
   * @param {string} productId - Product ID
   * @returns {Promise<import('@playwright/test').APIResponse>}
   */
  async createOrder(productId) {
    const createOrderPayload = {
      orders: [
        {
          country: "Vietnam",
          productOrderedId: productId,
        },
      ],
    };
    const createOrderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      { data: createOrderPayload, headers: this.commonHeaders }
    );
    return createOrderResponse;
  }
}

module.exports = { ApiUtils };
