
# Experimental Workflow Tracker (Web, PWA)

**MVP demo** that runs 100% in the browser (localStorage). Ready to switch to Firebase/Firestore for real data.

- Laptop + mobile friendly (React + Vite)
- QR generate/scan
- Calendar
- CSV export
- PWA manifest (install to home screen)

## Quick start

```bash
npm i
npm run dev
```

## Build & preview

```bash
npm run build
npm run preview
```

## Firebase (optional)

Add `src/services/firebase.ts` from your project setup and swap the demo store with real Firestore CRUD.

## Deploy to GitHub Pages

1. Create a repo, push this project.
2. Enable **Pages** → Source: **GitHub Actions**.
3. Keep the provided workflow (/.github/workflows/pages.yml). On push to `main`, it deploys to Pages.
