# Runs the end-to-end tests.

npx playwright test

# Run with visible ui

npx playwright test --headed

# Starts the interactive UI mode.

npx playwright test --ui

# Runs the tests only on Desktop Chrome.

npx playwright test --project=chromium

# Runs the tests in a specific file.

npx playwright test example

# Runs the tests in debug mode.

npx playwright test --debug

# Auto generate tests with Codegen.

npx playwright codegen

# We suggest that you begin by typing:

npx playwright test

And check out the following files:

- ./tests/example.spec.js - Example end-to-end test
- ./playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨
