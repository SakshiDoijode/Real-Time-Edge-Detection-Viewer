#!/usr/bin/env python3
"""
Simple HTTP server for the Edge Detection web application.
This server enables CORS and proper MIME types for WebAssembly.
"""

import http.server
import socketserver
import os
import sys

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # Proper MIME types for WASM
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        if path.endswith('.wasm'):
            return 'application/wasm'
        return mimetype

def main():
    # Change to the directory containing this script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("=" * 52)
        print("  Edge Detection Server Running")
        print("=" * 52)
        print("")
        print(f"  Server: http://localhost:{PORT}")
        print(f"  Directory: {os.getcwd()}")
        print("")
        print("  Press Ctrl+C to stop the server")
        print("")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n\n  Server stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()

