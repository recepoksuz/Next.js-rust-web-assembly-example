# Next.js + Rust WebAssembly Example

A simple example showing how to use Rust functions in a Next.js application via WebAssembly.

## Features

- **Rust Math Functions**: High-performance calculations
- **WebAssembly Integration**: Native code speed in browser
- **Modern Stack**: Next.js 15, React 19, TypeScript
- **Clean Architecture**: Modular components and custom hooks
- **Type Safety**: Full TypeScript support

## Project Structure

```
assembly-next/
├── app/
│   └── page.tsx              # Main page component
├── components/
│   ├── LoadingSpinner.tsx    # Loading component
│   ├── ErrorMessage.tsx      # Error display component
│   ├── InputSection.tsx      # Input form component
│   ├── ResultsSection.tsx    # Results display component
│   └── InfoSection.tsx       # Info component
├── hooks/
│   └── useWebAssembly.ts     # WebAssembly custom hook
├── types/
│   └── wasm.ts               # TypeScript definitions
├── constants/
│   └── index.ts              # Constants and config
└── math/                     # Rust WebAssembly module
    ├── src/lib.rs            # Rust math functions
    └── pkg/                  # Compiled WebAssembly files
```

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/recepoksuz/Next.js-rust-web-assembly-example.git
   cd Next.js-rust-web-assembly-example
   ```

2. **Build the Rust WebAssembly module**

   ```bash
   cd math
   wasm-pack build --target web
   cd ..
   ```

3. **Install Next.js dependencies**

   ```bash
   cd assembly-next
   npm install
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**
   http://localhost:3000

## How It Works

1. **Rust Functions**: Math operations written in Rust (`math/src/lib.rs`)
2. **WebAssembly Compilation**: Rust code compiled to WebAssembly
3. **Dynamic Import**: WebAssembly module loaded asynchronously in React
4. **Custom Hook**: `useWebAssembly` manages WASM loading and state
5. **Type Safety**: TypeScript interfaces for all WASM functions

## Usage

1. Enter two numbers in the input fields
2. Click "Calculate with Web Assembly"
3. See the results calculated by Rust functions running as WebAssembly

## Adding New Functions

1. Add function to `math/src/lib.rs`:

   ```rust
   #[wasm_bindgen]
   pub fn power(base: i32, exp: i32) -> i32 {
       base.pow(exp as u32)
   }
   ```

2. Rebuild WebAssembly:

   ```bash
   cd math && wasm-pack build --target web
   ```

3. Update TypeScript types in `types/wasm.ts`

4. Use the new function in your React components

## Developer

**Recep Öksüz**

- GitHub: [@recepoksuz](https://github.com/recepoksuz)
