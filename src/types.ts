/**
 * Type definitions for the Edge Detection application
 */

export type EdgeDetectionMethod = 'sobel' | 'canny' | 'roberts' | 'prewitt' | 'laplacian' | 'grayscale';

export type ProcessingMode = 'opencv' | 'typescript';

export interface EdgeDetectionConfig {
    threshold: number;
    blurAmount: number;
    method: EdgeDetectionMethod;
    mode: ProcessingMode;
}

export interface FPSCounter {
    frameCount: number;
    lastTime: number;
    currentFPS: number;
}

export interface VideoConstraints {
    width: { ideal: number };
    height: { ideal: number };
    facingMode: 'user' | 'environment';
}

export interface ProcessingState {
    isProcessing: boolean;
    animationId: number | null;
    videoStream: MediaStream | null;
}

export interface Kernel {
    data: number[];
    size: number;
}

export interface GradientData {
    magnitude: Float32Array;
    direction: Float32Array;
    width: number;
    height: number;
}

