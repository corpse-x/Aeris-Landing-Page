# AERIS — Read the Air

A local, single-page reference adaptation for a fictional environmental intelligence studio. Built with React 18, TypeScript, Vite, Tailwind CSS 3, and lucide-react.

## Run

```sh
npm install
npm run dev
```

The development server listens on `127.0.0.1`. Open the local URL printed by Vite. To verify and preview the production bundle:

```sh
npm run build
npm run preview
```

The build tools use their WebAssembly distributions, and npm scripts call their JavaScript entry points directly. This keeps the project runnable on Android shared storage, which disallows native executables and package-bin symlinks. `.npmrc` disables bin symlinks locally for this project.

## Deploy to Vercel

1. Push this project directory to a Git repository. Include `package-lock.json`, `.npmrc`, and all of `public/assets/aeris/`.
2. Import the repository into Vercel. If this project is inside a larger repository, set Root Directory to the folder containing `vercel.json`.
3. Deploy. `vercel.json` configures the Vite preset, `npm ci` installation, `npm run build`, and the `dist` output directory. `package.json` selects Node.js 22.x.

No environment variables, API keys, database, or server functions are needed. The deployment is static; Vite copies the local videos, posters, and fonts into the published output. The SPA rewrite serves the page for direct links, while existing static files are served normally. Navigation uses section anchors.

`.vercelignore` excludes local dependencies, previous builds, screenshots, and asset-generation scripts from CLI uploads. Assets are already generated and do not require Python or FFmpeg on Vercel. The WebAssembly build-tool overrides also work on Vercel and preserve compatibility with local Android storage.

To reproduce the deployment build with Node.js 22:

```sh
npm ci
npm run build
```

Configuration follows [Vercel's Vite deployment guide](https://vercel.com/docs/frameworks/frontend/vite).

## Prototype behavior

Overview, Field Notes, and Signals navigate within the three-section page. Request a Brief, Request a Field Brief, FAQ, Contact, and the map bars open a local editorial brief dialog with links into the field guide and signals. Nothing is submitted or sent. This prototype has no backend, authentication, analytics, live sensors, real measurements, or real customers.

The canvas splash runs on page load. Sections reveal once. The mobile menu locks page scrolling, traps focus, closes on Escape, and returns focus. Reduced motion skips the pixel iris, displays static posters without mounting video, and disables transform animations and smooth scrolling. Videos load on first visibility and pause outside the viewport, behind a menu or dialog, during the splash, and when the tab is hidden. The fixed background tracks the hero section's visibility rather than the fixed video's position. Navigation batches scroll updates into animation frames and caches section positions to avoid repeated layout reads. All media and fonts are local; runtime does not require external services.

## Assets

All five source artworks were made with the built-in imagegen tool. The four H.264 MP4s are illustrative 10-second, 24 fps camera-motion loops made from the generated stills, not live observations or simulated sensor output. Each has a WebP first-frame poster. Topography is 1920 × 1280. Assets reside in `public/assets/aeris/`.

Prompt set: nocturnal charcoal cloud inversion with silver vapor ribbons and tiny orange glints; pale ivory overcast cloud layer with no hard horizon; monochrome organic elevation contours with stippled texture; physical silver particulate streams through a scanning light plane with sparse orange light; square monochrome macro optical radar lens. Every prompt excludes text, brands, and UI elements.

JetBrains Mono is a locally hosted variable font (weights 300–700), distributed under its included OFL license. `aeris-dot-display.woff2` is an original dotted display font built from a small custom glyph matrix covering the displayed phrases and numerals. The wind-rose SVG is original.

`scripts/prepare-assets.py` documents the asset conversion and font generation process. It is not needed to run or build the site. Regeneration requires the original generated PNGs at the script's source directory, Python fontTools/Pillow/Brotli, and FFmpeg.
