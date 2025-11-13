# Real-Time Edge Detection Viewer  
### Android (OpenCV C++ + OpenGL ES + JNI) • Web (TypeScript + WebGL)

This project implements a high-performance real-time edge detection system across Android and Web platforms.  
It integrates native C++ image processing with OpenCV, GPU-accelerated rendering using OpenGL ES / WebGL, and a TypeScript-based web viewer.  
The system demonstrates efficient camera acquisition, native processing pipelines, and cross-platform visualization.

---

## 1. Overview

The Real-Time Edge Detection Viewer provides:

- Native camera frame processing on Android using OpenCV C++ through JNI
- Web-based visualization using WebGL and TypeScript
- Multiple edge detection algorithms (Canny, Sobel, Prewitt, Roberts, Laplacian)
- GPU-accelerated rendering for real-time performance
- A modular architecture suitable for research, R&D assessments, and production-grade pipelines

---

## 2. Features

### 2.1 Android Application
- Camera2 API integration  
- Real-time frame processing via OpenCV C++ (JNI bridge)  
- OpenGL ES 2.0 rendering pipeline  
- Frame filters:
  - Grayscale  
  - Canny Edge Detection  
- Toggle between raw and processed camera feeds  
- Achieves 10–15 FPS depending on device  

### 2.2 Web Viewer (TypeScript)
- Web-based webcam capture  
- Edge detection algorithms implemented in TypeScript:
  - Sobel  
  - Canny  
  - Prewitt  
  - Roberts  
  - Laplacian  
- Optional OpenCV WebAssembly backend  
- WebGL GPU rendering  
- Built-in FPS counter and resolution display  

---

## 3. Architecture

### 3.1 Android Processing Pipeline
Camera2 API  
    ↓  
TextureView (camera preview)  
    ↓  
JNI (frame buffer transfer)  
    ↓  
OpenCV C++ (Grayscale / Canny processing)  
    ↓  
RGBA output buffer  
    ↓  
OpenGL ES Renderer  
    ↓  
Display on Android screen  

---

### 3.2 Web Processing Pipeline
Webcam (getUserMedia)  
    ↓  
HTML Canvas  
    ↓  
Edge Detection (TS Algorithms or OpenCV WebAssembly)  
    ↓  
WebGL Renderer  
    ↓  
Browser Output



---

## 4. Project Structure

project/
├── android/
│   └── app/
│       └── src/
│           ├── main/java/
│           ├── main/cpp/
│           └── main/gl/
│
├── web/
│   ├── src/
│   │   ├── app.ts
│   │   ├── edge-detection.ts
│   │   ├── opencv-processor.ts
│   │   ├── webgl-renderer.ts
│   │   └── types.ts
│   ├── index.html
│   ├── serve.py
│   ├── package.json
│   └── tsconfig.json
│
└── README.md 



---

## 5. Setup Instructions

### 5.1 Android Setup (NDK + OpenCV)

#### Requirements
- Android Studio  
- Android NDK  
- OpenCV Android SDK  
- Physical/virtual Android device  

#### Steps
1. Enable NDK in Android Studio  
2. Download and extract the OpenCV Android SDK  
3. Place OpenCV inside:


app/src/main/cpp/opencv/

`
4. Update your CMakeLists.txt to link OpenCV  
5. Build and run the application  

---

### 5.2 Web Viewer Setup (TypeScript)

#### Installation
sh
npm install
npm run build
`

#### Local Development Server

sh
npm run serve
# or
python3 serve.py


#### Open in Browser


http://localhost:8000


---

## 6. Key Files

### Android

* native-lib.cpp — Core OpenCV processing
* renderer.cpp — OpenGL ES texture rendering
* CameraController.java — Camera2 pipeline

### Web

* edge-detection.ts — Edge detection algorithms
* webgl-renderer.ts — GPU texture rendering
* opencv-processor.ts — WebAssembly OpenCV integration
* app.ts — Main application controller

---

## 7. Screenshots

(Add your own images)


screenshots/android.png
screenshots/web.png


---

## 8. Technologies Used

### Android

* OpenCV (C++)
* JNI
* OpenGL ES 2.0
* Camera2 API
* CMake / NDK

### Web

* TypeScript
* WebGL
* OpenCV.js (optional)
* WebAssembly

---

## 9. License

This project is licensed under the MIT License.
(Add full details if required.)

---

## 10. Acknowledgements

* OpenCV contributors
* Khronos Group (OpenGL ES 2.0)
* TypeScript & WebGL ecosystem

---



---

If you want, I can also provide:

✅ A **professional GitHub badge header**  
✅ A **repository folder auto-setup script (.sh)**  
✅ A **documentation folder (docs/)**  
✅ A **logo or cover image for your README**

Just tell me — I can generate it instantly.
