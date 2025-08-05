# Rust Math WebAssembly

Bu proje Rust'ta yazılmış matematik fonksiyonlarını WebAssembly kullanarak JavaScript'te çalıştırır.

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Rust (https://rustup.rs/)
- wasm-pack (otomatik kurulacak)

### Kurulum ve Çalıştırma

1. **WebAssembly build'i oluştur:**

```bash
wasm-pack build --target web --out-dir pkg
```

2. **Yerel sunucu başlat:**

```bash
python3 -m http.server 8000
# veya
npx serve .
```

3. **Tarayıcıda aç:**

```
http://localhost:8000
```

## 📁 Proje Yapısı

```
math/
├── src/
│   ├── lib.rs          # WebAssembly için export edilen fonksiyonlar
│   └── main.rs         # Orijinal Rust kodu (executable)
├── pkg/                # WebAssembly build çıktıları
│   ├── math.js         # JavaScript wrapper
│   ├── math_bg.wasm    # WebAssembly binary
│   └── package.json    # NPM paket bilgileri
├── index.html          # Demo sayfası
└── Cargo.toml          # Rust proje konfigürasyonu
```

## 🔧 Kullanılabilir Fonksiyonlar

### Temel Matematik

- `add(a, b)` - Toplama
- `sub(a, b)` - Çıkarma
- `mul(a, b)` - Çarpma
- `div(a, b)` - Bölme (sıfıra bölme kontrolü ile)

### Gelişmiş Matematik

- `power(base, exp)` - Üs alma
- `factorial(n)` - Faktöriyel
- `fibonacci(n)` - Fibonacci sayısı

### Yardımcı

- `greet(name)` - Console'a selamlama mesajı

## 💻 JavaScript'te Kullanım

```javascript
import init, {
  add,
  sub,
  mul,
  div,
  power,
  factorial,
  fibonacci,
} from "./pkg/math.js";

// WebAssembly modülünü başlat
await init();

// Fonksiyonları kullan
console.log(add(5, 3)); // 8
console.log(mul(4, 7)); // 28
console.log(power(2, 8)); // 256
console.log(factorial(5)); // 120
console.log(fibonacci(10)); // 55
```

## 🛠️ Geliştirme

### Yeni fonksiyon eklemek için:

1. `src/lib.rs` dosyasına fonksiyonu ekle:

```rust
#[wasm_bindgen]
pub fn yeni_fonksiyon(a: i32, b: i32) -> i32 {
    // fonksiyon implementasyonu
}
```

2. WebAssembly'yi yeniden build et:

```bash
wasm-pack build --target web --out-dir pkg
```

3. JavaScript'te import et ve kullan.

## 📝 Notlar

- `main.rs` executable program için, `lib.rs` library için kullanılır
- WebAssembly için `lib.rs` gerekli çünkü JavaScript'ten çağrılabilir olması gerekiyor
- `wasm-bindgen` crate'i Rust-JavaScript arasında köprü görevi görür
- CORS sorunları yaşamamak için yerel sunucu kullanın
