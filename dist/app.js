/**
 * Main Application Logic
 * Real-time Edge Detection with TypeScript
 */
import { EdgeDetector } from './edge-detection.js';
import { WebGLRenderer } from './webgl-renderer.js';
import { OpenCVProcessor } from './opencv-processor.js';
class EdgeDetectionApp {
    constructor() {
        // State
        this.state = {
            isProcessing: false,
            animationId: null,
            videoStream: null
        };
        this.config = {
            threshold: 40,
            blurAmount: 1,
            method: 'sobel',
            mode: 'opencv'
        };
        this.fpsCounter = {
            frameCount: 0,
            lastTime: Date.now(),
            currentFPS: 0
        };
        /**
         * Process video frame
         */
        this.processFrame = () => {
            if (!this.state.isProcessing)
                return;
            try {
                // Draw current video frame
                this.inputCtx.drawImage(this.webcamElement, 0, 0, this.inputCanvas.width, this.inputCanvas.height);
                // Get image data
                let imageData = this.inputCtx.getImageData(0, 0, this.inputCanvas.width, this.inputCanvas.height);
                // Process frame based on mode
                let result;
                if (this.config.mode === 'opencv' && this.opencvProcessor.ready()) {
                    // Use OpenCV C++ (WebAssembly) for processing
                    // Apply blur if needed
                    if (this.config.blurAmount > 0) {
                        imageData = this.opencvProcessor.gaussianBlur(imageData, this.config.blurAmount * 2 + 1);
                    }
                    // Apply edge detection with OpenCV
                    switch (this.config.method) {
                        case 'sobel':
                            result = this.opencvProcessor.sobel(imageData);
                            break;
                        case 'canny':
                            result = this.opencvProcessor.canny(imageData, this.config.threshold, this.config.threshold * 2);
                            break;
                        case 'laplacian':
                            result = this.opencvProcessor.laplacian(imageData);
                            break;
                        case 'grayscale':
                            result = this.opencvProcessor.grayscale(imageData);
                            break;
                        case 'roberts':
                        case 'prewitt':
                            // Fall back to TypeScript for algorithms not in OpenCV wrapper
                            if (this.config.blurAmount > 0) {
                                imageData = EdgeDetector.gaussianBlur(imageData, this.config.blurAmount);
                            }
                            result = this.config.method === 'roberts'
                                ? EdgeDetector.roberts(imageData, this.config.threshold)
                                : EdgeDetector.prewitt(imageData, this.config.threshold);
                            break;
                        default:
                            result = this.opencvProcessor.sobel(imageData);
                    }
                }
                else {
                    // Use TypeScript implementation
                    // Apply blur if needed
                    if (this.config.blurAmount > 0) {
                        imageData = EdgeDetector.gaussianBlur(imageData, this.config.blurAmount);
                    }
                    // Apply edge detection with TypeScript
                    switch (this.config.method) {
                        case 'sobel':
                            result = EdgeDetector.sobel(imageData, this.config.threshold);
                            break;
                        case 'canny':
                            result = EdgeDetector.canny(imageData, this.config.threshold);
                            break;
                        case 'roberts':
                            result = EdgeDetector.roberts(imageData, this.config.threshold);
                            break;
                        case 'prewitt':
                            result = EdgeDetector.prewitt(imageData, this.config.threshold);
                            break;
                        case 'laplacian':
                            result = EdgeDetector.laplacian(imageData, this.config.threshold);
                            break;
                        case 'grayscale':
                            // Grayscale not available in TypeScript mode
                            result = EdgeDetector.sobel(imageData, this.config.threshold);
                            break;
                        default:
                            result = EdgeDetector.sobel(imageData, this.config.threshold);
                    }
                }
                // Render result using WebGL (OpenGL ES 2.0)
                this.webglRenderer.render(result);
                // Update FPS
                this.updateFPS();
            }
            catch (error) {
                console.error('Processing error:', error);
            }
            this.state.animationId = requestAnimationFrame(this.processFrame);
        };
        // Initialize DOM elements
        this.webcamElement = this.getElement('webcam');
        this.inputCanvas = this.getElement('inputCanvas');
        this.outputCanvas = this.getElement('outputCanvas');
        this.statusDiv = this.getElement('status');
        this.fpsDisplay = this.getElement('fpsDisplay');
        this.modeStatus = this.getElement('modeStatus');
        this.startBtn = this.getElement('startBtn');
        this.stopBtn = this.getElement('stopBtn');
        this.captureBtn = this.getElement('captureBtn');
        this.thresholdSlider = this.getElement('threshold');
        this.blurSlider = this.getElement('blur');
        // Get canvas contexts
        const inputCtx = this.inputCanvas.getContext('2d', { willReadFrequently: true });
        if (!inputCtx) {
            throw new Error('Failed to get input canvas context');
        }
        this.inputCtx = inputCtx;
        // Initialize WebGL renderer for output (OpenGL ES 2.0)
        try {
            this.webglRenderer = new WebGLRenderer(this.outputCanvas);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to initialize WebGL renderer: ${message}`);
        }
        // Initialize OpenCV processor (C++ via WebAssembly)
        this.opencvProcessor = new OpenCVProcessor();
        this.initializeOpenCV();
        this.initializeEventListeners();
        this.updateStatus('Ready! Click "Start Camera" to begin.', '');
    }
    /**
     * Initialize OpenCV.js (WebAssembly)
     */
    async initializeOpenCV() {
        try {
            this.modeStatus.textContent = '⏳ Loading OpenCV.js...';
            await this.opencvProcessor.initialize();
            this.modeStatus.textContent = '✅ OpenCV C++ Ready! (WebAssembly)';
            console.log('✅ OpenCV C++ processor initialized via WebAssembly');
        }
        catch (error) {
            console.warn('⚠️ OpenCV.js not available, falling back to TypeScript');
            this.modeStatus.textContent = '⚠️ OpenCV not available (using TypeScript)';
            this.config.mode = 'typescript';
        }
    }
    /**
     * Get element by ID with type safety
     */
    getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            throw new Error(`Element with id "${id}" not found`);
        }
        return element;
    }
    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Button events
        this.startBtn.addEventListener('click', () => this.startWebcam());
        this.stopBtn.addEventListener('click', () => this.stopWebcam());
        this.captureBtn.addEventListener('click', () => this.captureScreenshot());
        // Processing mode selection
        const opencvModeBtn = document.getElementById('opencvModeBtn');
        const typescriptModeBtn = document.getElementById('typescriptModeBtn');
        if (opencvModeBtn) {
            opencvModeBtn.addEventListener('click', () => this.selectMode('opencv'));
        }
        if (typescriptModeBtn) {
            typescriptModeBtn.addEventListener('click', () => this.selectMode('typescript'));
        }
        // Algorithm selection
        const methods = ['sobel', 'canny', 'roberts', 'prewitt', 'laplacian', 'grayscale'];
        methods.forEach(method => {
            const btn = document.getElementById(`${method}Btn`);
            if (btn) {
                btn.addEventListener('click', () => this.selectAlgorithm(method));
            }
        });
        // Parameter controls
        this.thresholdSlider.addEventListener('input', (e) => {
            const target = e.target;
            this.config.threshold = parseInt(target.value);
            const valueDisplay = document.getElementById('thresholdValue');
            if (valueDisplay) {
                valueDisplay.textContent = target.value;
            }
        });
        this.blurSlider.addEventListener('input', (e) => {
            const target = e.target;
            this.config.blurAmount = parseInt(target.value);
            const valueDisplay = document.getElementById('blurValue');
            if (valueDisplay) {
                valueDisplay.textContent = target.value;
            }
        });
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 's' || e.key === 'S') {
                if (!this.startBtn.disabled) {
                    this.startWebcam();
                }
                else if (!this.stopBtn.disabled) {
                    this.stopWebcam();
                }
            }
            else if (e.key === 'c' || e.key === 'C') {
                if (!this.captureBtn.disabled) {
                    this.captureScreenshot();
                }
            }
        });
    }
    /**
     * Update status message
     */
    updateStatus(message, type) {
        this.statusDiv.textContent = message;
        this.statusDiv.className = 'status-message';
        if (type) {
            this.statusDiv.classList.add(type);
        }
    }
    /**
     * Select processing mode
     */
    selectMode(mode) {
        // Check if OpenCV is available
        if (mode === 'opencv' && !this.opencvProcessor.ready()) {
            alert('OpenCV.js is not loaded yet. Please wait or use TypeScript mode.');
            return;
        }
        this.config.mode = mode;
        // Update mode button states
        const opencvBtn = document.getElementById('opencvModeBtn');
        const typescriptBtn = document.getElementById('typescriptModeBtn');
        if (opencvBtn && typescriptBtn) {
            opencvBtn.classList.remove('active');
            typescriptBtn.classList.remove('active');
            if (mode === 'opencv') {
                opencvBtn.classList.add('active');
                this.modeStatus.textContent = '✅ Using OpenCV C++ (WebAssembly)';
            }
            else {
                typescriptBtn.classList.add('active');
                this.modeStatus.textContent = '📝 Using TypeScript (Pure JS)';
            }
        }
        console.log(`Switched to ${mode} processing mode`);
    }
    /**
     * Select edge detection algorithm
     */
    selectAlgorithm(method) {
        // Check if grayscale is only for OpenCV
        if (method === 'grayscale' && this.config.mode !== 'opencv') {
            alert('Grayscale filter is only available in OpenCV mode.');
            return;
        }
        this.config.method = method;
        // Update button states (only algorithm buttons)
        const algorithmButtons = document.querySelectorAll('.algorithm-btn[data-method]');
        algorithmButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        const selectedBtn = document.getElementById(`${method}Btn`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
    }
    /**
     * Start webcam
     */
    async startWebcam() {
        try {
            const constraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                }
            };
            this.state.videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            this.webcamElement.srcObject = this.state.videoStream;
            this.webcamElement.onloadedmetadata = () => {
                const width = this.webcamElement.videoWidth;
                const height = this.webcamElement.videoHeight;
                this.inputCanvas.width = width;
                this.inputCanvas.height = height;
                this.outputCanvas.width = width;
                this.outputCanvas.height = height;
                // Update WebGL viewport
                this.webglRenderer.resize(width, height);
                this.updateStatus('Camera active! Processing in real-time (OpenGL ES 2.0)...', 'success');
                this.startBtn.disabled = true;
                this.stopBtn.disabled = false;
                this.captureBtn.disabled = false;
                this.state.isProcessing = true;
                this.processFrame();
            };
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.updateStatus(`Error: ${message}`, 'error');
            console.error('Webcam error:', error);
        }
    }
    /**
     * Stop webcam
     */
    stopWebcam() {
        this.state.isProcessing = false;
        if (this.state.animationId !== null) {
            cancelAnimationFrame(this.state.animationId);
            this.state.animationId = null;
        }
        if (this.state.videoStream) {
            this.state.videoStream.getTracks().forEach(track => track.stop());
            this.state.videoStream = null;
        }
        this.updateStatus('Camera stopped.', '');
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.captureBtn.disabled = true;
        this.fpsDisplay.textContent = '0';
    }
    /**
     * Update FPS counter
     */
    updateFPS() {
        this.fpsCounter.frameCount++;
        const currentTime = Date.now();
        if (currentTime - this.fpsCounter.lastTime >= 1000) {
            this.fpsCounter.currentFPS = Math.round((this.fpsCounter.frameCount * 1000) / (currentTime - this.fpsCounter.lastTime));
            this.fpsDisplay.textContent = this.fpsCounter.currentFPS.toString();
            this.fpsCounter.frameCount = 0;
            this.fpsCounter.lastTime = currentTime;
        }
    }
    /**
     * Capture screenshot
     */
    captureScreenshot() {
        try {
            const link = document.createElement('a');
            link.download = `edge_detection_${Date.now()}.png`;
            // WebGL canvas can be directly converted to data URL
            link.href = this.outputCanvas.toDataURL();
            link.click();
            this.updateStatus('Screenshot saved! (OpenGL ES 2.0 rendered)', 'success');
            setTimeout(() => {
                this.updateStatus('Camera active! Processing in real-time (OpenGL ES 2.0)...', 'success');
            }, 2000);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.updateStatus(`Error: ${message}`, 'error');
        }
    }
}
// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        new EdgeDetectionApp();
        console.log('✅ Edge Detection App (TypeScript) initialized!');
        console.log('📝 Keyboard shortcuts: S = Start/Stop, C = Capture');
    }
    catch (error) {
        console.error('❌ Failed to initialize app:', error);
    }
});
//# sourceMappingURL=app.js.map