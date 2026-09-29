# Japonya.jp Flarum Teması

forum.japonya.jp için tema eklentisi (Flarum 1.8+). japonya.jp ile aynı görsel dil:
kâğıt zemin, ince kırmızı çizgiler, Source Serif 4 başlıklar, numaralı satırlar,
suluboya sakura, Fuji ve çam süslemeleri.

## Neler değişir

- **Üst menü:** Tartışmalar, Etiketler, Sıralamalar (fof/gamification), Takip Ediliyor
  (giriş yapmış üyeler, flarum/subscriptions). Ana siteye dönüş üstteki yeşil barda.
  Arama ikona dönüşür, tıklayınca açılır; oturum menüsünde yalnız avatar.
- **Ana sayfa kahramanı (alçak):** "交流 · Japonya.jp Forum", "Japonya, konuştukça yakın",
  sağda arama kutusu ve "Bir Tartışma Başlat"; altında üç yol kartı
  (Sorunu sor → Soru-Cevap, Rotanı paylaş → Gezi Planlama, Deneyimini anlat → yeni tartışma).
- **Kenar menüsü:** yalnız konu filtresi: "Konular", Tüm Tartışmalar ve renkli noktalı etiketler. Üst menüdeki bağlantılar geniş ekranda burada tekrar etmez (telefonda kenar menüsü tam kalır).
- **Liste:** "Son tartışmalar · 07 tartışma" başlığı, 01, 02… numaralı satırlar, küçük avatar,
  yanıt sayısı, sağda etiket ve ok.
- **Çerçeve (bütün sayfalar):** içerik alanının çevresinde anasitedeki gibi ince kırmızı çizgiler;
  köşelerde kesişir, sol çizgide dikey "日本へ、もっと近く" yazısı (1180 px altında gizli).
- **Arka plan (bütün sayfalar):** sağda büyük ve soluk suluboya Japonya haritası (japonya.jp
  kapağındaki, yalnız görsel) ve seigaiha dalgaları; ekrana sabit, içeriğin arkasında
  (1320 px altında gizli).
- **Sayfayla kayan süslemeler:** çerçevenin sol üst köşesinde pusula; içeriğin en altında solda
  sakura, sağda Fuji, çam ve torii. Kenar boşluğuna göre kademeli: 1700 px altında pusula,
  1600 px altında sakura, Fuji ve çam gizlenir.
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

Hostinger'da komut satırı PHP'sinde `proc_open` kapalıysa composer'ı şöyle çalıştır:
`php -d disable_functions= $(which composer) update japonya/flarum-theme`

**Önemli:** `update` çıktısında "is not locked" ve "Removing japonya/flarum-theme" görürsen
tema `composer.json` kaydından düşmüş demektir; composer da onu siler ve forum eski görünümüne
döner. Kaydı geri getirmek için `update` yerine bir kez `require` çalıştır:

```bash
composer require japonya/flarum-theme:dev-main
php flarum assets:publish
php flarum cache:clear
```

Kaydı kontrol etmek için: `grep flarum-theme composer.json`

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
