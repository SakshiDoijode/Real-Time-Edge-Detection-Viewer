/**
 * OpenCV.js Processor
 * Uses OpenCV C++ compiled to WebAssembly for native performance
 */
export declare class OpenCVProcessor {
    private cv;
    private isReady;
    constructor();
    /**
     * Initialize OpenCV.js (load WebAssembly module)
     */
    initialize(): Promise<void>;
    /**
     * Check if OpenCV is ready
     */
    ready(): boolean;
    /**
     * Apply Canny Edge Detection using OpenCV C++ (via WebAssembly)
     */
    canny(imageData: ImageData, lowThreshold?: number, highThreshold?: number): ImageData;
    /**
     * Apply Grayscale filter using OpenCV C++
     */
    grayscale(imageData: ImageData): ImageData;
    /**
     * Apply Sobel Edge Detection using OpenCV C++
     */
    sobel(imageData: ImageData, ksize?: number): ImageData;
    /**
     * Apply Gaussian Blur using OpenCV C++
     */
    gaussianBlur(imageData: ImageData, ksize?: number, sigma?: number): ImageData;
    /**
     * Apply Laplacian Edge Detection using OpenCV C++
     */
    laplacian(imageData: ImageData, ksize?: number): ImageData;
    /**
     * Get OpenCV build information
     */
    getBuildInfo(): string;
}
//# sourceMappingURL=opencv-processor.d.ts.map