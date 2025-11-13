/**
 * WebGL Renderer for OpenGL ES 2.0
 * Renders processed images as textures using WebGL
 */
export declare class WebGLRenderer {
    private gl;
    private program;
    private texture;
    private positionBuffer;
    private texCoordBuffer;
    private static readonly VERTEX_SHADER;
    private static readonly FRAGMENT_SHADER;
    constructor(canvas: HTMLCanvasElement);
    /**
     * Compile a shader
     */
    private compileShader;
    /**
     * Create and link shader program
     */
    private createProgram;
    /**
     * Create position buffer (full-screen quad)
     */
    private createPositionBuffer;
    /**
     * Create texture coordinate buffer
     */
    private createTexCoordBuffer;
    /**
     * Setup initial WebGL state
     */
    private setupWebGLState;
    /**
     * Render image data as texture
     */
    render(imageData: ImageData): void;
    /**
     * Resize the WebGL viewport
     */
    resize(width: number, height: number): void;
    /**
     * Clean up WebGL resources
     */
    dispose(): void;
    /**
     * Get the underlying WebGL context
     */
    getContext(): WebGLRenderingContext;
}
//# sourceMappingURL=webgl-renderer.d.ts.map