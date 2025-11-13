/**
 * OpenCV.js Processor
 * Uses OpenCV C++ compiled to WebAssembly for native performance
 */

export class OpenCVProcessor {
    private cv: any;
    private isReady: boolean = false;

    constructor() {
        this.cv = null;
    }

    /**
     * Initialize OpenCV.js (load WebAssembly module)
     */
    public async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            // Check if OpenCV is already loaded
            if (typeof (window as any).cv !== 'undefined') {
                this.cv = (window as any).cv;
                
                // Wait for OpenCV to be ready
                (window as any).cv.onRuntimeInitialized = () => {
                    this.isReady = true;
                    console.log('✅ OpenCV.js (WebAssembly) initialized!');
                    console.log('   OpenCV version:', this.cv.getBuildInformation());
                    resolve();
                };
            } else {
                reject(new Error('OpenCV.js not loaded. Please include opencv.js in HTML.'));
            }
        });
    }

    /**
     * Check if OpenCV is ready
     */
    public ready(): boolean {
        return this.isReady;
    }

    /**
     * Apply Canny Edge Detection using OpenCV C++ (via WebAssembly)
     */
    public canny(imageData: ImageData, lowThreshold: number = 50, highThreshold: number = 150): ImageData {
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
        const outputData = new ImageData(
            new Uint8ClampedArray(result.data),
            result.cols,
            result.rows
        );

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
    public grayscale(imageData: ImageData): ImageData {
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
        const outputData = new ImageData(
            new Uint8ClampedArray(result.data),
            result.cols,
            result.rows
        );

        // Clean up
        src.delete();
        gray.delete();
        result.delete();

        return outputData;
    }

    /**
     * Apply Sobel Edge Detection using OpenCV C++
     */
    public sobel(imageData: ImageData, ksize: number = 3): ImageData {
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
        const outputData = new ImageData(
            new Uint8ClampedArray(result.data),
            result.cols,
            result.rows
        );

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
    public gaussianBlur(imageData: ImageData, ksize: number = 5, sigma: number = 0): ImageData {
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
        const outputData = new ImageData(
            new Uint8ClampedArray(blurred.data),
            blurred.cols,
            blurred.rows
        );

        // Clean up
        src.delete();
        blurred.delete();

        return outputData;
    }

    /**
     * Apply Laplacian Edge Detection using OpenCV C++
     */
    public laplacian(imageData: ImageData, ksize: number = 3): ImageData {
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
        const outputData = new ImageData(
            new Uint8ClampedArray(result.data),
            result.cols,
            result.rows
        );

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
    public getBuildInfo(): string {
        if (!this.isReady) {
            return 'OpenCV not initialized';
        }
        return this.cv.getBuildInformation();
    }
}

