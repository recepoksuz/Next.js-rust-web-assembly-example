# Vercel Deployment Guide

## Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (already done)
2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
3. **Import your repository**: `Next.js-rust-web-assembly-example`
4. **Configure build settings**:
   - **Root Directory**: Leave empty (use root)
   - **Build Command**: `cd math && wasm-pack build --target web && cd ../assembly-next && npm install && npm run build`
   - **Output Directory**: `assembly-next/.next`
   - **Install Command**: `cd assembly-next && npm install`

## Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from root directory**:
   ```bash
   vercel --prod
   ```

## Option 3: Use GitHub Actions (Advanced)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install Rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable
          target: wasm32-unknown-unknown
      - name: Install wasm-pack
        run: curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
      - name: Build WASM
        run: cd math && wasm-pack build --target web
      - name: Install dependencies
        run: cd assembly-next && npm install
      - name: Build Next.js
        run: cd assembly-next && npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./assembly-next
```

## Troubleshooting

### Common Issues:

1. **"Command not found: wasm-pack"**
   - Vercel needs Rust toolchain
   - Add to build command: `curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh && `

2. **"Module not found: math"**
   - WASM package not built before Next.js build
   - Ensure build order: WASM first, then Next.js

3. **"Function deployment timeout"**
   - Use Hobby plan or higher for longer build times
   - Consider pre-building WASM locally and committing `/math/pkg/`

### Build Command Fix:
If Rust installation fails, try this build command:

```bash
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh && cd math && wasm-pack build --target web && cd ../assembly-next && npm install && npm run build
```

## Environment Variables (if needed)

Set in Vercel Dashboard → Settings → Environment Variables:
- `NODE_VERSION`: `18`
- `RUST_VERSION`: `stable`

## Final Notes

- Build time might be 3-5 minutes due to Rust compilation
- First deployment might take longer
- Monitor build logs for any errors
- Test locally first: `npm run build` from project root
