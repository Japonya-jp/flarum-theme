import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';

const t = (key, params) => app.translator.trans('japonya-theme.forum.' + key, params);

/** Kartların gittiği etiketler; etiket yoksa kart arama ya da yeni tartışma açar. */
const STEP_TAGS = ['soru-cevap', 'gezi-planlama', null];

/**
 * Ana sayfa kahramanı. Mockup'taki düzen: solda başlık, sağda arama ve
 * "Bir Tartışma Başlat", altında numaralı üç yol kartı, sağ kenarda dikey yazı.
 */
export default class JfHero extends Component {
  oninit(vnode) {
    super.oninit(vnode);
    this.query = '';
  }

  view() {
    const page = this.attrs.page;

    return (
      <header className="Hero JfHero">
        <div className="container JfHero-in">
          <div className="JfHero-copy">
            <p className="JfHero-kicker">
              <span lang="ja">交流</span> · {t('hero.kicker')}
            </p>
            <h1 className="JfHero-title">
              {t('hero.title_1')}
              <br />
              {t('hero.title_2')}
            </h1>
            <span className="JfHero-rule" aria-hidden="true" />
            <p className="JfHero-lead">{t('hero.lead')}</p>
          </div>

          <div className="JfHero-side">
            <label className="JfHero-label" htmlFor="jf-hero-search">
              {t('hero.search_label')}
            </label>
            <form className="JfHero-search" role="search" onsubmit={this.search.bind(this)}>
              {icon('fas fa-search')}
              <input
                id="jf-hero-search"
                className="FormControl"
                type="search"
                placeholder={t('hero.search_placeholder')}
                value={this.query}
                oninput={(e) => (this.query = e.target.value)}
              />
            </form>
            <button className="Button Button--primary JfHero-start" type="button" onclick={() => page.newDiscussionAction()}>
              <span>{app.translator.trans('core.forum.index.start_discussion_button')}</span>
              <span className="JfArrow" aria-hidden="true">⟶</span>
            </button>
          </div>

          <p className="JfHero-vtext" aria-hidden="true">
            {t('hero.vertical')}
          </p>
        </div>

        <nav className="container JfSteps" aria-label={t('hero.steps_label')}>
          {[1, 2, 3].map((n, i) => this.step(n, STEP_TAGS[i], page))}
        </nav>
      </header>
    );
  }

  step(n, slug, page) {
    const tag = slug ? app.store.getBy('tags', 'slug', slug) : null;
    const body = [
      <span className="JfStep-n">{String(n).padStart(2, '0')}</span>,
      <span className="JfStep-t">
        <strong>{t('steps.' + n + '.title')}</strong>
        <span>{t('steps.' + n + '.text')}</span>
      </span>,
      <span className="JfArrow" aria-hidden="true">
        ⟶
      </span>,
    ];

    if (tag) {
      return (
        <a className="JfStep" href={app.route('tag', { tags: tag.slug() })} onclick={this.go.bind(this)}>
          {body}
        </a>
      );
    }
    if (slug) {
      // Etiket yoksa: aramaya odaklan.
      return (
        <button type="button" className="JfStep" onclick={() => this.$('#jf-hero-search').trigger('focus')}>
          {body}
        </button>
      );
    }
    return (
      <button type="button" className="JfStep" onclick={() => page.newDiscussionAction()}>
        {body}
      </button>
    );
  }

  go(e) {
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    m.route.set(e.currentTarget.getAttribute('href'));
  }

  search(e) {
    e.preventDefault();
    const q = this.query.trim();
    if (!q) return;
    m.route.set(app.route('index', { q }));
  }
}
