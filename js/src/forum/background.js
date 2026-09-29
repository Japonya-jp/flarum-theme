import app from 'flarum/forum/app';

/**
 * Sitenin arka planı ve çerçevesi (bütün sayfalarda):
 * - .JfBg: ekrana sabit, içeriğin arkasında duran fon: ortada büyük ve soluk suluboya Japonya
 *   haritası (japonya.jp kapağındaki, yalnız görsel); iki yanında anasitedeki gibi seigaiha
 *   dalgaları, bulut kıvrımları, yelkenli ve mühür; altta solda sakura, sağda Fuji, çam ve torii.
 * - .JfFrame: içerik alanını çevreleyen ince kırmızı çizgiler; anasitedeki gibi köşelerde
 *   kesişir, sol çizgi "日本へ、もっと近く" dikey yazısı için aralık bırakır. Sol üstte pusula.
 *
 * Mithril'in yönettiği düğümlere dokunmamak için body'nin ve sunucunun bastığı
 * .App-content'in sonuna bir kez eklenir.
 */
/** Anasite kapağındaki bulut kıvrımı (deco.svg'deki çizim). */
function cloud(className) {
  return (
    `<svg class="${className}" viewBox="706 136 142 46" aria-hidden="true" focusable="false">` +
    '<path d="M712 165h58c8 0 8-12 0-12h-22c-9 0-9-12 0-12h86c9 0 9 12 0 12h-40M740 176h70c8 0 8-11 0-11"/></svg>'
  );
}

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
      '<span class="JfWave JfWave--5"></span>',
      '<span class="JfWave JfWave--6"></span>',
      `<img class="JfArt JfArt--map" src="${base}map.webp" alt="" decoding="async">`,
      cloud('JfCloud JfCloud--1'),
      cloud('JfCloud JfCloud--2'),
      cloud('JfCloud JfCloud--3'),
      `<img class="JfArt JfArt--boat" src="${base}boat.webp" alt="" loading="lazy" decoding="async">`,
      `<img class="JfArt JfArt--seal" src="${base}seal.webp" alt="" loading="lazy" decoding="async">`,
      `<img class="JfArt JfArt--sakura" src="${base}sakura-sm.webp" srcset="${base}sakura-sm.webp 445w, ${base}sakura.webp 891w" sizes="340px" alt="" loading="lazy" decoding="async">`,
      `<img class="JfArt JfArt--fuji" src="${base}fuji.webp" alt="" loading="lazy" decoding="async">`,
      `<img class="JfArt JfArt--pine" src="${base}pine-sm.webp" alt="" loading="lazy" decoding="async">`,
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
      `<img class="JfArt JfArt--compass" src="${base}compass.webp" alt="" decoding="async">`;
    main.appendChild(frame);
  }
}
