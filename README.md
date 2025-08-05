# Next.js + Rust WebAssembly Example

A comprehensive example demonstrating how to integrate Rust-compiled WebAssembly modules with Next.js applications. This project showcases the power of combining high-performance Rust calculations with modern React development.

## What is WebAssembly?

WebAssembly (WASM) is a binary instruction format that allows code written in languages like Rust, C++, and Go to run in web browsers at near-native speed. It's designed to complement JavaScript, not replace it.

### Key Benefits of WebAssembly:

- **Performance**: Near-native execution speed
- **Security**: Runs in a sandboxed environment
- **Portability**: Works across different platforms and browsers
- **Language Flexibility**: Write in languages other than JavaScript

## Why Rust + WebAssembly?

Rust is an excellent choice for WebAssembly because:

- **Memory Safety**: No garbage collector, predictable performance
- **Zero-cost Abstractions**: High-level features without performance overhead
- **Excellent Tooling**: `wasm-pack` makes compilation seamless
- **Growing Ecosystem**: Rich libraries and community support

## Project Structure

This repository contains two main components:

```
├── math/                     # Rust WebAssembly Module
│   ├── src/
│   │   ├── lib.rs           # Rust math functions with WASM bindings
│   │   └── main.rs          # Optional standalone executable
│   ├── pkg/                 # Generated WebAssembly files
│   │   ├── math.js          # JavaScript bindings
│   │   ├── math_bg.wasm     # WebAssembly binary
│   │   ├── math.d.ts        # TypeScript definitions
│   │   └── package.json     # NPM package configuration
│   ├── Cargo.toml           # Rust project configuration
│   └── README.md            # Rust module documentation
└── assembly-next/           # Next.js Frontend Application
    ├── app/
    │   └── page.tsx         # Main application page
    ├── components/          # React components
    ├── hooks/               # Custom React hooks
    ├── types/               # TypeScript definitions
    ├── constants/           # Application constants
    └── README.md            # Frontend documentation
```

## How It Works

### 1. Rust Side (WebAssembly Module)

The Rust code defines mathematical functions and exports them for use in JavaScript:

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Key features:

- **`#[wasm_bindgen]`**: Macro that generates JavaScript bindings
- **Type Safety**: Rust's type system ensures reliability
- **Memory Management**: No garbage collection, predictable performance

### 2. Compilation Process

The Rust code is compiled to WebAssembly using `wasm-pack`:

```bash
wasm-pack build --target web
```

This generates:

- **`.wasm` file**: The actual WebAssembly binary
- **`.js` file**: JavaScript wrapper for easy integration
- **`.d.ts` file**: TypeScript definitions for type safety

### 3. Next.js Integration

The frontend application loads and uses the WebAssembly module:

```typescript
// Dynamic import for code splitting
const wasmModule = await import("math");
await wasmModule.default(); // Initialize WASM
const result = wasmModule.add(5, 3); // Use Rust function
```

## Architecture Highlights

### Custom Hook Pattern

```typescript
export const useWebAssembly = () => {
  const [mathModule, setMathModule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWasm = async () => {
      const wasmModule = await import("math");
      await wasmModule.default();
      setMathModule(wasmModule);
      setLoading(false);
    };
    loadWasm();
  }, []);

  return { mathModule, loading };
};
```

### Component-Based UI

- **Separation of Concerns**: Each component has a single responsibility
- **Type Safety**: Full TypeScript support throughout
- **Modern React**: Uses latest React patterns and hooks

### Error Handling

```typescript
try {
  const wasmModule = await import("math");
  await wasmModule.default();
} catch (err) {
  console.error("Failed to load WebAssembly:", err);
}
```

## Getting Started

### Prerequisites

- **Node.js** 18+ for the frontend
- **Rust** toolchain for WebAssembly compilation
- **wasm-pack** for building WebAssembly modules

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/recepoksuz/Next.js-rust-web-assembly-example.git
   cd Next.js-rust-web-assembly-example
   ```

2. **Build the WebAssembly module**

   ```bash
   cd math
   wasm-pack build --target web
   cd ..
   ```

3. **Install and run the frontend**

   ```bash
   cd assembly-next
   npm install
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Use Cases for WebAssembly

This example demonstrates basic math operations, but WebAssembly is excellent for:

### Performance-Critical Tasks

- **Image/Video Processing**: Filters, compression, format conversion
- **Cryptography**: Encryption, hashing, key generation
- **Scientific Computing**: Complex calculations, simulations
- **Game Engines**: Physics, rendering, audio processing

### Existing Code Migration

- **Legacy C/C++ Libraries**: Port existing codebases to the web
- **Cross-Platform Logic**: Share business logic between web and native apps
- **Specialized Algorithms**: Use domain-specific optimized code

## Performance Considerations

### When to Use WebAssembly:

✅ CPU-intensive computations  
✅ Existing non-JavaScript codebases  
✅ Consistent performance requirements  
✅ Complex algorithms with lots of loops

### When to Stick with JavaScript:

❌ Simple DOM manipulations  
❌ Network requests and API calls  
❌ Small, infrequent calculations  
❌ Code that heavily interacts with web APIs

## Development Workflow

### Adding New Functions

1. **Define in Rust** (`math/src/lib.rs`):

   ```rust
   #[wasm_bindgen]
   pub fn power(base: i32, exp: i32) -> i32 {
       base.pow(exp as u32)
   }
   ```

2. **Rebuild WebAssembly**:

   ```bash
   cd math && wasm-pack build --target web
   ```

3. **Update TypeScript types** (`assembly-next/types/wasm.ts`):

   ```typescript
   export interface MathModule {
     power: (base: number, exp: number) => number;
     // ... other functions
   }
   ```

4. **Use in React components**:
   ```typescript
   const result = mathModule.power(2, 8); // 256
   ```

## Browser Compatibility

WebAssembly is supported in all modern browsers:

- **Chrome** 57+
- **Firefox** 52+
- **Safari** 11+
- **Edge** 16+

## Security Considerations

WebAssembly runs in the same security sandbox as JavaScript:

- **Memory Safety**: Cannot access memory outside its designated space
- **Same-Origin Policy**: Subject to the same security restrictions
- **No Direct System Access**: Cannot directly access file system or network

## Performance Tips

1. **Minimize Data Transfer**: Reduce calls between JS and WASM
2. **Batch Operations**: Process multiple items in single WASM call
3. **Use Appropriate Types**: Match Rust and JavaScript data types
4. **Profile Your Code**: Measure actual performance improvements

## Future Enhancements

This example can be extended with:

- **Multi-threading**: Using Web Workers with shared memory
- **SIMD Operations**: Single Instruction, Multiple Data processing
- **More Complex Data Types**: Structs, enums, and custom types
- **Error Handling**: Comprehensive error propagation between Rust and JS

## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## Resources

- [WebAssembly Official Site](https://webassembly.org/)
- [Rust and WebAssembly Book](https://github.io/wasm-pack/)
- [Next.js Documentation](https://nextjs.org/docs)

## Developer

**Recep Öksüz**

- GitHub: [@recepoksuz](https://github.com/recepoksuz)

---

This project serves as both a learning resource and a practical starting point for integrating WebAssembly into modern web applications. Whether you're looking to boost performance or leverage existing Rust libraries, this example provides a solid foundation for your WebAssembly journey.
