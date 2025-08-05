# Vercel Deployment Guide

This project uses GitHub Actions for automated WASM building to enable seamless Vercel deployment.

## The Problem We Solved

**Original Issue**: Vercel couldn't deploy our Next.js + Rust WebAssembly project because:
- Vercel build environment doesn't have Rust toolchain by default
- Installing Rust + wasm-pack during build caused timeouts
- Monorepo structure confused Vercel's auto-detection
- Build commands were complex and unreliable

**Our Solution**: Pre-build WASM with CI/CD and let Vercel handle only Next.js
- ✅ GitHub Actions builds WASM when Rust code changes
- ✅ WASM artifacts are committed to the repository
- ✅ Vercel only needs to build standard Next.js app
- ✅ Fast, reliable deployments without Rust dependencies

## How It Works

1. **GitHub Actions**: When changes occur in `math/` directory:
   - Installs Rust toolchain and wasm-pack
   - Compiles WASM module with `wasm-pack build`
   - Copies output to `assembly-next/wasm-pkg/` directory
   - Commits and pushes the changes automatically

2. **Vercel**: Simply builds the Next.js app with pre-built WASM files
   - No Rust installation required
   - Standard Next.js build process
   - WebAssembly files are already available

## Vercel Setup

### Method 1: Dashboard (Recommended)
1. Go to **Vercel Dashboard** (vercel.com)
2. **Import Project** → Select your GitHub repository
3. **Root Directory**: Set to `assembly-next`
4. Deploy!

### Method 2: CLI
```bash
npm i -g vercel
cd assembly-next
vercel --prod
```

## Implementation Details

### GitHub Actions Workflow
The workflow (`.github/workflows/wasm.yml`) triggers on:
- Push to `math/**` files
- Manual workflow dispatch

Key steps:
```yaml
- Install Rust + wasm32 target
- Install wasm-pack
- Build: wasm-pack build --release --target web
- Copy files to assembly-next/wasm-pkg/
- Auto-commit and push
```

### Next.js Configuration
Updated `next.config.ts` for better WebAssembly support:
```typescript
webpack: (config) => {
  config.experiments = {
    ...config.experiments,
    asyncWebAssembly: true,
    topLevelAwait: true,
  };
  config.module.rules.push({ 
    test: /\.wasm$/, 
    type: 'asset/resource' 
  });
  return config;
}
```

### Import Strategy
Changed from external package to local files:
```typescript
// Before: import("math")
// After: import("../wasm-pkg")
```

## Important Notes

- **Initial Setup**: WASM files are already built and committed
- **Rust Updates**: GitHub Actions automatically rebuilds WASM when you modify `math/` directory
- **Next.js Updates**: Vercel automatically deploys when you modify `assembly-next/` directory
- **Build Target**: Uses `--target web` (not `bundler`) for better compatibility

## Troubleshooting

### Common Issues

**Build fails on Vercel**
- ✅ Ensure `assembly-next/wasm-pkg/` directory is committed
- ✅ Check that Root Directory is set to `assembly-next`
- ✅ Verify GitHub Actions completed successfully

**WASM not loading**
- ✅ Check GitHub Actions logs for build failures
- ✅ Ensure files exist in `assembly-next/wasm-pkg/`
- ✅ Verify import path in `useWebAssembly.ts`

**GitHub Actions not triggering**
- ✅ Make sure changes are in `math/` directory
- ✅ Check Actions tab for workflow status
- ✅ Verify repository permissions for Actions

**Vercel timeout**
- ✅ This should no longer happen with pre-built WASM
- ✅ If it does, check build logs for other issues

## Benefits of This Approach

1. **Reliability**: No runtime Rust installation failures
2. **Speed**: Faster builds (no Rust compilation on Vercel)
3. **Simplicity**: Standard Next.js deployment process
4. **Automation**: Rust changes automatically trigger WASM rebuilds
5. **Debugging**: Clear separation between WASM and Next.js build issues

## Manual WASM Build (if needed)

If you need to manually rebuild WASM:
```bash
cd math
wasm-pack build --release --target web --out-dir pkg
cd ..
rm -rf assembly-next/wasm-pkg && mkdir -p assembly-next/wasm-pkg
cp -R math/pkg/* assembly-next/wasm-pkg/
git add assembly-next/wasm-pkg
git commit -m "Update WASM build"
git push
```

This approach solves the fundamental challenge of deploying Rust WebAssembly projects on platforms that don't natively support Rust compilation.
