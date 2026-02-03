import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // use: {
  //   trace: 'on-first-retry',
  // },
   use: {
    launchOptions: {
      slowMo: 2000,
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

  ],

});
