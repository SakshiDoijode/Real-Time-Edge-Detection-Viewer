## Goal

Run the web app locally with TypeScript build and a local server, then verify webcam processing and OpenCV (WASM) initialization.

## Prerequisites


* Install `Node.js` (14+) and `Python` (3.6+)

* Use a modern browser (Chrome/Edge) with a webcam

## Steps

1. Install dependencies

   * `npm install`
2. Build TypeScript

   * `npm run build`

   * Outputs compiled JS to `dist/` per `tsconfig.json`
3. Start local server (preferred)

   * `python serve.py`

   * Uses CORS + COEP/COOP headers for WASM

   * Alternative: `npm run serve` (plain `http.server`)
4. Open the app

   * Navigate to `http://localhost:8000`
5. Grant camera permissions

   * Allow the browser to use the webcam when prompted
6. Use the app

   * Click `Start Camera`, pick an algorithm, adjust sliders

   * Status and mode indicator should update

## Development Mode (live edit)

* Terminal 1: `npm run watch` (auto‑rebuild TS)

* Terminal 2: `python serve.py` (keep server running)

## Verification Checklist

* Page loads and shows FPS counter and canvases

* OpenCV script loaded (`index.html`, line \~8) and initialized

  * Success message: `✅ OpenCV C++ Ready!` from `initializeOpenCV` (`src/app.ts`, around 90)

  * Fallback message if unavailable: `⚠️ OpenCV not available (using TypeScript)`

* `dist/app.js` is served and running (check browser console for errors)

* Webcam frames appear in the left canvas; processed output in the right via WebGL

## Troubleshooting

* Port in use: change `PORT` in `serve.py` and reopen `http://localhost:<port>`

* No camera: close other apps using webcam; re‑grant permissions

* Blank screen: hard refresh (`Ctrl+Shift+R`) and ensure build step was run

* Dev script `npm run dev` may not run both processes concurrently on Windows; prefer two terminals as above

## Next Action

After you confirm, I will:

* Run the commands in order

* Launch the server and open the preview URL

* Validate OpenCV initialization and live processing, and report back

