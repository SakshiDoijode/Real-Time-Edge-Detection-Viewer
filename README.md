
🔍 Real-Time Edge Detection
A compact guide for the real-time edge detection project (Web first, Android notes included).

What’s included (implemented)
Web (implemented)
Real‑time webcam processing (TypeScript) with multiple algorithms: Sobel, Canny, Roberts, Prewitt, Laplacian. See EdgeDetector.sobel and EdgeDetector.canny.
OpenCV C++ via WebAssembly wrapper: OpenCVProcessor.initialize.
GPU rendering using WebGL (OpenGL ES 2.0): WebGLRenderer.render.
Main app glue: EdgeDetectionApp.
Files to inspect:

src/app.ts
src/edge-detection.ts
src/opencv-processor.ts
src/webgl-renderer.ts
src/types.ts
index.html
serve.py
package.json
tsconfig.json
Quick screenshots

Quick setup (Web)
Install deps and build:
npm install
npm run build
Serve:
npm run serve
or python serve.py
Open: http://localhost:8000 (See package.json and serve.py)
Android port notes (NDK / JNI / OpenCV)
Use OpenCV Android SDK and Android NDK.
Native pipeline idea:
Camera frames → native code via JNI → process using OpenCV C++ (same algorithms) → return RGBA buffer → render via Surface/GL.
Key items to implement on Android:
JNI bridge mirroring OpenCVProcessor behavior.
Native modules for Sobel/Canny if you want parity with WASM performance.
Useful tools: Android NDK, OpenCV Android SDK, Gradle native build.
Architecture (short)
Frame flow (Web):
Webcam → 2D input canvas (src/app.ts)
Process via:
WebAssembly OpenCV: OpenCVProcessor or
TypeScript algorithms: EdgeDetector
Render result to WebGL texture: WebGLRenderer.render
Android mapping:
Camera → native (JNI) → OpenCV C++ → Output buffer → GL renderer / SurfaceView.
