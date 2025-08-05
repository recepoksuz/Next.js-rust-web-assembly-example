# Vercel Deployment

Bu proje, GitHub Actions ile otomatik WASM build kullanarak Vercel'de deploy edilir.

## Nasıl Çalışır

1. **GitHub Actions**: `math/` klasöründe değişiklik olduğunda otomatik olarak:
   - Rust toolchain kurar
   - `wasm-pack` ile WASM modülünü derler
   - Çıktıları `assembly-next/wasm-pkg/` klasörüne kopyalar
   - Değişiklikleri commit eder

2. **Vercel**: Sadece hazır WASM dosyalarıyla Next.js uygulamasını build eder

## Vercel Kurulumu

### Yöntem 1: Dashboard ile (Önerilen)
1. **Vercel Dashboard**'a git (vercel.com)
2. **Import Project** → GitHub repository seç
3. **Root Directory**: `assembly-next` seç
4. Deploy et

### Yöntem 2: CLI ile
```bash
npm i -g vercel
cd assembly-next
vercel --prod
```

## Önemli Notlar

- **İlk Deploy**: Manual olarak WASM build edip push etmelisiniz:
  ```bash
  cd math
  wasm-pack build --release --target web --out-dir pkg
  cd ..
  rm -rf assembly-next/wasm-pkg && mkdir -p assembly-next/wasm-pkg
  cp -R math/pkg/* assembly-next/wasm-pkg/
  git add assembly-next/wasm-pkg
  git commit -m "Add initial WASM build"
  git push
  ```

- **Rust Güncellemeleri**: `math/` klasöründe değişiklik yaptığınızda GitHub Actions otomatik olarak yeni WASM build eder

- **Next.js Güncellemeleri**: `assembly-next/` klasöründe değişiklik yaptığınızda Vercel otomatik deploy eder

## Troubleshooting

- **Build hatası alıyorsanız**: `assembly-next/wasm-pkg/` klasörünün commit edildiğinden emin olun
- **WASM yüklenmiyor**: GitHub Actions log'larını kontrol edin
- **Vercel timeout**: Root directory'nin `assembly-next` olduğundan emin olun
