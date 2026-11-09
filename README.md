# Dog Guide

A responsive dog encyclopedia built with React, TypeScript, Vite, and Tailwind CSS 4. Includes 20 illustrated breed and dog profiles, search, size/group filters, a locally saved breed collection, rotating trivia, and source-linked care articles.

## Run locally

Requires Node.js 22.12+ (Node 24 also works).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. On PowerShell systems that block npm.ps1, use `npm.cmd` instead of `npm`.

## Production build

```sh
npm run build
npm run preview
```

The build runs strict TypeScript checking and produces `dist/`. No backend, API keys, or runtime image API are required. Saved breeds stay in the visitor's browser; they do not sync between devices. Google Fonts is optional: local serif and sans-serif fallbacks are provided.

## Deploy to GitHub Pages

1. Push these changes to the repository's `main` branch (or `master`).
2. On GitHub, open **Settings → Pages → Build and deployment → Source**, and select **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` installs the locked dependencies, builds, uploads `dist/`, and deploys to Pages. You can also run it manually from **Actions**.

Expected project URL: https://charlespura.github.io/DOG-GUIDE-HTML-CSS-JAVASCRIPT-/

Vite uses relative asset paths so the build works under the repository path or a custom domain. Navigation uses section anchors and dialogs, so no SPA rewrite or 404 workaround is needed.

## Update the encyclopedia

Edit `src/data.ts` to add or change breeds, trivia, and articles. Breed slugs also form their AKC reference links. Add the corresponding photo as `public/dogs/<slug>.jpg`. Use an accurate, appropriately licensed photo and record its source in `public/dogs/SOURCES.txt`.

Breed traits and ranges are general reference information, not a prediction about an individual animal. References include the American Kennel Club, ASPCA, and American Veterinary Society of Animal Behavior. Articles provide general education and direct readers to professional advice for individual health concerns.

Images are bundled locally; their original source URLs are recorded in `public/dogs/SOURCES.txt`. Dog CEO's collection is available at https://github.com/jigsawpieces/dog-api-images. Check each image's provenance and usage rights before reusing outside this project. The Aspin photograph is by Ewen Roberts, licensed CC BY 2.0; credit and the license link appear in the profile. All photos, including the hero, are bundled locally.


## Checks

Run `npm test` to check all 20 photo files, search, bookmarks, filters, profiles, source credits, trivia, care articles, and recovery from invalid saved data. Native dialog focus and responsive visual layout still need a real-browser check.

