#!/bin/bash
set -e

echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

echo "Installing wasm-pack..."
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

echo "Building WebAssembly module..."
cd math
wasm-pack build --target web
cd ..

echo "Installing Next.js dependencies..."
cd assembly-next
npm install

echo "Building Next.js application..."
npm run build
