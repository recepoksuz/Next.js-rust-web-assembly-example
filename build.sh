#!/bin/bash
set -e

echo "Building WebAssembly module..."
cd math
wasm-pack build --target web
cd ..

echo "Installing Next.js dependencies..."
cd assembly-next
npm install

echo "Building Next.js application..."
npm run build
