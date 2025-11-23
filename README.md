# React + Vite (with Material UI, React Router, data table + CSV)

A minimal, production-ready starter based on Vite for building React apps. This template was created with Vite and extended to include Material UI (MUI) for UI components, React Router for client routing, data fetching from a public API, tabular display with pagination, and client-side CSV export of the displayed data.

## Features
- Vite dev server with fast HMR
- React 18+ app scaffolded by Vite
- Material UI (MUI) for theming and components
- React Router for route-based UI
- Data fetching from a public API using the Fetch API
- Tabular display of fetched data with pagination and sorting-friendly layout
- Export currently viewed data to CSV (client-side Blob download)
- Basic ESLint setup; TypeScript can be added via the TS template

## Included libraries (examples)
- @mui/material, @mui/icons-material — UI components and icons
- react-router-dom — client-side routing
- (Optional) small helper for CSV creation (implemented client-side; no server required)

## Data fetching & CSV export
- Data is fetched from a configurable public API endpoint via the browser Fetch API.
- CSV export is implemented in-browser: the component serializes visible rows, creates a Blob, and triggers a download (no backend needed).

## Useful scripts
- npm run dev — start development server
- npm run build — create a production build
- npm run preview — preview production build locally
- npm run lint — run ESLint (if enabled)