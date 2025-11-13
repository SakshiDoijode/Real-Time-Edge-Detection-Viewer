# Setup and Installation Guide

This guide will help you get the FlamApp Edge Detection project up and running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.6 or higher) - [Download here](https://www.python.org/downloads/)
- **Modern web browser** (Chrome, Firefox, Edge, or Safari)
- **Webcam** (for real-time edge detection)

## Step-by-Step Installation

### Step 1: Clone or Download the Project

If you have the project folder, navigate to it:
```bash
cd FlamApp
```

### Step 2: Install Node.js Dependencies

Install the required npm packages (TypeScript and other dependencies):
```bash
npm install
```

This will download and install all packages listed in `package.json`.

### Step 3: Build the TypeScript Code

Compile the TypeScript source files to JavaScript:
```bash
npm run build
```

This command:
- Reads TypeScript files from the `src/` directory
- Compiles them to JavaScript
- Outputs the compiled files to the `dist/` directory

### Step 4: Start the Development Server

Start the Python HTTP server:
```bash
npm run serve
```

Or alternatively, run the Python script directly:
```bash
python serve.py
```

You should see output like:
```
====================================================
  Edge Detection Server Running
====================================================

  Server: http://localhost:8000
  Directory: C:\Users\...\FlamApp

  Press Ctrl+C to stop the server
```

### Step 5: Open in Browser

Open your web browser and navigate to:
```
http://localhost:8000
```

### Step 6: Grant Camera Permissions

When prompted, allow the browser to access your webcam.

### Step 7: Start Using the App

1. Click the **"Start Camera"** button
2. Select an edge detection algorithm (Sobel, Canny, Roberts, etc.)
3. Adjust the threshold and blur parameters as needed
4. Enjoy real-time edge detection!

## Quick Start Commands

For a quick setup, run these commands in order:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm run serve
```

Then open http://localhost:8000 in your browser.

## Development Mode

If you're making changes to the code, use development mode:

### Terminal 1 - Watch Mode
```bash
npm run watch
```
This automatically recompiles TypeScript files when you make changes.

### Terminal 2 - Server
```bash
npm run serve
```
Runs the local web server.

Now you can edit files in the `src/` directory, and they'll automatically recompile!

## Troubleshooting

### "npm command not found"
- Install Node.js from https://nodejs.org/

### "python command not found" (Windows)
- Try `python3 serve.py` or `py serve.py`
- Or install Python from https://www.python.org/downloads/

### "Cannot find module 'typescript'"
- Run `npm install` to install dependencies

### "Changes not showing in browser"
1. Make sure you ran `npm run build` after making changes
2. Hard refresh your browser: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### "Camera not working"
- Grant camera permissions when prompted
- Make sure your webcam is not being used by another application
- Try a different browser

### "Port 8000 already in use"
- Stop any other servers running on port 8000
- Or edit `serve.py` and change the `PORT` variable to a different number

## File Structure

After setup, your project should look like this:

```
FlamApp/
├── src/                    # TypeScript source files (edit these)
├── dist/                   # Compiled JavaScript files (generated)
├── node_modules/           # npm packages (generated)
├── index.html              # Main HTML file
├── styles.css              # Styles
├── serve.py                # Python development server
├── package.json            # npm configuration
├── tsconfig.json           # TypeScript configuration
├── requirements.txt        # Python dependencies (none required)
└── README.md               # Full documentation
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check keyboard shortcuts: `S` to start/stop camera, `C` to capture screenshot
- Experiment with different edge detection algorithms
- Adjust threshold and blur parameters for different effects

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the [README.md](README.md) file
3. Make sure all prerequisites are installed
4. Check that your browser supports WebRTC and WebGL

---

**Happy edge detecting! 🎉**

