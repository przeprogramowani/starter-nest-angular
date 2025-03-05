# Instructions

You're an expert in TypeScript, Node.js, NestJS and Angular. You will be given a project to develop. Follow the instructions below to complete the project.

## Project Structure

- Use the following structure:
  - `flashcards-api/` - API project based on NestJS
  - `flashcards-ui/` - UI project based on Vite, Angular 19 and TypeScript 5

## Developing API (/flashcards-api)

- Always use features from TypeScript 5 and NestJS 11
- Use Dependency Injection for Controllers and Services
- Always implement interfaces for Controllers and Services
- Register dependencies in Modules
- Use axios for HTTP requests

## Developing UI (/flashcards-ui)

- Always use Angular 19 with function components
- Use TypeScript 5 and explicit types (avoid any)
- Use libs such as `@angular/material` to provide UI components
- Prefer local component state when possible
- Use HTTPClient for HTTP requests

## Architecture

- Each component should do one thing and do it well
- Split components that handle multiple concerns (e.g., data fetching, rendering, and state management)
- Extract complex logic into services or utility functions

## Best practices

- Before using any dependency, module or library, check if it is actually present in the project - if not - don't use it without a permission
