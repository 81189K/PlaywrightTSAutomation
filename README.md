# Playwright TypeScript Automation Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript for automated web application testing. This framework provides a robust foundation for testing web applications with support for multiple browsers, visual regression testing, API testing, and advanced test data management.

## 🚀 Features

- **Page Object Model (POM)**: Clean, maintainable test architecture with reusable page objects
- **Multi-Browser Support**: Test across Chromium, Firefox, and WebKit browsers
- **Visual Regression Testing**: Screenshot comparison and visual validation capabilities
- **API Testing**: Comprehensive API test coverage with mocking support
- **Test Data Management**: Support for CSV and JSON test data with automatic conversion utilities
- **Encryption Utilities**: Secure credential management with encryption/decryption support
- **Comprehensive Logging**: Winston-based logging with timezone support and log rotation
- **Test Fixtures**: Reusable test fixtures for common setup scenarios
- **Faker Integration**: Dynamic test data generation using Faker.js
- **CI/CD Ready**: GitHub Actions workflow for automated testing
- **Screenshot Capture**: Automatic screenshot capture on test failures and retries
- **Parallel Execution**: Configurable parallel test execution for faster test runs

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18 or higher (LTS version recommended)
- **npm**: v9 or higher (comes with Node.js)
- **Git**: For cloning the repository

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PlaywrightTSAutomation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in `src/config/` directory with the following variables:
   ```env
   username=your_username
   password=your_password
   SALT=your_encryption_salt
   NODE_ENV=development
   ```
   
   For different environments, create environment-specific files:
   - `src/config/.env.development`
   - `src/config/.env.production`
   - `src/config/.env.staging`

## 🎯 Getting Started

### Running Tests

**Run all tests:**
```bash
npx playwright test
```

**Run tests in a specific file:**
```bash
npx playwright test src/tests/loginTest.spec.ts
```

**Run tests in headed mode (see browser):**
```bash
npx playwright test --headed
```

**Run tests in a specific browser:**
```bash
npx playwright test --project=chromium
```

**Run tests in debug mode:**
```bash
npx playwright test --debug
```

**Run tests with UI mode:**
```bash
npx playwright test --ui
```

### Viewing Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

### Code Quality

**Run ESLint:**
```bash
npm run lint
```

**Fix ESLint issues automatically:**
```bash
npm run lint-fix
```

## 📁 Project Structure

```
PlaywrightTSAutomation/
├── src/
│   ├── config/              # Configuration files
│   │   ├── .env            # Environment variables
│   │   └── loginStorageState.json
│   ├── fixtures/           # Playwright fixtures
│   │   └── loginFixture.ts
│   ├── pages/              # Page Object Model classes
│   │   ├── DashboardPage.ts
│   │   ├── LoginPage.ts
│   │   └── RecruitmentPage.ts
│   ├── tests/              # Test specifications
│   │   ├── apiMockTest.spec.ts
│   │   ├── apiTest.spec.ts
│   │   ├── fixtureTest.spec.ts
│   │   ├── loginStorageStateTest.spec.ts
│   │   ├── loginTest.spec.ts
│   │   ├── recruitmentTest.spec.ts
│   │   ├── serialTest.spec.ts
│   │   ├── testFaker.spec.ts
│   │   └── visualTest.spec.ts
│   ├── testdata/           # Test data files
│   │   ├── recruitments.csv
│   │   ├── recruitments.json
│   │   └── testData_en.json
│   ├── utils/              # Utility functions
│   │   ├── CryptojsUtil.ts
│   │   ├── CsvToJsonUtil.ts
│   │   ├── EncryptEnvFile.ts
│   │   ├── FakerDataUtil.ts
│   │   └── LoggerUtil.ts
│   └── logging/            # Log files
│       ├── test_run.log
│       └── test_error.log
├── screenshots/            # Test screenshots
├── test-results/          # Test execution results
├── playwright-report/      # HTML test reports
├── playwright.config.ts    # Playwright configuration
├── package.json           # Project dependencies
└── README.md              # This file
```

## 💡 Usage Examples

### Basic Login Test

```typescript
import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";

test('Valid Login Test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillUsername(process.env.username!);
  await loginPage.fillPassword(process.env.password!);
  await loginPage.clickLoginButton();
  
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.expectDashboardTitleToBeVisible();
});
```

### Using Test Fixtures

```typescript
import { test, expect } from "../fixtures/loginFixture";

test('Test with auto-login fixture', async ({ dashboardPage }) => {
  // dashboardPage is automatically available after login
  await dashboardPage.expectDashboardTitleToBeVisible();
});
```

### Data-Driven Testing with CSV

```typescript
import { convertCsvFileToJsonFile } from "../utils/CsvToJsonUtil";
import fs from 'fs';

// Convert CSV to JSON
convertCsvFileToJsonFile('recruitments.csv', 'recruitmentsCSVtoJSON.json');

// Use the JSON data in tests
const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));
data.forEach((item) => {
  test(`Test with ${item.firstname}`, async ({ page }) => {
    // Use item data in your test
  });
});
```

### Visual Regression Testing

```typescript
import { test, expect } from "@playwright/test";

test('Visual comparison test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveScreenshot({
    animations: 'disabled',
    fullPage: false
  });
});
```

## 🔧 Configuration

### Playwright Configuration

The main configuration is in `playwright.config.ts`. Key settings include:

- **Base URL**: Configured for OrangeHRM demo application
- **Retries**: 2 retries on failure
- **Screenshots**: Captured on failure
- **Trace**: Collected on first retry
- **Reporters**: HTML reporter enabled

### Environment Variables

The framework supports environment-specific configurations:

- `NODE_ENV`: Set to `development`, `staging`, or `production`
- `username`: Application username
- `password`: Application password
- `SALT`: Encryption salt for secure credential storage

## 🧪 Test Types

### 1. **Login Tests** (`loginTest.spec.ts`)
   - Valid login scenarios
   - Encrypted credential handling

### 2. **Recruitment Tests** (`recruitmentTest.spec.ts`)
   - Candidate management
   - Data-driven testing with CSV/JSON

### 3. **Visual Tests** (`visualTest.spec.ts`)
   - Screenshot comparison
   - UI element validation

### 4. **API Tests** (`apiTest.spec.ts`, `apiMockTest.spec.ts`)
   - REST API testing
   - API mocking capabilities

### 5. **Fixture Tests** (`fixtureTest.spec.ts`)
   - Reusable test setup
   - Shared authentication state

### 6. **Faker Tests** (`testFaker.spec.ts`)
   - Dynamic test data generation

## 📊 Logging

The framework uses Winston for comprehensive logging:

- **Console Logging**: Real-time test execution logs
- **File Logging**: Persistent logs in `src/logging/`
  - `test_run.log`: General test execution logs
  - `test_error.log`: Error-specific logs
- **Log Rotation**: Automatic log file rotation (5 files, configurable size)
- **Timezone Support**: Configurable timezone (default: Asia/Kolkata)

## 🔐 Security

- **Encryption Utilities**: Secure credential encryption using CryptoJS
- **Environment Variables**: Sensitive data stored in `.env` files (not committed)
- **Storage State**: Reusable authentication state for faster test execution

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint for code quality
- Write descriptive test names
- Add comments for complex logic
- Follow the Page Object Model pattern

## 📝 License

This project is licensed under the ISC License.

## 🆘 Getting Help

- **Documentation**: Check the [Playwright Documentation](https://playwright.dev/docs/intro)
- **Issues**: Open an issue on GitHub for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas


## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Winston Logging](https://github.com/winstonjs/winston)
- [Faker.js Documentation](https://fakerjs.dev)

---

**Happy Testing! 🎉**
