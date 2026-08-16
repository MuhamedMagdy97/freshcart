# FreshCart

A React storefront backed by the Route Academy ecommerce API.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer

## Setup

```bash
npm ci
npm start
```

The application uses `https://ecommerce.routemisr.com/api/v1` by default. To point it at a different compatible API, create a `.env.local` file:

```bash
REACT_APP_API_BASE_URL=https://example.com/api/v1
```

Never commit real credentials or private endpoints.

## Quality checks

```bash
npm run test:ci
npm run build
npm audit --omit=dev --audit-level=high
```

## Deployment

`npm run deploy` publishes the production build to GitHub Pages. Client-side routes are supported by the included `public/404.html` redirect and the restore script in `public/index.html`.