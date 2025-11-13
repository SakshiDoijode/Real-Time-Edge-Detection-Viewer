🧪 Real-Time Edge Detection Viewer
Android (OpenCV C++ + OpenGL ES + JNI) + Web (TypeScript)

Assessment – RnD Intern

📌 Overview

This project is a Real-Time Edge Detection System built as part of a 3-day assessment to evaluate practical skills in:

Android Development

OpenCV (C++)

JNI (NDK)

OpenGL ES Rendering

TypeScript (Web Viewer)

The application processes camera frames in real-time, applies OpenCV-based edge detection, and renders the output through OpenGL ES.
A lightweight web viewer is also included to display processed frames and demonstrate cross-platform pipeline understanding.

✔️ Features Implemented (Android + Web)
Android (NDK + OpenCV C++ + OpenGL ES)

📸 Camera Feed Integration using TextureView + Camera2 API

🔁 JNI Bridge for sending raw frames to C++

🧠 OpenCV C++ Processing

Grayscale

Canny Edge Detection

🎨 OpenGL ES 2.0 Renderer

Displays processed frames as textures

Smooth rendering (10–15 FPS achievable)

🔘 Mode Toggle (Bonus)

Raw feed

Processed (Canny / Grayscale)

Web (TypeScript + OpenCV WebAssembly + WebGL)

🌐 Real-time webcam processing (TypeScript)

🔄 Algorithms supported:

Sobel

Canny

Roberts

Prewitt

Laplacian

🧱 OpenCV WebAssembly Integration

🎨 WebGL Renderer for GPU-accelerated output

🖥 Minimal viewer with:

Static processed frame preview

FPS counter

Resolution info
📁 Project Structure
/
├── android/
│   ├── app/src/main/java/  (Camera + JNI bridge)
│   ├── app/src/main/cpp/   (OpenCV C++ processing)
│   ├── gl/                 (OpenGL renderer)
│   └── CMakeLists.txt
│
├── web/
│   ├── src/
│   │   ├── app.ts
│   │   ├── edge-detection.ts
│   │   ├── opencv-processor.ts
│   │   ├── webgl-renderer.ts
│   │   └── types.ts
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── serve.py
│
└── README.md


📸 Screenshots / Demo









⚙️ Setup Instructions
🟦 Web Setup (TypeScript)
Install dependencies
npm install
npm run build

Run the web viewer
npm run serve


OR:

python3 serve.py


Open your browser at:

http://localhost:8000

🤖 Android Setup (NDK + OpenCV)
Requirements

Android Studio

Android NDK (r23+ recommended)

OpenCV Android SDK

OpenGL ES 2.0 compatible device

Steps

Download and extract OpenCV-Android-SDK

Copy the sdk/native folder into app/src/main/cpp/opencv/

Update CMakeLists.txt to include OpenCV

Enable NDK support in build.gradle

Build & Run on a physical Android device

🧠 Architecture Overview
📌 Frame Flow (Android)
Camera2 API  
    ↓  
TextureView → YUV frame  
    ↓ JNI  
C++ (OpenCV: Canny/Grayscale)  
    ↓  
Processed RGBA Buffer  
    ↓  
OpenGL ES Renderer  
    ↓  
Screen Output (Texture)

📌 Frame Flow (Web)
Webcam Stream  
    ↓  
HTML5 Canvas Input  
    ↓  
• TypeScript Algorithms (Sobel, Canny, etc.)  
           OR  
• OpenCV WebAssembly (WASM)  
    ↓  
WebGL Renderer  
    ↓  
Browser View
