# Run modes

#### Run the end-to-end tests

```bash
npx playwright test
```

#### Run with visible ui

```bash
npx playwright test --headed
```

#### Starts the interactive UI mode.

```bash
npx playwright test --ui
```

#### Runs the tests only on Desktop Chrome.

```bash
npx playwright test --project=chromium
```

#### Runs the tests in a specific file.

```bash
npx playwright test example
```

#### Runs the tests in debug mode.

```bash
npx playwright test --debug
```

#### Auto generate tests with Codegen.

```bash
npx playwright codegen
```

#### Run a specific test

```bash
npx playwright test Topic-08-wait-new-page.spec.js
```

#### We suggest that you begin by typing:

```bash
npx playwright test
```

And check out the following files:

- ./tests/example.spec.js - Example end-to-end test
- ./playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

#### To open last HTML report run:

```bash
npx playwright show-report
```
