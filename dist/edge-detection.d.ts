/**
 * Edge Detection Algorithms
 * Implements various edge detection methods with proper TypeScript types
 */
export declare class EdgeDetector {
    /**
     * Apply Gaussian blur to reduce noise
     */
    static gaussianBlur(imageData: ImageData, radius: number): ImageData;
    /**
     * Convert RGB to grayscale
     */
    private static toGrayscale;
    /**
     * Calculate gradient magnitude and direction
     */
    private static calculateGradient;
    /**
     * Sobel edge detection
     */
    static sobel(imageData: ImageData, threshold: number): ImageData;
    /**
     * Prewitt edge detection
     */
    static prewitt(imageData: ImageData, threshold: number): ImageData;
    /**
     * Roberts Cross edge detection
     */
    static roberts(imageData: ImageData, threshold: number): ImageData;
    /**
     * Laplacian edge detection
     */
    static laplacian(imageData: ImageData, threshold: number): ImageData;
    /**
     * Canny edge detection (simplified implementation)
     */
    static canny(imageData: ImageData, threshold: number): ImageData;
}
//# sourceMappingURL=edge-detection.d.ts.map