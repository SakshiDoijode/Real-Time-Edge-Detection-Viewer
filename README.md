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
---

## 3. Screenshots

<img width="1843" height="996" alt="Screenshot 2025-11-14 135327" src="https://github.com/user-attachments/assets/d9af391b-f5cb-4f0a-b59d-57760fd55bfc" />

<img width="1814" height="784" alt="Screenshot 2025-11-14 135450" src="https://github.com/user-attachments/assets/49484c08-938f-4435-99fc-b9d963c1a35f" />

<img width="1854" height="995" alt="image" src="https://github.com/user-attachments/assets/83041282-02fe-4891-8e67-1a06663ac835" />



---

## 4. Architecture

### 4.1 Android Processing Pipeline
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

### 4.2 Web Processing Pipeline
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

## 5. Project Structure


<img width="399" height="804" alt="image" src="https://github.com/user-attachments/assets/0dedb4b5-13da-4e2c-8dae-c4abd8717437" />







---

## 6. Setup Instructions

### 6.1 Android Setup (NDK + OpenCV)

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

### 6.2 Web Viewer Setup (TypeScript)

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

## 7. Key Files

### Android

* native-lib.cpp — Core OpenCV processing
* renderer.cpp — OpenGL ES texture rendering
* CameraController.java — Camera2 pipeline

### Web

* edge-detection.ts — Edge detection algorithms
* webgl-renderer.ts — GPU texture rendering
* opencv-processor.ts — WebAssembly OpenCV integration
* app.ts — Main application controller



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







