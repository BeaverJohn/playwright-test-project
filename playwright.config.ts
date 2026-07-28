import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // Console logger
    [
      'monocart-reporter',
      {
        name: 'Playwright Test Report',
        outputFile: './monocart-report/index.html',
        inline: true,
        
        // Optional reporter configuration options
        tags: {
          smoke: { style: 'background:#2196f3; color:#fff;' },
          critical: { style: 'background:#f44336; color:#fff;' },
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    testIdAttribute: 'data-qa',
    screenshot: 'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup - ui',
      testMatch: '**/ui/**/*.setup.ts',
      use: { 
        baseURL: process.env.UI_BASE_URL,
      }
    },

    {
      name: 'chromium - authenticated - ui',
      testMatch: '**/ui/**/*.auth.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json', baseURL: process.env.UI_BASE_URL, }, dependencies: ['setup - ui'],
    },

    {
      name: 'firefox - authenticated - ui',
      testMatch: '**/ui/**/*.auth.spec.ts',
      use: { ...devices['Desktop Firefox'], storageState: 'playwright/.auth/user.json', baseURL: process.env.UI_BASE_URL, }, dependencies: ['setup - ui'],
    },

    {
      name: 'chromium - guest - ui',
      testMatch: '**/ui/**/*.noauth.spec.ts',
      use: { ...devices['Desktop Chrome'], baseURL: process.env.UI_BASE_URL, }, 
    },

    {
      name: 'firefox - guest - ui',
      testMatch: '**/ui/**/*.noauth.spec.ts',
      use: { ...devices['Desktop Firefox'], baseURL: process.env.UI_BASE_URL, }, 
    },

    {
      name: 'setup - api',
      testMatch: '**/api/**/*.setup.ts',
      use: { 
        baseURL: process.env.API_BASE_URL,
      },
    },

    {
      name: 'api',
      testMatch: '**/api/**/*.api.spec.ts',
      use: { 
        baseURL: process.env.API_BASE_URL, 
        storageState: 'playwright/.auth/user_api.json',
        extraHTTPHeaders: {
          'Accept': 'application/json'
        }}, 
        dependencies: ['setup - api'],
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
