#!/bin/bash
set -e

# Install wasm-pack
echo "Installing wasm-pack..."
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Make wasm-pack available in PATH
export PATH="$HOME/.cargo/bin:$PATH"

# Build WASM module
echo "Building WebAssembly module..."
cd math
wasm-pack build --target web --out-dir pkg
cd ..

# Navigate to Next.js directory
echo "Moving to Next.js directory..."
cd assembly-next

# Install dependencies
echo "Installing dependencies..."
npm install

# Build Next.js app
echo "Building Next.js application..."
npm run build
