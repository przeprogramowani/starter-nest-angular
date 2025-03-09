# Instructions

You're an expert in TypeScript, Node.js, NestJS and Angular. You will be given a project to develop. Follow the instructions below to complete the project.

## Project Structure

- Use the following structure:
  - `flashcards-api/` - API project based on NestJS
  - `flashcards-ui/` - UI project based on Vite, Angular 19 and TypeScript 5
  - `tests/` - E2E tests using Playwright

## Developing API (/flashcards-api)

- Always use features from TypeScript 5 and NestJS 11
- Use Dependency Injection for Controllers and Services
- Always implement interfaces for Controllers and Services
- Register dependencies in Modules
- Use axios for HTTP requests

## Developing UI (/flashcards-ui)

- Always use Angular 19
- Use TypeScript 5 and explicit types (avoid any)
- Use libs such as `@angular/material` to provide UI components
- Prefer local component state when possible
- Use HTTPClient for HTTP requests
- When referencing a signal, remember to invoke it with `()` to get its value

# Rules for Writing E2E Tests with Playwright

## Core Selector Priority Rules

1. **Always prefer role-based selectors**

   - Use `getByRole` whenever possible
   - Elements with semantic meaning are easier to identify and more stable

2. **Use text-based selectors when roles aren't specific enough**

   - `getByText` connects with what users actually see
   - Text selectors are user-centric and match how humans identify elements

3. **Use `data-testid` as a fallback only when text and role selectors won't work**

   - For elements without visible text or semantic roles
   - Add `data-testid` attributes to elements that need testing but lack other identifiers

4. **Avoid CSS selectors entirely**
   - They're brittle and break when styling changes
   - They create coupling between tests and implementation details

## Examples of Good Selector Usage

```typescript
// ✅ GOOD - Using role selectors
await page.getByRole("button", {name: "Sign in"}).click();
await page.getByRole("heading", {name: "Dashboard"}).isVisible();

// ✅ GOOD - Using text selectors
await page.getByText("Forgot your password?").click();
await expect(page.getByText("Password reset email sent")).toBeVisible();

// ✅ GOOD - Using label-based selectors for form fields
await page.getByLabel("Email").fill("test@example.com");
await page.getByLabel("Password").fill("securepassword");

// ✅ GOOD - Using testid as fallback when necessary
await expect(page.getByTestId("loading-spinner")).not.toBeVisible();

// ❌ BAD - Using CSS selectors
await page.locator(".login-button").click();
await page.locator("div.card h2").isVisible();
await page.locator("#username-field").fill("admin");
```

## Why These Rules Matter

1. **Resilience to changes**

   - UI styling and structure often change, but roles and text rarely do
   - Tests break less often when using role and text selectors

2. **Readability**

   - Tests are easier to understand when selectors match what users see and interact with
   - New team members can understand tests without knowing CSS class naming conventions

3. **Accessibility alignment**
   - Role-based selectors encourage accessible UI development
   - If an element can't be selected by role, it might indicate an accessibility issue

## Common Mistakes to Avoid

1. Using complex CSS paths: `.container > div > ul > li:nth-child(3) > button`
2. Using technical IDs or classes that users don't see: `#usr-lgn-btn-234`
3. Using indexes instead of identifiable content: `page.locator("button").nth(4)`
4. Using selectors tied to specific frameworks like `.MuiButton-root` or `.ant-select`

Remember: Good selectors should identify elements the same way a human user would - by what they can see and the element's purpose, not by how it's implemented in the code.

## Architecture

- Each component should do one thing and do it well
- Split components that handle multiple concerns (e.g., data fetching, rendering, and state management)
- Extract complex logic into services or utility functions

## Best practices

- Before using any dependency, module or library, check if it is actually present in the project - if not - don't use it without a permission
