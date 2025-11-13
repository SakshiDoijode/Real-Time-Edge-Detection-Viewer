High-performance edge detection pipeline with native Android processing and web visualization
Features • Demo • Installation • Architecture • Usage


📖 Overview
A cross-platform real-time edge detection system that combines the power of OpenCV C++ for native processing with WebGL for GPU-accelerated rendering. Seamlessly process camera feeds on Android devices and visualize results through an interactive web interface.
🎯 Key Highlights

⚡ Real-time Processing - 10-15 FPS on Android, 30+ FPS on Web
🎨 Multiple Algorithms - Sobel, Canny, Prewitt, Roberts, Laplacian
🚀 GPU Acceleration - OpenGL ES 2.0 / WebGL rendering
🌐 Cross-Platform - Native Android + TypeScript Web Viewer
🔧 Modular Design - Clean separation of concerns


✨ Features
📱 Android Application
<table>
<tr>
<td width="50%">
Core Features

📷 Camera2 API Integration

Live camera feed via TextureView
Hardware-accelerated capture


🎛 Native Processing

OpenCV C++ via JNI bridge
Grayscale conversion
Canny edge detection


🎮 OpenGL ES Rendering

GPU texture mapping
Real-time frame updates


🔄 Interactive Controls

Toggle raw ↔ processed feed
Adjustable parameters



</td>
<td width="50%">
cpp
// Native processing pipeline
Camera2 → TextureView
    ↓
JNI Bridge (frame buffer)
    ↓
OpenCV C++ (filters)
    ↓
RGBA buffer
    ↓
OpenGL ES → Display

</td>
</tr>
</table>
🌐 Web Viewer
<table>
<tr>
<td width="50%">
Core Features

📹 WebRTC Integration

Browser webcam access
MediaStream processing


🧮 Dual Processing Modes

Pure TypeScript algorithms
OpenCV WebAssembly backend


🎨 Algorithm Suite

Sobel (X/Y gradients)
Canny (multi-stage)
Prewitt operators
Roberts cross
Laplacian of Gaussian


📊 Performance Metrics

Real-time FPS counter
Resolution display
Processing time stats



</td>
<td width="50%">
typescript
// Web processing pipeline
navigator.mediaDevices
    ↓
HTML5 Canvas
    ↓
Edge Detection Engine
  ├─ TypeScript (CPU)
  └─ OpenCV WASM (optimized)
    ↓
WebGL Renderer
    ↓
Browser Display

</td>
</tr>
</table>

🎬 Demo
Screenshots
<table>
<tr>
<td align="center" width="50%">
<img src="screenshots/android.png" alt="Android App" width="300"/>
<br/>
<b>Android Native App</b>
<br/>
<i>Real-time Canny edge detection</i>
</td>
<td align="center" width="50%">
<img src="screenshots/web.png" alt="Web Viewer" width="300"/>
<br/>
<b>Web Viewer Interface</b>
<br/>
<i>Multi-algorithm comparison</i>
</td>
</tr>
</table>
Performance
PlatformFPSLatencyResolutionAndroid (Native)10-15~70ms1920×1080Web (TypeScript)25-30~35ms1280×720Web (WASM)30-40~25ms1280×720

🚀 Installation
📱 Android Setup
Prerequisites
bash✓ Android Studio (Arctic Fox or later)
✓ Android NDK r21 or higher
✓ OpenCV Android SDK 4.x
✓ Physical device or emulator with camera
Step-by-Step Guide
1️⃣ Clone the Repository
bashgit clone https://github.com/yourusername/edge-detection-viewer.git
cd edge-detection-viewer
2️⃣ Download OpenCV SDK
bash# Download from https://opencv.org/releases/
# Extract to: android/app/src/main/cpp/opencv/
3️⃣ Configure NDK
bash# Open Android Studio → SDK Manager → SDK Tools
# ☑ NDK (Side by side)
# ☑ CMake
4️⃣ Update CMakeLists.txt
cmake# Verify OpenCV path
set(OpenCV_DIR ${CMAKE_SOURCE_DIR}/opencv/sdk/native/jni)
find_package(OpenCV REQUIRED)
5️⃣ Build & Run
bash# Via Android Studio: Build → Make Project
# Or via command line:
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk

🌐 Web Viewer Setup
Prerequisites
bash✓ Node.js 16+ & npm
✓ Modern browser (Chrome/Firefox/Edge)
✓ Webcam access
Quick Start
1️⃣ Install Dependencies
bashcd web
npm install
2️⃣ Build TypeScript
bashnpm run build
3️⃣ Start Development Server
bash# Option A: Node server
npm run serve

# Option B: Python server
python3 serve.py

# Option C: Any static server
npx http-server -p 8000
4️⃣ Open Browser
🌐 http://localhost:8000

🏗 Architecture
System Overview
mermaidgraph TB
    subgraph Android
        A[Camera2 API] --> B[TextureView]
        B --> C[JNI Bridge]
        C --> D[OpenCV C++]
        D --> E[OpenGL ES]
        E --> F[Display]
    end
    
    subgraph Web
        G[WebRTC] --> H[Canvas]
        H --> I[Edge Detection]
        I --> J[WebGL]
        J --> K[Browser]
    end
    
    D -.Network.-> I
📱 Android Components
/android
├── app/src/main/java/com/example/edgedetection/
│   ├── MainActivity.java          # UI controller
│   ├── CameraHandler.java         # Camera2 wrapper
│   ├── GLRenderer.java            # OpenGL renderer
│   └── NativeProcessor.java       # JNI interface
│
├── app/src/main/cpp/
│   ├── native-lib.cpp             # JNI implementation
│   ├── EdgeDetector.cpp           # OpenCV algorithms
│   ├── gl/
│   │   ├── GLProgram.cpp          # Shader management
│   │   └── Texture.cpp            # Texture handling
│   └── CMakeLists.txt
│
└── app/src/main/res/
    └── layout/activity_main.xml
🌐 Web Components
/web
├── src/
│   ├── app.ts                     # Main application
│   ├── edge-detection.ts          # Algorithm implementations
│   ├── opencv-processor.ts        # WASM wrapper
│   ├── webgl-renderer.ts          # WebGL rendering
│   └── types.ts                   # TypeScript definitions
│
├── index.html                     # Entry point
├── package.json
└── tsconfig.json

💻 Usage
Android App
java// Initialize processor
NativeProcessor processor = new NativeProcessor();

// Process frame
byte[] processedFrame = processor.detectEdges(
    inputBuffer,
    width,
    height,
    EdgeDetectionMode.CANNY
);

// Render with OpenGL
glRenderer.updateTexture(processedFrame);
Web API
typescript// Initialize edge detector
const detector = new EdgeDetectionApp({
  algorithm: 'canny',
  useWASM: true
});

// Start processing
await detector.start();

// Change algorithm on-the-fly
detector.setAlgorithm('sobel');

// Get performance stats
const stats = detector.getStats();
console.log(FPS: ${stats.fps});

🎨 Algorithms
Supported Edge Detection Methods
AlgorithmDescriptionBest ForSobelGradient-based, separable filtersGeneral-purpose, fastCannyMulti-stage optimal detectorHigh-quality edgesPrewittSimilar to Sobel, simpler kernelQuick prototypingRoberts2×2 diagonal operatorsThin edges, speedLaplacianSecond derivative, zero-crossingsFine details
Parameter Tuning
typescript// Canny parameters
{
  lowThreshold: 50,    // Lower hysteresis bound
  highThreshold: 150,  // Upper hysteresis bound
  kernelSize: 3        // Gaussian blur size
}

// Sobel parameters
{
  kernelSize: 3,       // Operator size (3, 5, 7)
  scale: 1.0,          // Output scaling
  delta: 0             // Added to result
}

🔧 Configuration
Android Build Configuration
gradle.properties
propertiesandroid.useAndroidX=true
android.enableJetifier=true
app/build.gradle
groovyandroid {
    ndkVersion "21.4.7075529"
    
    externalNativeBuild {
        cmake {
            cppFlags "-std=c++17 -frtti -fexceptions"
            arguments "-DOpenCV_DIR=..."
        }
    }
}
Web Configuration
tsconfig.json
json{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020", "DOM"],
    "strict": true
  }
}

🧪 Testing
Run Android Tests
bash./gradlew test
./gradlew connectedAndroidTest
Run Web Tests
bashnpm test
npm run test:coverage

📦 Project Structure
edge-detection-viewer/
├── android/                   # Android native app
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/         # Java sources
│   │   │   ├── cpp/          # C++ sources
│   │   │   └── res/          # Resources
│   │   └── build.gradle
│   └── gradle/
│
├── web/                       # Web viewer
│   ├── src/                  # TypeScript sources
│   ├── dist/                 # Built files
│   ├── index.html
│   ├── package.json
│   └── tsconfig.json
│
├── screenshots/              # Demo images
├── docs/                     # Documentation
└── README.md

🤝 Contributing
We welcome contributions! Please see CONTRIBUTING.md for guidelines.
Development Workflow

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments

OpenCV Team for the incredible computer vision library
Android Camera2 API documentation
WebGL and Canvas API specifications
TypeScript community
