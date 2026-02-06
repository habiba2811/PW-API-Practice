# PW-API-Practice

![API](https://img.shields.io/badge/API-Testing-9cf)
![Playwright](https://img.shields.io/badge/Playwright-Testing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-green)

Playwright API testing practice project. The suite uses a setup project to authenticate via the Conduit API, persists the token to `storageState`, injects it into requests via `Authorization` headers, intercepts the `api/tags` call with mocked data from `test-data/tags.json`, and exercises UI + API workflows in the Conduit app.

**Tech**
- Playwright Test
- TypeScript

**Project Structure**
- `tests/workingWithAPI.spec.ts` - UI + API tests (route mocking, article CRUD)
- `test-data/tags.json` - mocked tags payload
- `.auth/auth.setup.ts` - API login and storage state generation
- `.auth/user.json` - saved storage state (jwt token)
- `playwright.config.ts` - Playwright configuration

**Setup**
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Test auth is handled by Playwright's `setup` project. It logs in via the API and writes the jwt to `.auth/user.json`.

**Run Tests**
1. Run the suite:
   ```powershell
   npm run test:api
   ```

**Notes**
- The `setup` project logs in via the API, writes `.auth/user.json`, and sets `ACCESS_TOKEN` for `extraHTTPHeaders`.
- The suite mocks `*/**/api/tags` and uses the stored auth state.
- Tests include:
  - Mocking the articles feed and asserting the UI renders the mocked title/description.
  - Creating an article via API, deleting it via UI, and validating it is removed.
  - Creating an article via UI, capturing the slug from the network response, and deleting it via API.
