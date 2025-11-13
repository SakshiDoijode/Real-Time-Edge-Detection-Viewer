/**
 * OpenCV.js Processor
 * Uses OpenCV C++ compiled to WebAssembly for native performance
 */
export class OpenCVProcessor {
    constructor() {
        this.isReady = false;
        this.cv = null;
    }
    /**
     * Initialize OpenCV.js (load WebAssembly module)
     */
    async initialize() {
        return new Promise((resolve, reject) => {
            // Check if OpenCV is already loaded
            if (typeof window.cv !== 'undefined') {
                this.cv = window.cv;
                // Wait for OpenCV to be ready
                window.cv.onRuntimeInitialized = () => {
                    this.isReady = true;
                    console.log('✅ OpenCV.js (WebAssembly) initialized!');
                    console.log('   OpenCV version:', this.cv.getBuildInformation());
                    resolve();
                };
            }
            else {
                reject(new Error('OpenCV.js not loaded. Please include opencv.js in HTML.'));
            }
        });
    }
    /**
     * Check if OpenCV is ready
     */
    ready() {
        return this.isReady;
    }
    /**
     * Apply Canny Edge Detection using OpenCV C++ (via WebAssembly)
     */
    canny(imageData, lowThreshold = 50, highThreshold = 150) {
        if (!this.isReady) {
            throw new Error('OpenCV not initialized');
        }
        const cv = this.cv;
        // Create OpenCV Mat from ImageData
        const src = cv.matFromImageData(imageData);
        // Convert to grayscale
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        // Apply Canny edge detection (native C++ implementation)
        const edges = new cv.Mat();
        cv.Canny(gray, edges, lowThreshold, highThreshold);
        // Convert back to RGBA
        const result = new cv.Mat();
        cv.cvtColor(edges, result, cv.COLOR_GRAY2RGBA);
        // Convert Mat to ImageData
        const outputData = new ImageData(new Uint8ClampedArray(result.data), result.cols, result.rows);
        // Clean up
        src.delete();
        gray.delete();
        edges.delete();
        result.delete();
        return outputData;
    }
    /**
     * Apply Grayscale filter using OpenCV C++
     */
    grayscale(imageData) {
        if (!this.isReady) {
            throw new Error('OpenCV not initialized');
        }
        const cv = this.cv;
        // Create OpenCV Mat from ImageData
        const src = cv.matFromImageData(imageData);
        // Convert to grayscale
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        // Convert back to RGBA for display
        const result = new cv.Mat();
        cv.cvtColor(gray, result, cv.COLOR_GRAY2RGBA);
        // Convert Mat to ImageData
        const outputData = new ImageData(new Uint8ClampedArray(result.data), result.cols, result.rows);
        // Clean up
        src.delete();
        gray.delete();
        result.delete();
        return outputData;
    }
    /**
     * Apply Sobel Edge Detection using OpenCV C++
     */
    sobel(imageData, ksize = 3) {
        if (!this.isReady) {
            throw new Error('OpenCV not initialized');
        }
        const cv = this.cv;
        // Create OpenCV Mat from ImageData
        const src = cv.matFromImageData(imageData);
        // Convert to grayscale
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        // Apply Gaussian blur to reduce noise
        const blurred = new cv.Mat();
        cv.GaussianBlur(gray, blurred, new cv.Size(3, 3), 0);
        // Compute gradients in X and Y directions
        const gradX = new cv.Mat();
        const gradY = new cv.Mat();
        cv.Sobel(blurred, gradX, cv.CV_16S, 1, 0, ksize);
        cv.Sobel(blurred, gradY, cv.CV_16S, 0, 1, ksize);
        // Convert to absolute values
        const absGradX = new cv.Mat();
        const absGradY = new cv.Mat();
        cv.convertScaleAbs(gradX, absGradX);
        cv.convertScaleAbs(gradY, absGradY);
        // Combine gradients
        const edges = new cv.Mat();
        cv.addWeighted(absGradX, 0.5, absGradY, 0.5, 0, edges);
        // Convert back to RGBA
        const result = new cv.Mat();
        cv.cvtColor(edges, result, cv.COLOR_GRAY2RGBA);
        // Convert Mat to ImageData
        const outputData = new ImageData(new Uint8ClampedArray(result.data), result.cols, result.rows);
        // Clean up
        src.delete();
        gray.delete();
        blurred.delete();
        gradX.delete();
        gradY.delete();
        absGradX.delete();
        absGradY.delete();
        edges.delete();
        result.delete();
        return outputData;
    }
    /**
     * Apply Gaussian Blur using OpenCV C++
     */
    gaussianBlur(imageData, ksize = 5, sigma = 0) {
        if (!this.isReady) {
            throw new Error('OpenCV not initialized');
        }
        const cv = this.cv;
        // Create OpenCV Mat from ImageData
        const src = cv.matFromImageData(imageData);
        // Apply Gaussian blur
        const blurred = new cv.Mat();
        cv.GaussianBlur(src, blurred, new cv.Size(ksize, ksize), sigma);
        // Convert Mat to ImageData
        const outputData = new ImageData(new Uint8ClampedArray(blurred.data), blurred.cols, blurred.rows);
        // Clean up
        src.delete();
        blurred.delete();
        return outputData;
    }
    /**
     * Apply Laplacian Edge Detection using OpenCV C++
     */
    laplacian(imageData, ksize = 3) {
        if (!this.isReady) {
            throw new Error('OpenCV not initialized');
        }
        const cv = this.cv;
        // Create OpenCV Mat from ImageData
        const src = cv.matFromImageData(imageData);
        // Convert to grayscale
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        // Apply Gaussian blur to reduce noise
        const blurred = new cv.Mat();
        cv.GaussianBlur(gray, blurred, new cv.Size(3, 3), 0);
        // Apply Laplacian
        const laplacian = new cv.Mat();
        cv.Laplacian(blurred, laplacian, cv.CV_16S, ksize);
        // Convert to absolute values
        const absLaplacian = new cv.Mat();
        cv.convertScaleAbs(laplacian, absLaplacian);
        // Convert back to RGBA
        const result = new cv.Mat();
        cv.cvtColor(absLaplacian, result, cv.COLOR_GRAY2RGBA);
        // Convert Mat to ImageData
        const outputData = new ImageData(new Uint8ClampedArray(result.data), result.cols, result.rows);
        // Clean up
        src.delete();
        gray.delete();
        blurred.delete();
        laplacian.delete();
        absLaplacian.delete();
        result.delete();
        return outputData;
    }
    /**
     * Get OpenCV build information
     */
    getBuildInfo() {
        if (!this.isReady) {
            return 'OpenCV not initialized';
        }
        return this.cv.getBuildInformation();
    }
}
//# sourceMappingURL=opencv-processor.js.map