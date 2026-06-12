# Experimental Workflow Tracker

A Progressive Web App for planning, tracking, and documenting multi-stage laboratory experiments.

## Research workflow problem

Complex experiments often require coordinated samples, time points, incubation conditions, labels, and exportable records. This project provides a lightweight digital workflow for organising those activities without requiring a full laboratory information management system.

## Features

- Experiment dashboard and calendar views
- Sample and time-point tracking
- QR-code generation and browser-based scanning
- CSV data export
- Installable Progressive Web App
- Browser-local storage for prototype use
- Optional Firebase/Firestore architecture for future multi-device synchronisation
- Responsive interface for desktop and mobile use

## Technology

- React
- TypeScript
- Vite
- React Router
- FullCalendar
- ZXing browser QR scanning
- Papa Parse
- Optional Firebase integration

## Quick start

```bash
npm install
npm run dev
```

Open the local address shown by Vite, normally `http://localhost:5173`.

## Build and preview

```bash
npm run build
npm run preview
```

## Deployment

A GitHub Pages workflow is included under `.github/workflows/`. Enable GitHub Pages with GitHub Actions as the deployment source after reviewing the workflow configuration.

## Data and privacy

The prototype stores data locally in the browser. Do not enter confidential, personally identifiable, clinical, or unpublished sensitive research data unless an appropriate secured storage layer has been configured and approved.

## Research-use note

This application is a workflow-support prototype. It does not replace validated laboratory records, institutional data systems, or independent verification of experimental plans and sample identities.

## Project role

Conceptualised, specified, tested, and iteratively developed to improve experimental traceability, scheduling, and reproducibility.
