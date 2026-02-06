import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  use: {
    extraHTTPHeaders:{
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    }
  },
  projects: [
    { name: 'setup', testMatch: '.auth/auth.setup.ts' },
    {
      name: 'chromium',
      testMatch: 'tests/**/*.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['setup'],
    },
    // {
    //   name: 'firefox',
    //   testMatch: 'tests/**/*.spec.ts',
    //   use: { ...devices['Desktop Firefox'], storageState: '.auth/user.json' },
    //   dependencies: ['setup'],
    // },
    // {
    //   name: 'webkit',
    //   testMatch: 'tests/**/*.spec.ts',
    //   use: { ...devices['Desktop Safari'], storageState: '.auth/user.json' },
    //   dependencies: ['setup'],
    // },
  ],
});
