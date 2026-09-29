import app from 'flarum/forum/app';

/**
 * Sitenin arka planı ve çerçevesi (bütün sayfalarda):
 * - .JfBg: ekrana sabit, içeriğin arkasında duran fon: sağda büyük ve soluk suluboya Japonya
 *   haritası (japonya.jp kapağındaki, yalnız görsel) ve seigaiha dalgaları.
 * - .JfFrame: içerik alanını çevreleyen ince kırmızı çizgiler; anasitedeki gibi köşelerde
 *   kesişir, sol çizgi "日本へ、もっと近く" dikey yazısı için aralık bırakır. Sayfayla kayan
 *   süslemeler de burada: sol üstte pusula, içeriğin altında solda sakura, sağda Fuji, çam ve torii.
 *
 * Mithril'in yönettiği düğümlere dokunmamak için body'nin ve sunucunun bastığı
 * .App-content'in sonuna bir kez eklenir.
 */
export default function mountBackground() {
  const base = (app.forum.attribute('assetsBaseUrl') || app.forum.attribute('baseUrl') + '/assets') + '/extensions/japonya-theme/';

  if (!document.querySelector('.JfBg')) {
    const bg = document.createElement('div');
    bg.className = 'JfBg';
    bg.setAttribute('aria-hidden', 'true');
    bg.innerHTML = [
      '<span class="JfWave JfWave--1"></span>',
      '<span class="JfWave JfWave--2"></span>',
      '<span class="JfWave JfWave--3"></span>',
      '<span class="JfWave JfWave--4"></span>',
      `<img class="JfArt JfArt--map" src="${base}map.webp" alt="" decoding="async">`,
    ].join('');
    document.body.appendChild(bg);
  }

  const main = document.querySelector('.App-content');
  if (main && !main.querySelector(':scope > .JfFrame')) {
    const frame = document.createElement('div');
    frame.className = 'JfFrame';
    frame.setAttribute('aria-hidden', 'true');
    frame.innerHTML =
      '<span class="JfFrame-t"></span><span class="JfFrame-b"></span>' +
      '<span class="JfFrame-l1"></span><span class="JfFrame-l2"></span><span class="JfFrame-r"></span>' +
      '<p class="JfFrame-v" lang="ja">日本へ、もっと近く</p>' +
      `<img class="JfArt JfArt--compass" src="${base}compass.webp" alt="" decoding="async">` +
      `<img class="JfArt JfArt--sakura" src="${base}sakura-sm.webp" srcset="${base}sakura-sm.webp 445w, ${base}sakura.webp 891w" sizes="340px" alt="" loading="lazy" decoding="async">` +
      `<img class="JfArt JfArt--fuji" src="${base}fuji.webp" alt="" loading="lazy" decoding="async">` +
      `<img class="JfArt JfArt--pine" src="${base}pine-sm.webp" alt="" loading="lazy" decoding="async">`;
    main.appendChild(frame);
  }
}
