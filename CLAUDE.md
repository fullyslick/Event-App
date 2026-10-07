# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Event browser for Eventbrite: list/filter events, view details, create events (client-side only), manage a ticket wish list, download the wish list as PDF. Two independent npm projects, no root package.json or workspace tooling:

- `backend/` — Express + TypeScript proxy to the Eventbrite API (port 8080).
- `frontend/` — Create React App (react-scripts 5), React 18, Redux Toolkit, React Router 6. Mid-migration from JS to TS: mixed `.js`/`.tsx`/`.ts` files (`allowJs: true`). `pages/Root.js` and `pages/Root.tsx` both exist as duplicates.

A separate `frontend` git branch runs without the backend, calling Eventbrite directly with credentials in `frontend/src/utils/config.json`.

Tested Node versions: 18.11.0, 14.16.0.

## Commands

Backend (run from `backend/`):
```
npm install
npx tsc          # compile src/ -> dist/ (no build script; required before start)
npm start        # nodemon dist/app.js — watches compiled JS, so re-run tsc (or tsc -w) after edits
```
Backend has no tests.

Frontend (run from `frontend/`):
```
npm install
npm start        # CRA dev server
npm run build
npm test                          # Jest watch mode
npm test -- --watchAll=false      # single run
npm test -- -t "test name"        # single test by name
```
Linting is CRA's built-in ESLint (`react-app` config), surfaced through `npm start`/`npm run build`. The only test, `src/App.test.js`, is the unmodified CRA template ("learn react") and fails against the current app.

## Configuration

`backend/env-data/.env` (tracked in git, loaded by `controller/api.ts` via path relative to `dist/controller`) holds `ORGANIZATION_ID`, `API_TOKEN`, `API_BASE_URL`, `API_ALL_EVENTS_URL` (contains `[organizationId]` placeholder), and `API_SINGLE_EVENT_URL` (contains `[eventId]` placeholder). The committed file has placeholder ID/token values; do not commit real credentials.

## Architecture

Data flow: Eventbrite API → backend proxy (transform) → frontend `utils/event-api.js` (hardcoded `http://localhost:8080`) → Redux thunks → slices → components.

Backend:
- Routes in `src/routes/api.ts`: `GET /api/get-events` and `GET /api/get-event-details?eventId=…`. CORS allows only GET.
- `src/utils/transform-data.ts` maps raw Eventbrite responses into the `EventbriteEvent` class (`src/types/events.ts`). This shape must match the frontend `event` interface in `frontend/src/types/index.ts` (id, title, description, date, location, address, imageOriginal, image, category, availableTickets, capacity, price, displayPrice, currency, ticketsWishList). Change both together.
- Uses the deprecated `request` library with callbacks; no error middleware yet.

Frontend state (`src/store/`):
- `events-slice.ts` — events array, wish list totals, and the `areEventsReplaced` flag. Pages check this flag (not event array length) to decide whether to fetch all events, because the single-event fetch (`appendEvent`) also populates `events`.
- `ui-slice.ts` — loader, notification, counter animation flag.
- `event-actions.ts` — thunks (`getEventsData`, `getSingleEvent`, `addNewEvent`). `addNewEvent` only adds to Redux with a `setTimeout` to fake latency; created events are not persisted anywhere.
- Use typed hooks `useAppDispatch`/`useAppSelector` from `store/hooks.ts` and selectors exported from the slices.

Wish list persistence:
- `utils/local-storage.js` stores `{ wishlist: { [eventId]: qty } }` under localStorage key `userEventData`.
- Reducers in `events-slice.ts` read and write localStorage directly (side effects inside reducers). On `replaceEvents`/`appendEvent` they reconcile stored quantities against `availableTickets`, resetting entries that exceed availability. If localStorage was cleared, `rebuiltStorage` rebuilds it from Redux state.

Other frontend pieces:
- Routes defined in `App.tsx` (`/`, `/wishlist`, `/new-event`, `/event/:eventId`) under `RootLayout`.
- Create-event form: Formik + Yup (`validators/validation-schema.js`, custom image URL validator), `react-datepicker`; `utils/transform-event-data.js` converts form values into the `event` shape.
- PDF export via `@react-pdf/renderer` in `components/PdfDownloader/`.
- Styling with CSS Modules (`*.module.css`).
