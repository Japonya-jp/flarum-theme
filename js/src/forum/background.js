import app from 'flarum/forum/app';

/**
 * Sitenin arka planı ve çerçevesi (bütün sayfalarda):
 * - .JfBg: ekrana sabit, içeriğin arkasında duran süsleme katmanı. Soluk suluboya Japonya
 *   haritası (japonya.jp kapağındaki, yalnız görsel), pusula, kayık, seigaiha dalgaları,
 *   sol altta sakura, sağ altta Fuji, çam ve torii.
 * - .JfFrame: içerik alanını çevreleyen ince kırmızı çizgiler; anasitedeki gibi köşelerde
 *   kesişir, sol çizgi "日本へ、もっと近く" dikey yazısı için aralık bırakır.
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
      `<img class="JfArt JfArt--compass" src="${base}compass.webp" alt="" decoding="async">`,
      `<img class="JfArt JfArt--boat" src="${base}boat.webp" alt="" decoding="async">`,
      `<img class="JfArt JfArt--sakura" src="${base}sakura-sm.webp" srcset="${base}sakura-sm.webp 445w, ${base}sakura.webp 891w" sizes="340px" alt="" decoding="async">`,
      `<img class="JfArt JfArt--fuji" src="${base}fuji.webp" alt="" decoding="async">`,
      `<img class="JfArt JfArt--pine" src="${base}pine-sm.webp" alt="" decoding="async">`,
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
      '<p class="JfFrame-v" lang="ja">日本へ、もっと近く</p>';
    main.appendChild(frame);
  }
}
