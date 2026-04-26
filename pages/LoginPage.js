class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameTextbox = page.locator("//input[@id='userEmail']");
    this.passwordTextbox = page.locator("//input[@id='userPassword']");
    this.logInButton = page.locator("//input[@id='login']");
  }
  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
      timeout: 60000,
    });
  }

  async login(username, password) {
    await this.usernameTextbox.fill(username);
    await this.passwordTextbox.fill(password);
    await this.logInButton.click();
  }
}

module.exports = { LoginPage };
