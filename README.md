🔍 Real-Time Edge Detection Viewer

📱 Android (OpenCV C++ + OpenGL ES + JNI) 
🌐 Web (TypeScript)

This project implements a real-time edge detection pipeline using OpenCV in C++, rendered using OpenGL ES, with a TypeScript-based Web Viewer for visualization.
It demonstrates native processing, GPU rendering, and cross-platform integration between Android and Web.

📌 What’s Included (Implemented)
🌐 Web Implementation

Real-time webcam processing (TypeScript) with algorithms:

Sobel, Canny, Prewitt, Roberts, Laplacian

OpenCV C++ via WebAssembly wrapper:
OpenCVProcessor.initialize

GPU rendering using WebGL (OpenGL ES 2.0):
WebGLRenderer.render

Core app logic:
EdgeDetectionApp

Key Files
src/app.ts
src/edge-detection.ts
src/opencv-processor.ts
src/webgl-renderer.ts
src/types.ts
index.html
serve.py
package.json
tsconfig.json

✅ Features Implemented (Android + Web)
📱 Android Application

Camera feed integration using Camera2 API + TextureView

Frame processing in OpenCV C++ via JNI

Filters Supported:

Grayscale

Canny Edge Detection

Real-time GPU rendering using OpenGL ES 2.0 textures

Smooth performance (10–15 FPS)

Bonus Feature: Toggle Raw Feed ↔ Processed Feed

🌐 Web Viewer (TypeScript + WebGL)

Browser webcam integration

Edge detection implemented in TypeScript:

Sobel, Canny, Prewitt, Roberts, Laplacian

Optional OpenCV WebAssembly backend

GPU-accelerated rendering using WebGL

Displays:

Processed frame

FPS counter

Resolution info

🖼️ Screenshots / GIFs

(Add your images)

screenshots/android.png
screenshots/web.png

⚙️ Setup Instructions
📱 Android Setup (NDK + OpenCV)
Requirements

Android Studio

Android NDK

OpenCV Android SDK

Physical / virtual Android device

Steps

Enable NDK in Android Studio

Download and extract OpenCV-Android SDK

Place OpenCV folder here:

app/src/main/cpp/opencv/


Update CMakeLists.txt to link OpenCV

Build & run the project

🌐 Web Viewer Setup (TypeScript)

Install dependencies:

npm install
npm run build


Start server:

npm run serve
# OR
python3 serve.py


Open in browser:
👉 http://localhost:8000

🧠 Architecture Overview
📱 Android Data Flow
Camera2 API
     ↓  
TextureView
     ↓  
JNI (frame buffer)
     ↓  
OpenCV C++ (Grayscale / Canny)
     ↓  
Processed RGBA buffer
     ↓  
OpenGL ES Renderer
     ↓  
Final Display

🌐 Web Data Flow
Webcam
     ↓  
HTML Canvas
     ↓  
Edge Detection
  - TypeScript Algorithms
  - OR OpenCV WebAssembly
     ↓  
WebGL Renderer
     ↓  
Browser Output

🗂️ Project Structure
/android
   /app/src/main/java
   /app/src/main/cpp
   /gl

/web
   /src
   index.html
   package.json
   tsconfig.json

README.md

