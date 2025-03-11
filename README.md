# FlashCards (NestJS + Angular)

## Pre-requisites

- Node.js 20+
- npm 10+
- sqlite3
- (Optionally) SQLite Viewer [Extension](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)

## Getting Started

1. Clone the repository
2. Install dependencies:
   - `cd flashcards-ui && npm install`
   - `cd flashcards-api && npm install`

- `cd .. & npm install`

6. Start the development server: `npm run dev`

## Local Development

You can run the following commands:

1. Start both API and UI: `npm run dev`
2. Start only the API: `npm run start:api` (runs on localhost:3000 by default)
3. Start only the UI: `npm run start:ui` (runs on localhost:4200 by default)

## Project Structure

- `flashcards-api/`: NestJS backend application
- `flashcards-ui/`: Angular frontend application

## Testing

Run the app in testing mode:

```bash
npm run dev:test
```

Run end-to-end tests with Playwright in another terminal:

```bash
npx playwright install
npm run test
```

## Technologies Used

- **Backend**: NestJS, Sequelize, SQLite
- **Frontend**: Angular, Angular Material
- **Testing**: Playwright
