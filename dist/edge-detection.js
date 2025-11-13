/**
 * Edge Detection Algorithms
 * Implements various edge detection methods with proper TypeScript types
 */
export class EdgeDetector {
    /**
     * Apply Gaussian blur to reduce noise
     */
    static gaussianBlur(imageData, radius) {
        if (radius === 0)
            return imageData;
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        const output = new Uint8ClampedArray(data);
        // Generate Gaussian kernel
        const kernel = [];
        const sigma = radius / 2;
        let sum = 0;
        for (let i = -radius; i <= radius; i++) {
            const val = Math.exp(-(i * i) / (2 * sigma * sigma));
            kernel.push(val);
            sum += val;
        }
        // Normalize kernel
        for (let i = 0; i < kernel.length; i++) {
            kernel[i] /= sum;
        }
        // Horizontal pass
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0;
                for (let k = -radius; k <= radius; k++) {
                    const px = Math.max(0, Math.min(width - 1, x + k));
                    const idx = (y * width + px) * 4;
                    const weight = kernel[k + radius];
                    r += data[idx] * weight;
                    g += data[idx + 1] * weight;
                    b += data[idx + 2] * weight;
                }
                const idx = (y * width + x) * 4;
                output[idx] = r;
                output[idx + 1] = g;
                output[idx + 2] = b;
            }
        }
        // Vertical pass
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let r = 0, g = 0, b = 0;
                for (let k = -radius; k <= radius; k++) {
                    const py = Math.max(0, Math.min(height - 1, y + k));
                    const idx = (py * width + x) * 4;
                    const weight = kernel[k + radius];
                    r += output[idx] * weight;
                    g += output[idx + 1] * weight;
                    b += output[idx + 2] * weight;
                }
                const idx = (y * width + x) * 4;
                data[idx] = r;
                data[idx + 1] = g;
                data[idx + 2] = b;
            }
        }
        return new ImageData(data, width, height);
    }
    /**
     * Convert RGB to grayscale
     */
    static toGrayscale(r, g, b) {
        return (r + g + b) / 3;
    }
    /**
     * Calculate gradient magnitude and direction
     */
    static calculateGradient(imageData, kernelX, kernelY) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        const magnitude = new Float32Array(width * height);
        const direction = new Float32Array(width * height);
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let gx = 0, gy = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx)) * 4;
                        const gray = this.toGrayscale(data[idx], data[idx + 1], data[idx + 2]);
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        gx += gray * kernelX[kernelIdx];
                        gy += gray * kernelY[kernelIdx];
                    }
                }
                const magIdx = y * width + x;
                magnitude[magIdx] = Math.sqrt(gx * gx + gy * gy);
                direction[magIdx] = Math.atan2(gy, gx);
            }
        }
        return { magnitude, direction, width, height };
    }
    /**
     * Sobel edge detection
     */
    static sobel(imageData, threshold) {
        const width = imageData.width;
        const height = imageData.height;
        const output = new Uint8ClampedArray(width * height * 4);
        const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
        const gradient = this.calculateGradient(imageData, sobelX, sobelY);
        for (let i = 0; i < gradient.magnitude.length; i++) {
            const value = gradient.magnitude[i] > threshold ? 255 : 0;
            const idx = i * 4;
            output[idx] = value;
            output[idx + 1] = value;
            output[idx + 2] = value;
            output[idx + 3] = 255;
        }
        return new ImageData(output, width, height);
    }
    /**
     * Prewitt edge detection
     */
    static prewitt(imageData, threshold) {
        const width = imageData.width;
        const height = imageData.height;
        const output = new Uint8ClampedArray(width * height * 4);
        const prewittX = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
        const prewittY = [-1, -1, -1, 0, 0, 0, 1, 1, 1];
        const gradient = this.calculateGradient(imageData, prewittX, prewittY);
        for (let i = 0; i < gradient.magnitude.length; i++) {
            const value = gradient.magnitude[i] > threshold ? 255 : 0;
            const idx = i * 4;
            output[idx] = value;
            output[idx + 1] = value;
            output[idx + 2] = value;
            output[idx + 3] = 255;
        }
        return new ImageData(output, width, height);
    }
    /**
     * Roberts Cross edge detection
     */
    static roberts(imageData, threshold) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        const output = new Uint8ClampedArray(width * height * 4);
        for (let y = 0; y < height - 1; y++) {
            for (let x = 0; x < width - 1; x++) {
                const idx = (y * width + x) * 4;
                const idx1 = (y * width + (x + 1)) * 4;
                const idx2 = ((y + 1) * width + x) * 4;
                const idx3 = ((y + 1) * width + (x + 1)) * 4;
                const p1 = this.toGrayscale(data[idx], data[idx + 1], data[idx + 2]);
                const p2 = this.toGrayscale(data[idx1], data[idx1 + 1], data[idx1 + 2]);
                const p3 = this.toGrayscale(data[idx2], data[idx2 + 1], data[idx2 + 2]);
                const p4 = this.toGrayscale(data[idx3], data[idx3 + 1], data[idx3 + 2]);
                const gx = p1 - p4;
                const gy = p2 - p3;
                const magnitude = Math.sqrt(gx * gx + gy * gy);
                const value = magnitude > threshold ? 255 : 0;
                output[idx] = value;
                output[idx + 1] = value;
                output[idx + 2] = value;
                output[idx + 3] = 255;
            }
        }
        return new ImageData(output, width, height);
    }
    /**
     * Laplacian edge detection
     */
    static laplacian(imageData, threshold) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        const output = new Uint8ClampedArray(width * height * 4);
        const laplacianKernel = [0, 1, 0, 1, -4, 1, 0, 1, 0];
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let sum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx)) * 4;
                        const gray = this.toGrayscale(data[idx], data[idx + 1], data[idx + 2]);
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        sum += gray * laplacianKernel[kernelIdx];
                    }
                }
                const magnitude = Math.abs(sum);
                const value = magnitude > threshold ? 255 : 0;
                const idx = (y * width + x) * 4;
                output[idx] = value;
                output[idx + 1] = value;
                output[idx + 2] = value;
                output[idx + 3] = 255;
            }
        }
        return new ImageData(output, width, height);
    }
    /**
     * Canny edge detection (simplified implementation)
     */
    static canny(imageData, threshold) {
        const width = imageData.width;
        const height = imageData.height;
        const output = new Uint8ClampedArray(width * height * 4);
        const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
        const gradient = this.calculateGradient(imageData, sobelX, sobelY);
        // Non-maximum suppression
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                const magIdx = y * width + x;
                const mag = gradient.magnitude[magIdx];
                const dir = gradient.direction[magIdx];
                // Quantize direction to 0, 45, 90, 135 degrees
                const angle = ((dir * 180 / Math.PI) + 180) % 180;
                let isMax = true;
                if ((angle >= 0 && angle < 22.5) || (angle >= 157.5 && angle < 180)) {
                    // Horizontal edge (0°)
                    isMax = mag >= gradient.magnitude[magIdx - 1] &&
                        mag >= gradient.magnitude[magIdx + 1];
                }
                else if (angle >= 22.5 && angle < 67.5) {
                    // Diagonal edge (45°)
                    isMax = mag >= gradient.magnitude[magIdx - width + 1] &&
                        mag >= gradient.magnitude[magIdx + width - 1];
                }
                else if (angle >= 67.5 && angle < 112.5) {
                    // Vertical edge (90°)
                    isMax = mag >= gradient.magnitude[magIdx - width] &&
                        mag >= gradient.magnitude[magIdx + width];
                }
                else {
                    // Diagonal edge (135°)
                    isMax = mag >= gradient.magnitude[magIdx - width - 1] &&
                        mag >= gradient.magnitude[magIdx + width + 1];
                }
                const idx = (y * width + x) * 4;
                const value = (isMax && mag > threshold) ? 255 : 0;
                output[idx] = value;
                output[idx + 1] = value;
                output[idx + 2] = value;
                output[idx + 3] = 255;
            }
        }
        return new ImageData(output, width, height);
    }
}
//# sourceMappingURL=edge-detection.js.map