# personal-website-threejs

[Murat Ermiş](https://github.com/murat-ermis) kişisel tanıtım sitesi. Next.js App
Router ile yazıldı, tamamen statik olarak dışa aktarılıyor ve GitHub Pages
üzerinde yayınlanıyor.

Ana sayfadaki 3B sahnede bir yazılımcı masasında kod yazıyor; yaklaşık 13 saniye
sonra masadan kalkıp jumping jack, yana esneme, öne eğilme, squat ve kol çevirme
hareketlerini yapıyor, ardından masasına dönüyor. Döngü baştan başlıyor.

## Teknolojiler

| Alan | Seçim |
| --- | --- |
| Çatı | Next.js 16 (App Router, `output: "export"`) |
| Dil | TypeScript |
| Stil | Tailwind CSS 4 |
| 3B | Three.js + React Three Fiber + drei |
| Araç sürümleri | mise (`mise.toml`) |
| CI/CD | GitHub Actions → GitHub Pages |

## Başlarken

Node sürümü `mise.toml` içinde sabitlenmiştir; `mise` kurulu değilse
[jdx.dev/mise](https://mise.jdx.dev) adresindeki adımları izleyin.

```bash
mise install && npm ci && mise run dev
```

Site `http://localhost:3000` adresinde açılır.

### Komutlar

| Komut | Açıklama |
| --- | --- |
| `mise run dev` | Geliştirme sunucusu |
| `mise run build` | Statik çıktıyı `out/` klasörüne üretir |
| `mise run lint` | ESLint |
| `mise run typecheck` | Rota tiplerini üretir ve `tsc --noEmit` çalıştırır |
| `mise run ci` | CI'in çalıştırdığı tüm kontroller |

## İçeriği düzenleme

Sitedeki tüm metinler tek bir dosyada toplanmıştır:
[`content/site.ts`](content/site.ts). Profil bilgisi, projeler, yetkinlikler,
deneyim ve menü başlıkları buradan düzenlenir; bileşenlere dokunmaya gerek
yoktur.

## 3B sahne

Sahnede harici bir model dosyası yüklenmez; karakter ve oda tamamen ilkel
geometrilerden kurulur. Bu sayede yükleme anında ağ isteği yapılmaz.

| Dosya | Sorumluluk |
| --- | --- |
| [`poses.ts`](components/scene/poses.ts) | Faz zaman çizelgesi ve her faz için eklem açıları |
| [`DeveloperCharacter.tsx`](components/scene/DeveloperCharacter.tsx) | Karakter iskeleti ve animasyon döngüsü |
| [`Workstation.tsx`](components/scene/Workstation.tsx) | Masa, monitör, klavye, sandalye |
| [`Room.tsx`](components/scene/Room.tsx) | Zemin, duvarlar, pencere, raf, bitki |
| [`ResponsiveCamera.tsx`](components/scene/ResponsiveCamera.tsx) | Kamerayı en-boy oranına göre geri çeker |
| [`HeroStage.tsx`](components/scene/HeroStage.tsx) | Kontroller, erişilebilirlik metni, `prefers-reduced-motion` |

Animasyon, iskelet animasyonu yerine **poz harmanlama** ile çalışır: her faz
belirli bir zamanda hedef eklem açılarını üretir, `DeveloperCharacter` de mevcut
pozu üstel sönümleme ile bu hedefe yaklaştırır. Fazlar arası geçişler böylece
ayrıca yazılmadan yumuşak olur.

Yeni bir hareket eklemek için `poses.ts` içinde bir poz fonksiyonu yazıp
`PHASES` dizisine ekleyin.

### Notlar

- `three` sürümü `0.182.x` olarak sabitlendi. Daha yeni sürümlerde React Three
  Fiber'in kullandığı `THREE.Clock` kullanımdan kaldırıldığı için konsolda uyarı
  çıkıyor. R3F bunu güncelleyince sabitleme kaldırılabilir.
- `prefers-reduced-motion: reduce` ayarı açık olan ziyaretçilerde animasyon
  duraklatılmış başlar.

## Yayınlama

`main` dalına yapılan her push, [`deploy.yml`](.github/workflows/deploy.yml) ile
siteyi derleyip GitHub Pages'e gönderir. Diğer dallar ve pull request'ler
[`ci.yml`](.github/workflows/ci.yml) ile yalnızca doğrulanır.

### İlk kurulum

1. Depo ayarlarında **Settings → Pages → Build and deployment → Source** alanını
   **GitHub Actions** olarak seçin.
2. `main` dalına push edin.

Site `https://murat-ermis.github.io/personal-website-threejs/` adresinde
yayınlanır.

`basePath`, `configure-pages` adımının bildirdiği değerden otomatik
ayarlanır; özel alan adına geçtiğinizde ya da depoyu `murat-ermis.github.io`
olarak yeniden adlandırdığınızda ek bir değişiklik gerekmez.
