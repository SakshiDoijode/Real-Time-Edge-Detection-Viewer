/**
 * WebGL Renderer for OpenGL ES 2.0
 * Renders processed images as textures using WebGL
 */
export class WebGLRenderer {
    constructor(canvas) {
        // Get WebGL context (OpenGL ES 2.0)
        const gl = canvas.getContext('webgl', {
            alpha: false,
            antialias: false,
            depth: false,
            preserveDrawingBuffer: false,
            powerPreference: 'high-performance'
        });
        if (!gl) {
            throw new Error('WebGL (OpenGL ES 2.0) not supported');
        }
        this.gl = gl;
        // Compile shaders and create program
        this.program = this.createProgram();
        // Create texture
        const texture = gl.createTexture();
        if (!texture) {
            throw new Error('Failed to create WebGL texture');
        }
        this.texture = texture;
        // Setup texture parameters
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        // Create buffers for geometry
        this.positionBuffer = this.createPositionBuffer();
        this.texCoordBuffer = this.createTexCoordBuffer();
        // Setup WebGL state
        this.setupWebGLState();
        console.log('✅ WebGL Renderer (OpenGL ES 2.0) initialized');
        console.log('   Vendor:', gl.getParameter(gl.VENDOR));
        console.log('   Renderer:', gl.getParameter(gl.RENDERER));
        console.log('   Version:', gl.getParameter(gl.VERSION));
    }
    /**
     * Compile a shader
     */
    compileShader(source, type) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        if (!shader) {
            throw new Error('Failed to create shader');
        }
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const info = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(`Shader compilation failed: ${info}`);
        }
        return shader;
    }
    /**
     * Create and link shader program
     */
    createProgram() {
        const gl = this.gl;
        const vertexShader = this.compileShader(WebGLRenderer.VERTEX_SHADER, gl.VERTEX_SHADER);
        const fragmentShader = this.compileShader(WebGLRenderer.FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
        const program = gl.createProgram();
        if (!program) {
            throw new Error('Failed to create shader program');
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            gl.deleteProgram(program);
            throw new Error(`Program linking failed: ${info}`);
        }
        // Clean up shaders (no longer needed after linking)
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return program;
    }
    /**
     * Create position buffer (full-screen quad)
     */
    createPositionBuffer() {
        const gl = this.gl;
        const buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error('Failed to create position buffer');
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // Full-screen quad vertices (two triangles)
        const positions = new Float32Array([
            -1.0, -1.0, // Bottom-left
            1.0, -1.0, // Bottom-right
            -1.0, 1.0, // Top-left
            -1.0, 1.0, // Top-left
            1.0, -1.0, // Bottom-right
            1.0, 1.0 // Top-right
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        return buffer;
    }
    /**
     * Create texture coordinate buffer
     */
    createTexCoordBuffer() {
        const gl = this.gl;
        const buffer = gl.createBuffer();
        if (!buffer) {
            throw new Error('Failed to create texCoord buffer');
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        // Texture coordinates (flipped Y for correct orientation)
        const texCoords = new Float32Array([
            0.0, 1.0, // Bottom-left
            1.0, 1.0, // Bottom-right
            0.0, 0.0, // Top-left
            0.0, 0.0, // Top-left
            1.0, 1.0, // Bottom-right
            1.0, 0.0 // Top-right
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
        return buffer;
    }
    /**
     * Setup initial WebGL state
     */
    setupWebGLState() {
        const gl = this.gl;
        // Disable depth test (not needed for 2D rendering)
        gl.disable(gl.DEPTH_TEST);
        // Disable blending (opaque rendering)
        gl.disable(gl.BLEND);
        // Set clear color
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // Use our shader program
        gl.useProgram(this.program);
    }
    /**
     * Render image data as texture
     */
    render(imageData) {
        const gl = this.gl;
        // Update texture with new image data
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, // mipmap level
        gl.RGBA, // internal format
        gl.RGBA, // format
        gl.UNSIGNED_BYTE, // type
        imageData // data source
        );
        // Clear the canvas
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Setup position attribute
        const positionLocation = gl.getAttribLocation(this.program, 'a_position');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        // Setup texCoord attribute
        const texCoordLocation = gl.getAttribLocation(this.program, 'a_texCoord');
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLocation);
        gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
        // Set texture uniform
        const textureLocation = gl.getUniformLocation(this.program, 'u_texture');
        gl.uniform1i(textureLocation, 0);
        // Bind texture to texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        // Draw the quad (6 vertices = 2 triangles)
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    /**
     * Resize the WebGL viewport
     */
    resize(width, height) {
        this.gl.viewport(0, 0, width, height);
    }
    /**
     * Clean up WebGL resources
     */
    dispose() {
        const gl = this.gl;
        gl.deleteTexture(this.texture);
        gl.deleteBuffer(this.positionBuffer);
        gl.deleteBuffer(this.texCoordBuffer);
        gl.deleteProgram(this.program);
        console.log('🧹 WebGL Renderer disposed');
    }
    /**
     * Get the underlying WebGL context
     */
    getContext() {
        return this.gl;
    }
}
// Vertex shader source (OpenGL ES 2.0)
WebGLRenderer.VERTEX_SHADER = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = a_texCoord;
        }
    `;
// Fragment shader source (OpenGL ES 2.0)
WebGLRenderer.FRAGMENT_SHADER = `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture;
        
        void main() {
            gl_FragColor = texture2D(u_texture, v_texCoord);
        }
    `;
//# sourceMappingURL=webgl-renderer.js.map