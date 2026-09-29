import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';

/**
 * Ana sayfanın süslemeleri: ince kırmızı çerçeve, arama kutusunun arkasında soluk Japonya
 * haritası (japonya.jp kapağındaki suluboya harita, yalnız görsel), pusula, kayık, seigaiha
 * dalga kümeleri, sol altta sakura dalı, sağ altta Fuji ile çam ve torii. Yalnız geniş ekranda.
 */
export default class JfDecor extends Component {
  view() {
    const base = (app.forum.attribute('assetsBaseUrl') || app.forum.attribute('baseUrl') + '/assets') + '/extensions/japonya-theme/';

    return (
      <div className="JfDecor" aria-hidden="true">
        <span className="JfFrame JfFrame--t" />
        <span className="JfFrame JfFrame--b" />
        <span className="JfFrame JfFrame--l" />
        <span className="JfFrame JfFrame--r" />
        <span className="JfWave JfWave--1" />
        <span className="JfWave JfWave--2" />
        <span className="JfWave JfWave--3" />
        <span className="JfWave JfWave--4" />
        <img className="JfArt JfArt--map" src={base + 'map.webp'} alt="" decoding="async" />
        <img className="JfArt JfArt--compass" src={base + 'compass.webp'} alt="" decoding="async" />
        <img className="JfArt JfArt--boat" src={base + 'boat.webp'} alt="" loading="lazy" decoding="async" />
        <img className="JfArt JfArt--sakura" src={base + 'sakura-sm.webp'} srcset={base + 'sakura-sm.webp 445w, ' + base + 'sakura.webp 891w'} sizes="420px" alt="" loading="lazy" decoding="async" />
        <img className="JfArt JfArt--fuji" src={base + 'fuji.webp'} alt="" loading="lazy" decoding="async" />
        <img className="JfArt JfArt--pine" src={base + 'pine-sm.webp'} alt="" loading="lazy" decoding="async" />
      </div>
    );
  }
}
