# Japonya.jp Flarum Teması

forum.japonya.jp için tema eklentisi (Flarum 1.8+). japonya.jp ile aynı görsel dil:
kâğıt zemin, ince kırmızı çizgiler, Source Serif 4 başlıklar, numaralı satırlar,
suluboya sakura, Fuji ve çam süslemeleri.

## Neler değişir

- **Üst menü:** Tartışmalar, Etiketler, Sıralamalar (fof/gamification), Takip Ediliyor
  (giriş yapmış üyeler, flarum/subscriptions) ve Ana site ↗. Arama ikona dönüşür,
  tıklayınca açılır.
- **Ana sayfa kahramanı:** "交流 · Japonya.jp Forum", "Japonya, konuştukça yakın",
  sağda arama kutusu ve "Bir Tartışma Başlat"; altında üç yol kartı
  (Sorunu sor → Soru-Cevap, Rotanı paylaş → Gezi Planlama, Deneyimini anlat → yeni tartışma).
- **Kenar menüsü:** "Forumu keşfet" ve "Konular" başlıkları, etiketler renkli noktayla.
- **Liste:** "Son tartışmalar · 07 tartışma" başlığı, 01, 02… numaralı satırlar, küçük avatar,
  yanıt sayısı, sağda etiket ve ok.
- **Süslemeler:** ana sayfada ince kırmızı çerçeve, seigaiha dalgaları, sol altta sakura,
  sağ altta Fuji, çam ve torii (1320 px altında gizlenir).
- **Diğer sayfalar:** tartışma sayfası serif başlık ve okunaklı gövde, etiket sayfası kâğıt
  zemin ve etiket renginde şerit, Etiketler sayfası kartpostal kartlar.
- Paneldeki ana renk ne olursa olsun forum japonya.jp paletini (kırmızı #c1272d, kâğıt #f7f6f0) kullanır.

Metinler `locale/tr.yml` ve `locale/en.yml` dosyalarında. Yol kartlarının gittiği etiketler
`js/src/forum/components/JfHero.js` içindeki `STEP_TAGS` satırında (varsayılan: `soru-cevap`,
`gezi-planlama`); etiket bulunmazsa kart arama kutusuna odaklanır.

## Kurulum (SSH ile, önerilen)

Flarum'un kurulu olduğu klasörde (içinde `flarum` dosyası ve `composer.json` olan):

```bash
composer config repositories.japonya-theme vcs https://github.com/ayolasmaz84-oss/flarum-theme
composer require japonya/flarum-theme:dev-main
php flarum cache:clear
```

Depo özelse composer GitHub erişimi ister: `composer config --global github-oauth.github.com <token>`
ile yalnız okuma yetkili bir token tanımla.

Sonra **Yönetim → Eklentiler → Japonya.jp Tema → Etkinleştir**.

## Kurulum (zip ile)

1. Bu deponun zip'ini indir, sunucuda Flarum klasörünün içine `packages/flarum-theme` olarak aç.
2. Flarum klasöründe:

```bash
composer config repositories.japonya-theme path packages/flarum-theme
composer require japonya/flarum-theme:@dev
php flarum cache:clear
```

3. Yönetim panelinden eklentiyi etkinleştir.

## Güncelleme

```bash
composer update japonya/flarum-theme
php flarum assets:publish
php flarum cache:clear
```

Hostinger'da LiteSpeed/CDN önbelleği varsa ardından onu da temizle.

## Kaldırma

Yönetim panelinden devre dışı bırakmak yeterli; forum eski görünümüne döner.
Tamamen silmek için `composer remove japonya/flarum-theme`.

## Geliştirme

```bash
cd js
npm install
npm run build   # js/dist/forum.js
```

`js/dist/forum.js` depoda derlenmiş olarak durur; sunucuda npm gerekmez.
