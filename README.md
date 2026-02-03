# PW-API-Practice

Playwright API testing practice project. The current test intercepts the `api/tags` call and serves mocked data from `test-data/tags.json`, then verifies the Conduit UI loads correctly.

**Tech**
- Playwright Test
- TypeScript

**Project Structure**
- `tests/workingWithAPI.spec.ts` - API route mocking test
- `test-data/tags.json` - mocked tags payload
- `playwright.config.ts` - Playwright configuration

**Setup**
1. Install dependencies:
   ```powershell
   npm install
   ```

**Run Tests**
1. Run the API test (headed):
   ```powershell
   npm run test:api
   ```

**Notes**
- The test navigates to `https://conduit.bondaracademy.com/` and validates the navbar brand text.
