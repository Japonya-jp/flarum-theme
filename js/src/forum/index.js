import app from 'flarum/forum/app';
import { extend, override } from 'flarum/common/extend';
import IndexPage from 'flarum/forum/components/IndexPage';
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import DiscussionListItem from 'flarum/forum/components/DiscussionListItem';
import LinkButton from 'flarum/common/components/LinkButton';
import avatar from 'flarum/common/helpers/avatar';

import JfHero from './components/JfHero';
import JfDecor from './components/JfDecor';

const t = (key, params) => app.translator.trans('japonya-theme.forum.' + key, params);

/** Ana sayfa (tüm tartışmalar, arama ya da etiket yok) mı? */
function isHome() {
  if (app.current.get('routeName') !== 'index') return false;
  const params = app.search.params();
  return !params.q && !params.tags;
}

/** Görüntülenen listenin tartışma sayısı: etiket sayfasında etiketin, aksi hâlde üst düzey birincil etiketlerin toplamı. */
function discussionCount(page) {
  const tag = typeof page.currentTag === 'function' ? page.currentTag() : null;
  if (tag) return tag.discussionCount();
  if (app.current.get('routeName') !== 'index' || app.search.params().q) return null;
  const tags = app.store.all('tags').filter((tg) => tg.position() !== null && !tg.isChild());
  if (!tags.length) return null;
  return tags.reduce((sum, tg) => sum + (tg.discussionCount() || 0), 0);
}

app.initializers.add('japonya-theme', () => {
  // Üst menü: Tartışmalar, Etiketler, Sıralamalar, Takip Ediliyor, Ana site.
  extend(HeaderPrimary.prototype, 'items', function (items) {
    items.add('jfDiscussions', <LinkButton className="Button Button--link JfNav" href={app.route('index')}>{t('nav.discussions')}</LinkButton>, 50);
    if (app.routes.tags) {
      items.add('jfTags', <LinkButton className="Button Button--link JfNav" href={app.route('tags')}>{t('nav.tags')}</LinkButton>, 40);
    }
    if (app.routes.rankings && app.forum.attribute('canViewRankingPage')) {
      items.add('jfRankings', <LinkButton className="Button Button--link JfNav" href={app.route('rankings')}>{t('nav.rankings')}</LinkButton>, 30);
    }
    if (app.routes.following && app.session.user) {
      items.add('jfFollowing', <LinkButton className="Button Button--link JfNav" href={app.route('following')}>{t('nav.following')}</LinkButton>, 20);
    }
    items.add(
      'jfMainSite',
      <a className="Button Button--link JfNav JfNav--out" href={app.forum.attribute('japonyaMainSiteUrl') || 'https://japonya.jp'}>
        {t('nav.main_site')}
        <span aria-hidden="true"> ↗</span>
      </a>,
      10
    );
  });

  // Ana sayfa kahramanı: başlık, arama, "Bir Tartışma Başlat" ve üç yol kartı.
  override(IndexPage.prototype, 'hero', function (original) {
    if (!isHome()) return original();
    return <JfHero page={this} />;
  });

  // Ana sayfa kabı: çerçeve ve süsleme görselleri bu sınıfa bağlı.
  extend(IndexPage.prototype, 'view', function (vdom) {
    if (!isHome() || !vdom || !vdom.attrs) return;
    vdom.attrs.className = (vdom.attrs.className || '') + ' JfIndex';
    vdom.children = [...(vdom.children || []), <JfDecor />];
  });

  // Kenar menüsü başlıkları: "Forumu keşfet" ve etiketlerin üstünde "Konular".
  extend(IndexPage.prototype, 'navItems', function (items) {
    items.add('jfExplore', <span className="JfNavHead">{t('side.explore')}</span>, 1000);
    if (items.has('separator')) {
      items.add('jfTopics', <span className="JfNavHead JfNavHead--topics">{t('side.topics')}</span>, -13);
    }
  });

  // Liste başlığı: "Son tartışmalar · 07 tartışma", sıralama sağda.
  extend(IndexPage.prototype, 'viewItems', function (items) {
    const count = discussionCount(this);
    items.add(
      'jfTitle',
      <h2 className="JfListTitle">
        {t('list.title')}
        {count !== null ? <small>{t('list.count', { count: String(count).padStart(2, '0') })}</small> : null}
      </h2>,
      1000
    );
  });

  // Listenin altında kısa not.
  extend(IndexPage.prototype, 'contentItems', function (items) {
    if (isHome()) items.add('jfNote', <p className="JfListNote">{t('list.note')}</p>, 10);
  });

  // Tartışma satırı: küçük avatar, yanıt sayısı.
  extend(DiscussionListItem.prototype, 'infoItems', function (items) {
    const discussion = this.attrs.discussion;
    const user = discussion.lastPostedUser() || discussion.user();
    if (user) items.add('jfAvatar', avatar(user, { className: 'JfMiniAvatar' }), 200);
    const replies = discussion.replyCount();
    if (replies > 0) items.add('jfReplies', <span className="JfReplies">{t('list.replies', { count: replies })}</span>, -50);
  });
});
