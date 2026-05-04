# CAT 2026 Preparation Tracker

Production-ready offline CAT prep tracker built with Next.js 14 App Router + TypeScript + sql.js.

## Stack
- Next.js 14 (`output: export`)
- TypeScript (strict)
- Tailwind CSS + reusable UI components
- sql.js (SQLite in browser, persisted to `localStorage`)
- Recharts, Lucide, Framer Motion, date-fns

## Run locally
```bash
npm install
npm run dev
```

## Build / Export / Deploy
```bash
npm run build
npm run export
npm run deploy
```

`npm run export` builds static files and copies `out/index.html` to `out/404.html` for GitHub Pages fallback routing.

## GitHub Pages config
1. Update `repoName` in `next.config.ts` if your repo name differs.
2. Push to GitHub.
3. Run `npm run deploy`.
4. In GitHub repo settings, enable Pages from `gh-pages` branch.

## Data model
- Topics, mocks, error log, settings are stored in SQLite tables.
- DB is persisted as Base64 blob in `localStorage` key: `cat_tracker_db`.
- App is fully client-side and works offline after first load.

## Features included
- Dashboard with countdown, overall and section progress, topic of the day, recent mock trend.
- VARC/DILR/QA section trackers with status cycling and revision flags.
- Topic detail pages with concept notes, traps, sample questions, formulas, notes, and error logging.
- Study planner with weekly distribution and clipboard export.
- Mock tracker with analytics charts.
- Global error log + top-errored topics chart.
- Attempt strategy static guide.
- Settings: exam date override, theme choice, export/import JSON, reset with confirmation.