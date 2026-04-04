# Gemini Image Editing API

A Node.js/Express/TypeScript REST API that uses Google Gemini 2.5 Flash Image to edit images via natural language prompts.

## Architecture

- **Runtime**: Node.js 20
- **Language**: TypeScript (compiled via esbuild to `dist/`)
- **Framework**: Express 5
- **AI**: Google Gemini 2.5 Flash Image via Replit AI Integrations (no separate API key needed)
- **Build**: esbuild (bundles everything to `dist/index.mjs`)
- **Logging**: Pino with pino-pretty in dev

## Project Structure

```
src/
  index.ts          - Server entry point (reads PORT env var)
  app.ts            - Express app setup
  lib/logger.ts     - Pino logger config
  routes/
    index.ts        - Router aggregator
    docs.ts         - GET /api/ - Interactive API documentation page
    health.ts       - GET /api/healthz - Health check
    nanobanana.ts   - GET /api/nanobanana - Image editing endpoint

lib/
  api-zod/          - @workspace/api-zod - Zod schemas (HealthCheckResponse)
  db/               - @workspace/db - Database stub
  integrations-gemini-ai/ - @workspace/integrations-gemini-ai - Gemini AI client
```

## Key Endpoints

- `GET /` → redirects to `/api/`
- `GET /api/` → Interactive documentation page with live tester
- `GET /api/healthz` → `{ "status": "ok" }`
- `GET /api/nanobanana?prompt=...&image_url=...` → Returns edited image binary (PNG/JPEG)

## Environment Variables

- `PORT` - Server port (set to 5000)
- `AI_INTEGRATIONS_GEMINI_BASE_URL` - Auto-set by Replit AI Integrations
- `AI_INTEGRATIONS_GEMINI_API_KEY` - Auto-set by Replit AI Integrations

## Development

The workflow runs:
```
PORT=5000 NODE_ENV=development node --enable-source-maps ./dist/index.mjs
```

To rebuild after code changes:
```bash
node ./build.mjs
```

## Notes

- The project was originally part of a monorepo. Local stubs for workspace packages are in `lib/`
- The `build.mjs` uses a `workspaceAliasPlugin` to resolve `@workspace/*` imports from local `lib/` dirs
- Deployment uses autoscale with build step: `pnpm install && node ./build.mjs`
